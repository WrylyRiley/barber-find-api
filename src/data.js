// initialize dependencies
const request = require('request-promise-native')

// call schema model
const Barber = require('../db/barberSchema')

// initialize variables
const numItems = 15
const numReviews = 5

// run function
runAllRequests()

// run all api requests
async function runAllRequests () {
  // await completion of first request before moving forward
  var returnedArray = await runFirstRequest()
  for (let i = 0; i < returnedArray.length; i++) {
    // await completion of second request before moving forward
    let returnedPromise = await runSecondRequest(returnedArray[i], i)
    // return the modified object from returnedPromise and swap it in the array
    returnedArray[i] = returnedPromise
  }
  // remove items in database and seed it with retrieved data
  Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(returnedArray)
    })
    .then(_ => {
      process.exit()
    })
}

// call first api request to get list of barbers
function runFirstRequest () {
  return new Promise(resolve => {
    request(
      {
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
          client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
          near: 20005,
          query: 'barber shop',
          v: '20180128',
          limit: numItems
        }
      },
      (error, response, body) => {
        let newArray = []
        if (error) {
          console.error(error)
        } else {
          let data = JSON.parse(body)
          for (let i = 0; i < numItems; i++) {
            let returned = data.response.groups[0]
            let items = returned.items[i]

            // store retrieved data
            let venueID = items.venue.id
            let name = items.venue.name
            let address = items.venue.location.address
            let rating = items.venue.rating
            let website = items.url
            let postalcode = items.venue.location.postalCode
            let phone = items.venue.contact.formattedPhone
            let city = items.venue.location.city
            let state = items.venue.location.state
            let reviews = []

            // create a new array with stored information
            newArray.push({
              venueID: venueID,
              name: name,
              address: address,
              rating: rating,
              website: website,
              postalcode: postalcode,
              phone: phone,
              city: city,
              state: state,
              reviews: reviews
            })
          }
        }
        // returns array
        resolve(newArray)
      }
    )
  })
}

// second api call
function runSecondRequest (item, idx) {
  // create array to store data
  let reviewData = []
  return new Promise(resolve => {
    request(
      {
        url: `https://api.foursquare.com/v2/venues/${item.venueID}/tips`,
        method: 'GET',
        qs: {
          client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
          client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
          limit: numReviews,
          v: 20180129
        }
      },
      (error, response, body) => {
        let data = ''
        if (error) {
          console.error(error)
        } else {
          data = JSON.parse(body)
          let reviews = data.response.tips.items

          // for loop to iterate through number of reviews retrieved
          for (let i = 0; i < reviews.length; i++) {
            // set variables to be data that was found
            let text = reviews[i].text
            let firstname = reviews[i].user.firstName
            let lastname = reviews[i].user.lastName || ' '

            // push data to array of data
            reviewData.push({
              text,
              firstname,
              lastname
            })
          }
        }
        // returns an object with all data
        const newObj = { ...item, reviews: reviewData }
        resolve(newObj)
      }
    )
  })
}

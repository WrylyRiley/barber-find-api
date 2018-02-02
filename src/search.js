// import dependency
const request = require('request-promise-native')

// pull database model
const Barber = require('../db/barberSchema')

const numItems = 1
const numReviews = 5

module.exports = (query, near) => {
  runAllRequests(query, near)
}

async function runAllRequests (query, near) {
  // await completion of first request before moving forward
  var returnedArray = await runFirstRequest(query, near)
  // await completion of second request before moving forward
  let returnedPromise = await runSecondRequest(returnedArray[0], 0)
  // return the modified object from returnedPromise and swap it in the array
  returnedArray[0] = returnedPromise

  Barber.create(returnedArray[0]).then(_ => {
    process.exit()
  })
  // empty return statement
  return returnedArray[0]
}

// function to call first api request
function runFirstRequest (query, near) {
  return new Promise(resolve => {
    request(
      {
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
          client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
          client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
          near: near,
          query: query,
          v: '20180128',
          limit: numItems
        }
      },
      (error, response, body) => {
        // array to store data
        let newArray = []
        if (error) {
          console.log(error)
        } else {
          let data = JSON.parse(body)
          // for loop to iterate through number of venues recieved
          for (let i = 0; i < numItems; i++) {
            // store data returned
            let returned = data.response.groups[0]
            let items = returned.items[i]
            let venueID = items.venue.id
            let name = items.venue.name
            let address = items.venue.location.address || 'None Listed'
            let rating = items.venue.rating || 'None Listed'
            let website = items.url || 'None Listed'
            let postalcode = items.venue.location.postalCode || 'None Listed'
            let hours = items.venue.hours || 'None Listed'
            let phone = items.venue.contact.formattedPhone || 'None Listed'
            let city = items.venue.location.city || 'None Listed'
            let state = items.venue.location.state || 'None Listed'
            let reviews = []

            // store data into array
            newArray.push({
              venueID: venueID,
              name: name,
              address: address,
              rating: rating,
              website: website,
              postalcode: postalcode,
              hours: hours,
              phone: phone,
              city: city,
              state: state,
              reviews: reviews
            })
          }
        }
        resolve(newArray)
      }
    )
  })
}

// second api call
function runSecondRequest (item, idx) {
  // create variable to store data
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
        // create variable to store data
        let data = ''
        if (error) {
          console.error(error)
        } else {
          data = JSON.parse(body)
          // import specific data from the api call
          let reviews = data.response.tips.items

          // iterate through all data returned
          for (let i = 0; i < reviews.length; i++) {
            let text = reviews[i].text
            let firstname = reviews[i].user.firstName
            let lastname = reviews[i].user.lastName || ' '

            // push data to data array
            reviewData.push({
              text,
              firstname,
              lastname
            })
          }
        }
        // return object of data
        const newObj = { ...item, reviews: reviewData }
        resolve(newObj)
      }
    )
  })
}

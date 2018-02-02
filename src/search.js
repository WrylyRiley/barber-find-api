const request = require('request-promise-native')

const Barber = require('../db/barberSchema')

const numItems = 1
const numReviews = 5

async function runAllRequests (query, near) {
  // await completion of first request before moving forward
  var returnedArray = await runFirstRequest(query, near)
  for (let i = 0; i < returnedArray.length; i++) {
    // await completion of second request before moving forward
    let returnedPromise = await runSecondRequest(returnedArray[i], i)
    // return the modified object from returnedPromise and swap it in the array
    returnedArray[i] = returnedPromise
  }
  Barber.create(returnedArray[0]).then(_ => {
    process.exit()
  })

  return true
}

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
        let newArray = []
        if (error) {
          console.log(error)
        } else {
          let data = JSON.parse(body)
          for (let i = 0; i < numItems; i++) {
            let returned = data.response.groups[0]
            let items = returned.items[i]
            let venueID = items.venue.id
            let name = items.venue.name
            let address = items.venue.location.address
            let rating = items.venue.rating
            let website = items.url
            let postalcode = items.venue.location.postalCode
            let hours = items.venue.hours || 'None Listed'
            let phone = items.venue.contact.formattedPhone
            let city = items.venue.location.city
            let state = items.venue.location.state
            let reviews = []

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

function runSecondRequest (item, idx) {
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
        console.log('second function')
        let data = ''
        if (error) {
          console.error(error)
        } else {
          data = JSON.parse(body)
          let reviews = data.response.tips.items

          for (let i = 0; i < reviews.length; i++) {
            let text = reviews[i].text
            let firstname = reviews[i].user.firstName
            let lastname = reviews[i].user.lastName || ' '

            reviewData.push({
              text,
              firstname,
              lastname
            })
          }
        }
        const newObj = { ...item, reviews: reviewData }
        resolve(newObj)
      }
    )
  })
}

module.exports = {
  search: runAllRequests
}

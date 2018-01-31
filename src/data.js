const Barber = require('../db/schema')
const request = require('request-promise-native')
const numItems = 3
const chalk = require('chalk')

runAllRequests()

async function runAllRequests () {
  // await completion of first request before moving forward
  var returnedArray = await runFirstRequest()
  for (let i = 0; i < returnedArray.length; i++) {
    // await completion of second request before moving forward
    returnedPromise = await runSecondRequest(returnedArray[i], i)
    // return the modified object from returnedPromise and swap it in the array
    returnedArray[i] = returnedPromise
  }
  Barber.remove({})
    .then(_ => {
      return Barber.collection.insert(returnedArray)
    })
    .then(_ => {
      process.exit()
    })
}

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
          console.error(chalk.red(error))
        } else {
          let data = JSON.parse(body)
          for (let i = 0; i < numItems; i++) {
            let returned = data.response.groups[0]
            let items = returned.items[i]

            // console.log(venueID)

            let venueID = items.venue.id
            let name = items.venue.name
            let address = items.venue.location.address
            let rating = items.venue.rating
            let website = items.url
            let postalcode = items.venue.location.postalCode
            let hours = items.venue.hours.status || 'None Listed'
            let phone = items.venue.contact.formattedPhone
            let city = items.venue.location.city
            let state = items.venue.location.state

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
              state: state
            })
          }
        }
        resolve(newArray)
      }
    )
  })
}

function runSecondRequest (item, idx) {
  return new Promise(resolve => {
    request(
      {
        url: `https://api.foursquare.com/v2/venues/${item.venueID}/tips`,
        method: 'GET',
        qs: {
          client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
          client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
          limit: 10,
          v: 20180129
        }
      },
      (error, response, body) => {
        let data = ''
        if (error) {
          console.error(chalk.red(error))
        } else {
          // console.log(body)
          data = JSON.parse(body)
        }
        const key = `data-${idx}`
        const newObj = { ...item, [key]: data }
        resolve(newObj)
      }
    )
  })
}

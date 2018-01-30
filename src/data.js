const Barber = require('../db/schema')
const request = require('request-promise-native')
const numItems = 3
const chalk = require('chalk')

request
  .get(
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
    (err, res, body) => {
      let seedData = []
      if (err) {
        console.error(err)
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

          console.log(chalk.red(items.venue.id))
          console.log(chalk.red(items.venue.name))
          console.log(chalk.red(items.venue.location.address))
          console.log(chalk.red(items.venue.rating))
          console.log(chalk.red(items.venue.url))
          console.log(chalk.red(items.venue.location.postalCode))
          console.log(chalk.red(items.venue.hours.status))
          console.log(chalk.red(items.venue.contact.formattedPhone))
          console.log(chalk.red(items.venue.location.city))
          console.log(chalk.red(items.venue.location.state))

          seedData.push({
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
          console.log(chalk.yellow(seedData))
        }
      }
      console.log(chalk.blue(seedData))
      return seedData
    }
  )
  .then(seedData => {
    console.log(chalk.blue(seedData))
    seedData.forEach((item, idx) => {
      console.log(chalk.red(item))
      console.log(chalk.green(idx))
      request(
        {
          url: 'https://api.foursquare.com/v2/venues/VENUE_ID/tips',
          method: 'GET',
          qs: {
            VENUE_ID: item.venueID,
            client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
            client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
            limit: 10,
            v: 20180129
          }
        },
        (err, res, body) => {
          let data = ''
          if (err) {
            console.error(err)
          } else {
            console.log(body)
            data = JSON.parse(body)
            console.log(data)
          }

          const key = `data-${idx}`
          const newObj = { ...item, [key]: data }
          return newObj
        }
      )
    })
    return seedData
  })
  .then(seedData => {
    Barber.remove({})
      .then(_ => {
        return Barber.collection.insert(seedData)
      })
      .then(_ => {
        process.exit()
      })
  })

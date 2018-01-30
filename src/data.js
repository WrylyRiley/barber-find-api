const Barber = require('../db/schema')

const request = require('request')

const numItems = 3

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
  (err, body) => {
    if (err) {
      console.error(err)
    } else {
      let seedData = []
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

        seedData.push({
          venueID,
          name,
          address,
          rating,
          website,
          postalcode,
          hours,
          phone,
          city,
          state
        })
      }
    }
    return seedData
  }
)
  .then(seedData => {
    seedData.forEach((item, idx) => {
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

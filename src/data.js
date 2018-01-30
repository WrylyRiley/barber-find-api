const Barber = require('../db/schema')

const request = require('request')
const numItems = 3
const seedData = []

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
    client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
    near: 20005,
    query: 'coffee',
    v: '20180128',
    limit: numItems
  }
}, function (err, res, body) {
  if (err) {
    console.error(err)
  } else {
    // console.log(body)
    let data = JSON.parse(body)

    for (let i = 0; i < numItems; i++) {
      let returned = data.response.groups[0]
      let items = returned.items[i]
      let name = items.venue.name
      let address = items.venue.location.formattedAddress[0]
      let rating = items.venue.rating

      seedData.push({name, address, rating})
    }

    Barber.remove({})
      .then(_ => {
        return Barber.collection.insert(seedData)
      })
      .then(_ => {
        process.exit()
      })
    // var returned = data.response.groups
    // returned = returned[0]
    // let items = returned.items[0]
    // // console.log(items.venue)
    // console.log(items.venue.name)
    // let address = items.venue.location.formattedAddress[0]
    // console.log(address)
    // console.log(items.venue.rating)
    //
    // var second = data.response.groups[0]
    // let details = second.items[1]
    // console.log(details.venue.name)
    // let secondAddress = details.venue.location.formattedAddress[0]
    // console.log(secondAddress)
    //
    // return [{
    //   name: items.venue.name,
    //   address: address
    // },
    // {
    //   name: details.venue.name,
    //   address: secondAddress
    // }]
    // // data.forEach(function (e) {
    // //   console.log(data)
    // // })
    // // return body.data.map(result => {
    // //   const {name, address} = result.show
    // //   return {
    // //     name,
    // //     address
    // //   }
    // // })
  }
})

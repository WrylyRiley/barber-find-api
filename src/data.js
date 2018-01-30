const request = require('request')

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
    client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
    near: 20005,
    query: 'coffee',
    v: '20180128',
    limit: 2
  }
}, function (err, res, body) {
  if (err) {
    console.error(err)
  } else {
    // console.log(body)
    let data = JSON.parse(body)
    var returned = data.response.groups
    returned = returned[0]
    let items = returned.items[0]
    // console.log(items.venue)
    console.log(items.venue.name)
    let address = items.venue.location.formattedAddress[0]
    console.log(address)
    console.log(items.venue.rating)

    var second = data.response.groups[0]
    let details = second.items[1]
    console.log(details.venue.name)
    let secondAddress = details.venue.location.formattedAddress[0]
    console.log(secondAddress)

    return JSON.parse([{
      name: items.venue.name,
      address: address
    },
    {
      name: details.venue.name,
      address: secondAddress
    }])
    // data.forEach(function (e) {
    //   console.log(data)
    // })
    // return body.data.map(result => {
    //   const {name, address} = result.show
    //   return {
    //     name,
    //     address
    //   }
    // })
  }
})

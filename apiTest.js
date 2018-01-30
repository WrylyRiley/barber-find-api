const request = require('request')

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
    client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
    near: 20005,
    query: 'barber shop',
    v: '20170801',
    categoryId: '4bf58dd8d48988d110951735',
    limit: 3
  }
}, function (err, res, body) {
  if (err) {
    console.error(err)
  } else {
    console.log(body)
  }
})

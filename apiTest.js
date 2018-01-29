const request = require('request')

request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
    client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
    ll: '38.904143, -77.036211',
    query: 'barber shop',
    v: '20170801',
    limit: 1
  }
}, function (err, res, body) {
  if (err) {
    console.error(err)
  } else {
    console.log(body)
  }
})

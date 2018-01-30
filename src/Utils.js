import axios from 'axios'
const request = require('request')

export function findBarber (query) {
  const search = query.replace(/\s/, '+')
  // const url = 'url' + search

  request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
      client_id: 'TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI',
      client_secret: '1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC',
      near: 20005,
      query: search,
      v: '20170801',
      categoryId: '4bf58dd8d48988d110951735',
      limit: 3
    }
  }, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      return body.daata.map(result => {
        const {Name,
          Address,
          Postalcode,
          Hours,
          Reviews,
          Phone,
          City,
          State,
          Website,
          User} = result.show
        return {
          Name,
          Address,
          Postalcode,
          Hours,
          Reviews,
          Phone,
          City,
          State,
          Website,
          User
        }
      })
    }
  })
}

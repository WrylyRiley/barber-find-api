import axios from 'axios'
const request = require('request')

export function findBarber (query) {
  const search = query.replace(/\s/, '+')
  // const url = 'url' + search

  request(
    {
      url: 'https://api.foursquare.com/v2/venues/explore',
      method: 'GET',
      qs: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        near: 20005,
        query: search,
        v: '20170801',
        categoryId: '4bf58dd8d48988d110951735',
        limit: 3
      }
    },
    function (err, res, body) {
      if (err) {
        console.log(err)
      } else {
        return body.data.map(result => {
          const {
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
          } = result.show
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
    }
  )
}

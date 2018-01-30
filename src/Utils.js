import axios from 'axios'
const request = require('request')

export function findBarber (query) {
  // const search = query.replace(/\s/, '+')
  // const url = 'url' + search

<<<<<<< HEAD
  return axios.get('https://api.foursquare.com/v2/venues/search?coffeell=40.7,-74&client_id=TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI&client_secret=1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC&v=20180129')
  .then(response => {
    console.log(response)
    return response.data.map(result => {
      const {name,
        address,
        postalcode,
        hours,
        reviews,
        phone,
        city,
        state,
        website,
        user} = result.show
      return {
        name,
        address,
        postalcode,
        hours,
        reviews,
        phone,
        city,
        state,
        website,
        user
=======
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
>>>>>>> dev
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

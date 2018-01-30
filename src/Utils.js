import axios from 'axios'

export function findBarber (query) {
  const search = query.replace(/\s/, '+')
  // const url = 'url' + search

  return axios.get('https://api.foursquare.com/v2/venues/search?coffeell=40.7,-74&client_id=TP0UK3TOUI3YINFMV3WQAQN3J01ZNSWYN4UJ3NQMPQ1WTTUI&client_secret=1FLRCYYZKJ1VPC51KRPZIIN4HM5J1BXU203H0RGLMASUXWHC&v=20180129')
  .then(response => {
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
      }
    })
  })
}

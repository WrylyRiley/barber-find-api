import axios from 'axios'

export function findBarber (query) {
  const search = query.replace(/\s/, '+')
  // const url = 'url' + search

  return axios.get(url)
  .then(response => {
    return response.data.map(result => {
      const {name,
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
        name,
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
  })
}

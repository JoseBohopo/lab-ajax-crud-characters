class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;

    this.app = axios.create({baseURL: this.BASE_URL })
  }

  getFullList () {
     return this.app.get('/characters')
      
  }

  getOneRegister (id) {
     return this.app.get(`/characters/${id}`)
  }

  createOneRegister (characterInfo ) {
     return this.app.post('/characters',characterInfo)
  }

  updateOneRegister (id) {

     // return this.app.put()

  }

  deleteOneRegister (id) {

      return this.app.delete(`/characters/${id}`)
  }
}

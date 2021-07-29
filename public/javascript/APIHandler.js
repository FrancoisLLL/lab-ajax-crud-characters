 class APIHandler {
   constructor(baseUrl) {
     this.BASE_URL = baseUrl;
   }

   getFullList(path) {
     return axios.get(`${this.BASE_URL}/${path}`)
   }

   getOneRegister(path, id) {
     return axios.get(`${this.BASE_URL}/${path}/${id}`)
   }

   createOneRegister(path, data) {
     return axios.post(`${this.BASE_URL}/${path}`, data)

   }

   updateOneRegister(path, id, data) {
     return axios.patch(`${this.BASE_URL}/${path}/${id}`, data)
   }


   deleteOneRegister(path, id) {
     return axios.delete(`${this.BASE_URL}/${path}/${id}`)
   }
 }
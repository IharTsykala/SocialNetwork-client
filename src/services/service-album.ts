const axios = require("axios")

export default class ServiceAlbums {
  static interceptor = axios.interceptors.request.use(
    function(config: any) {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    function(error: string) {
      return Promise.reject(error)
    }
  )

  static getAllAlbums = async () => {
    try {
      const request = await axios.get(
        "https://strawberry-tart-41911.herokuapp.com/Albums/"
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static addAlbum = async (id: string) => {
    const album = {
      name: "new album",
      ownerUser: id
    }
    const response = await axios.post(
      `https://strawberry-tart-41911.herokuapp.com/albums/add`,
      album
    )
    return response.data
  }

  static editAlbum = async (id: string, user: string) => {
    try {
      const request = await axios.put(
        `https://strawberry-tart-41911.herokuapp.com/albums/update/${id}`,
        user
      )
      return request.data
    } catch (e) {
      console.log(e)
    }
  }

  static removeHandler = async (id: string) => {
    try {
      return await axios.delete(
        `https://strawberry-tart-41911.herokuapp.com/albums/delete/${id}`
      )
    } catch (e) {
      console.log(e)
    }
  }

  static getListPhotosByAlbumID = async (id: string) => {
    try {
      // console.log(id)
      const response = await axios.get(
        `https://strawberry-tart-41911.herokuapp.com/albums/withPhotos/${id}`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
}
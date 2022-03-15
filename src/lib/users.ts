import axios , { AxiosResponse } from "axios";
import type { dataType } from '../types/users'

export const fetchData = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res:AxiosResponse<dataType[]>) => {
        return res.data
      }
    )
}

export const fetchUser = (id:string) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res:AxiosResponse<dataType>) => {
        return res.data
      }
    )
}
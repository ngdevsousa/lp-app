import axios from 'axios';
import { useStoreAuth } from '../stores/storeAuth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const storeAuth = useStoreAuth()
  const token = storeAuth.acessToken // replace with your method to get the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

api.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response && error.response.status === 401) {
    const storeAuth = useStoreAuth()
    storeAuth.logout()
  }
  return Promise.reject(error)
});

export default api
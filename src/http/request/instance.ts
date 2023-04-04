import Request from 'luch-request'

import {
  requestError,
  requestInterceptors,
  responseError,
  responseInterceptors
} from './interceptors'

const instance = new Request({
  baseURL: import.meta.env.VITE_BASE_URL || '/api',
  timeout: 60000
})

instance.interceptors.request.use(requestInterceptors, requestError)

instance.interceptors.response.use(responseInterceptors, responseError)

export default instance

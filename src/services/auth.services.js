import getAxios from './axios.config'
import errorHelper from './error.helper'

export function login({ email, password }) {
  return getAxios()
    .post('/auth/login', { email, password })
    .then((response) => response.data)
    .catch(errorHelper)
}

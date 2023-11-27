import getAxios from './axios.config'

export function login({ email, password }) {
  return getAxios()
    .post('/auth/login', { email, password })
    .then((response) => response.data)
    .catch((error) => ({
      error: true,
      name: error.response.data?.error?.name || 'Error',
      message: error.response.data?.error?.msg || 'Error'
    }))
}

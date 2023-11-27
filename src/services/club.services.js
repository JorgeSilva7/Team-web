import getAxios from './axios.config'

export function list() {
  return getAxios()
    .get('/clubs/')
    .then((response) => response.data)
    .catch((error) => ({
      error: true,
      name: error.response.data?.error?.name || 'Error',
      message: error.response.data?.error?.msg || 'Error'
    }))
}

export function listMembers(clubId) {
  return getAxios()
    .get(`/clubs/${clubId}/members`)
    .then((response) => response.data)
    .catch((error) => ({
      error: true,
      name: error.response.data?.error?.name || 'Error',
      message: error.response.data?.error?.msg || 'Error'
    }))
}

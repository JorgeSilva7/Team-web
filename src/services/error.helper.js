export default function errorHelper(error) {
  const errorObject = {
    name: error.response.data?.error?.name || 'Error',
    message: error.response.data?.error?.message || 'Ha ocurrido un error inesperado :('
  }
  throw errorObject
}

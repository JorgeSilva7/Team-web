import getAxios from './axios.config'
import errorHelper from './error.helper'

export function list() {
  return getAxios()
    .get('/clubs/')
    .then((response) => response.data)
    .catch(errorHelper)
}

export function listMembers(clubId) {
  return getAxios()
    .get(`/clubs/${clubId}/members`)
    .then((response) => response.data)
    .catch(errorHelper)
}

export function addClub(club) {
  return getAxios()
    .post(`/clubs/`, club)
    .then((response) => response.data)
    .catch(errorHelper)
}

export function addMember({ member, clubId }) {
  return getAxios()
    .post(`/clubs/${clubId}/members`, member)
    .then((response) => response.data)
    .catch(errorHelper)
}

export function addSubscription({ subscription, clubId }) {
  return getAxios()
    .post(`/clubs/${clubId}/subscriptions`, subscription)
    .then((response) => response.data)
    .catch(errorHelper)
}

export function listSubscriptions(clubId) {
  return getAxios()
    .get(`/clubs/${clubId}/subscriptions`)
    .then((response) => response.data)
    .catch(errorHelper)
}

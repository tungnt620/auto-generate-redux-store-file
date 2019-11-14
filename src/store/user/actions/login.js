import * as actionTypes from '../actionTypes'
import axios from 'axios-settings'
import { LOCALSTORAGE_PREFIX } from 'shared/constants'
import { columnShowListViewKey } from 'components/Voucher/Request/helpers'

const LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/login/google-oauth2/?next=${process.env.REACT_APP_API_BASE_URL}/auth/redirect/?next=`

const loginSuccess = (token) => {
  return {
    type: actionTypes.AUTH.success(),
    payload: { token, isRequiredUserConfirmInfo: true }
  }
}

export const loginFail = (resp, path = '') => {
  if (resp && resp.status === 403) {
    window.location.replace(`${LOGIN_URL}${path}`)
  }
  return {
    type: actionTypes.AUTH.fail(),
  }
}

export const logout = () => {
  localStorage.clear()

  const path = encodeURIComponent(window.location.origin + window.location.pathname)
  axios({
    method: 'post',
    url: '/auth/logout/'
  }).then(res => {
    if (res.status === 200) {
      window.location.replace(`${LOGIN_URL}${path}`)
    }
  }).catch(err => {
    console.log(err.toString())
  })

  return {
    type: actionTypes.AUTH.custom('logout'),
  }
}

export const reLoginWhenTokenExpire = (expirationTime) => {
  const max32BitNumber = 2 ** 31 - 1
  setTimeout(() => {
    logout()
  }, expirationTime > max32BitNumber ? max32BitNumber : expirationTime)
}

export const auth = (path) => {
  return dispatch => {
    axios({
      method: 'post',
      url: '/auth/token/'
    }).then(res => {
      const expirationTime = 30 * 24 * 60 * 60 * 1000  // 30 days in millisecond
      const expirationDate = new Date(new Date().getTime() + expirationTime).getTime().toString()

      const token = res.data['data'].token
      localStorage.setItem(`${LOCALSTORAGE_PREFIX}Token`, token)
      localStorage.setItem(`${LOCALSTORAGE_PREFIX}ExpirationDate`, expirationDate)

      // Remove column list view key, because some case we have update column and this setting no longer correct
      localStorage.removeItem(columnShowListViewKey)

      dispatch(loginSuccess(token))

      reLoginWhenTokenExpire(expirationTime)
    }).catch(err => {
      dispatch(loginFail(err.response, path))
    })
  }
}

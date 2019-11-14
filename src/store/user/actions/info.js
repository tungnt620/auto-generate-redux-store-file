import * as actionTypes from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from '../../feedback/actions'
import { LOCALSTORAGE_PREFIX } from 'shared/constants'
import { loginFail } from './login'
import { setCommonUIConfig } from '../../ui/common/actions'

const success = (payload) => {
  return {
    type: actionTypes.GET_USER_INFO.success(),
    payload,
  }
}

const fail = (error) => {
  return {
    type: actionTypes.GET_USER_INFO.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: actionTypes.GET_USER_INFO.start()
  }
}

const requireChooseGroupCatOrCat = () => {
  return {
    type: actionTypes.AUTH.success(),
    payload: { isRequiredUserConfirmInfo: true }
  }
}

export const getUserInfo = () => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/user/`,
    }).then(res => {
      if (res.data['code'] === 0) {
        const userInfo = res.data['data']
        localStorage.setItem(`${LOCALSTORAGE_PREFIX}UserInfo`, JSON.stringify(userInfo))

        dispatch(setCommonUIConfig({ forceRerenderApp: true }))
        dispatch(success({ data: userInfo }))

        if (
          (!userInfo.categories.length || !userInfo.group_categories.length)
          && userInfo.team.can_choose_group_and_cat
        ) {
          dispatch(requireChooseGroupCatOrCat())
        }
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(loginFail(err.response))
    })
  }
}

export const updateUserInfo = (data) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/user/`,
      data: data,
    }).then(res => {
      if (res.data['code'] === 0) {
        dispatch(success({
          data: res.data['data'],
          updated: true,
        }))
        dispatch(setFeedbackMessage('success', 'Your info has updated!'))
      } else {
        const errorMessage = res.data['msg']
        dispatch(fail(errorMessage))
        dispatch(setFeedbackMessage('error', errorMessage))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

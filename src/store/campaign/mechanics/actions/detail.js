import * as types from '../actionTypes'
import axios from 'axios-settings'
import { setFeedbackMessage } from 'src/store/feedback/actions'
import { addMechanicMetaData } from './mechanicIDMetaDataMap'
import { addMechanicIntoList, updateMechanicIntoList } from './getList'
import { API_SUCCESS } from 'shared/constants'

export const resetMechanicDetail = () => {
  return {
    type: types.MECHANIC_DETAIL.reset()
  }
}

const success = (data) => {
  return {
    type: types.MECHANIC_DETAIL.success(),
    payload: { data }
  }
}

const fail = (error) => {
  return {
    type: types.MECHANIC_DETAIL.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.MECHANIC_DETAIL.start()
  }
}

export const getMechanicDetail = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/mechanics/${params.id}/`,
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        dispatch(success(res.data['data']))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}

export const createMechanic = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/mechanics/`,
      data: params
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        const mechanic = res.data['data']
        dispatch(success(mechanic))

        dispatch(addMechanicIntoList(mechanic))

        dispatch(addMechanicMetaData(params.metaKey, {
          dataChanged: false,
          mechanicID: mechanic.id,
          templateID: mechanic.template_id,
          mechanicName: mechanic.name,
          data: mechanic,
        }))

        dispatch(setFeedbackMessage('success', 'Mechanic has been created!'))
      } else {
        const message = res.data['msg']
        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

export const updateMechanic = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'patch',
      url: `/api/mechanics/${params.id}/`,
      data: params
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        const mechanic = res.data['data']
        dispatch(success(mechanic))

        dispatch(updateMechanicIntoList(mechanic.id, mechanic))

        dispatch(addMechanicMetaData(params.metaKey, {
          dataChanged: false,
          data: mechanic,
        }))

        dispatch(setFeedbackMessage('success', 'Mechanic has been updated!'))
      } else {
        const message = res.data['msg']
        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

export const deleteMechanic = (mechanicID) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'delete',
      url: `/api/mechanics/${mechanicID}/`,
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        dispatch(success(res.data['data']))
      } else {
        const message = res.data['msg']
        dispatch(fail(message))
        dispatch(setFeedbackMessage('error', message))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
      dispatch(setFeedbackMessage('error', err.toString()))
    })
  }
}

import * as types from '../actionTypes'
import axios from 'axios-settings'
import { addListMechanicMetaData } from './mechanicIDMetaDataMap'
import { API_SUCCESS } from 'shared/constants'

export const resetGetListMechanics = () => {
  return {
    type: types.GET_LIST_MECHANIC.reset()
  }
}

export const addMechanicIntoList = (data) => {
  return {
    type: types.GET_LIST_MECHANIC.custom('add'),
    payload: { data }
  }
}

export const updateMechanicIntoList = (mechanicID, data) => {
  return {
    type: types.GET_LIST_MECHANIC.custom('update'),
    payload: { mechanicID, data }
  }
}

const success = (data, pagination) => {
  return {
    type: types.GET_LIST_MECHANIC.success(),
    payload: { data, pagination }
  }
}

const fail = (error) => {
  return {
    type: types.GET_LIST_MECHANIC.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.GET_LIST_MECHANIC.start()
  }
}

export const getListMechanics = (params) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'get',
      url: `/api/mechanics/`,
      params: params,
    }).then(res => {
      if (res.data['code'] === API_SUCCESS) {
        const mechanics = res.data['data']
        dispatch(success(mechanics))

        const mechanicMetaDatas = mechanics.map(mechanic => (
          {
            dataChanged: false,
            mechanicID: mechanic.id,
            templateID: mechanic.template_id, // We need this for case update after create
            mechanicName: mechanic.name, // We need this for case update after create
            data: mechanic,
          }
        ))
        dispatch(addListMechanicMetaData(mechanicMetaDatas))
      } else {
        dispatch(fail(res.data['msg']))
      }
    }).catch(err => {
      dispatch(fail(err.toString()))
    })
  }
}

import * as actionTypes from '../actionTypes'

export const addMechanicMetaData = (id, data) => {
  return {
    type: actionTypes.MECHANIC_META_DATA.success(),
    payload: { id, data }
  }
}

export const addListMechanicMetaData = (mechanicMetaDatas) => {
  return {
    type: actionTypes.MECHANIC_META_DATA.custom('addList'),
    payload: { mechanicMetaDatas }
  }
}

export const deleteMechanicMetaData = (id) => {
  return {
    type: actionTypes.MECHANIC_META_DATA.custom('remove'),
    payload: { id }
  }
}

export const resetMechanicMetaData = () => {
  return {
    type: actionTypes.MECHANIC_META_DATA.reset(),
  }
}

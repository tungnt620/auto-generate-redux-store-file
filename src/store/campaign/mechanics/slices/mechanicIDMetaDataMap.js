import * as actionTypes from '../actionTypes'

export const initial = {}

const add = (state, payload) => {
  if (
    state[payload.id]
    && Object.keys(payload.data).length === 1
    && payload.data.dataChanged !== undefined
    && payload.data.dataChanged === state[payload.id].dataChanged
  ) {
    return state
  }

  return {
    ...state,
    [payload.id]: {
      ...state[payload.id],
      ...payload.data,
    },
  }
}

const addList = (state, payload) => {
  const { mechanicMetaDatas } = payload
  const newState = { ...state }

  mechanicMetaDatas.forEach(mechanicMetaData => {
    newState[mechanicMetaData.mechanicID] = {
      ...newState[mechanicMetaData.mechanicID],
      ...mechanicMetaData,
    }
  })

  return newState
}

const remove = (state, payload) => {
  const newState = { ...state }
  delete newState[payload.id]
  return newState
}

const reset = () => {
  return initial
}

export const reducer = (state = initial, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.MECHANIC_META_DATA.success():
      return add(state, payload)
    case actionTypes.MECHANIC_META_DATA.custom('addList'):
      return addList(state, payload)
    case actionTypes.MECHANIC_META_DATA.custom('remove'):
      return remove(state, payload)
    case actionTypes.MECHANIC_META_DATA.reset():
      return reset()
    default:
      return state
  }
}

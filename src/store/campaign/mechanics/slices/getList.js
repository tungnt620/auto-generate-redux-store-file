import * as types from '../actionTypes'

export const initial = {
  loading: false,
  data: null,
  error: null
}

const start = (state) => {
  return {
    ...state,
    loading: true
  }
}

const success = (state, payload) => {
  return {
    ...state,
    data: payload.data,
    loading: false
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
    loading: false
  }
}

const reset = () => {
  return initial
}

const add = (state, payload) => {
  return {
    ...state,
    data: [
      ...state.data,
      payload.data
    ]
  }
}

const update = (state, payload) => {
  const { mechanicID, data } = payload

  const newList = []
  const oldList = state.data || []
  oldList.forEach(mechanic => {
    if (mechanic.id === mechanicID) {
      newList.push(data)
    } else {
      newList.push(mechanic)
    }
  })

  return {
    ...state,
    data: newList,
  }
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_LIST_MECHANIC.start():
      return start(state)
    case types.GET_LIST_MECHANIC.success():
      return success(state, payload)
    case types.GET_LIST_MECHANIC.fail():
      return fail(state, payload)
    case types.GET_LIST_MECHANIC.reset():
      return reset()
    case types.GET_LIST_MECHANIC.custom('add'):
      return add(state, payload)
    case types.GET_LIST_MECHANIC.custom('update'):
      return update(state, payload)
    default:
      return state
  }
}

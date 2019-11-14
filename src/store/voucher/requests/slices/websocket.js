import * as types from '../actionTypes'

export const initial = {
  data: {},
  error: null,
}

const start = (state) => {
  return state
}

const fail = (state, payload) => {
  return {
    ...state,
    error: payload.error,
  }
}

const reset = () => {
  return initial
}

const receive = (state, payload) => {
  const { type, data } = payload.data

  let newData = {}
  if (type === 'notify') {
    newData = data
  }

  return {
    ...state,
    data: newData,
    error: null,
  }
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.REQUEST_WEB_SOCKET.start():
      return start(state)
    case types.REQUEST_WEB_SOCKET.fail():
      return fail(state, payload)
    case types.REQUEST_WEB_SOCKET.reset():
      return reset()
    case types.REQUEST_WEB_SOCKET.custom('RECEIVED'):
      return receive(state, payload)
    case types.REQUEST_WEB_SOCKET.custom('CLOSED'):
      return reset()
    default:
      return state
  }
}

import * as types from '../types'

export const initial = {
  data: null,
  update: null,
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

const resetOnUpdate = (state) => {
  return {
    ...state,
    update: null,
  }
}

const receive = (state, payload) => {
  const { type, data } = payload.data
  let newData = state.data || { data: [] }
  let dataUpdate = state.update || []
  switch (type) {
    case 'editing.all':
      newData = payload.data
      break
    case 'editing.notify':
      newData.data.push(data)
      break
    case 'release':
      for (let i in newData.data) {
        const { username, id } = newData.data[i]
        if (username === data.username && id === data.id) {
          newData.data.splice(i, 1)
        }
      }
      break
    case 'update':
    case 'new':
    case 'delete':
      for (let i = 0; i < data.length; i++) {
        dataUpdate.push({
          type,
          data: data[i],
        })
      }
      break
    default:
      newData = state.data
  }
  return {
    ...state,
    data: newData,
    update: dataUpdate,
    error: null,
  }
}

const send = (state) => {
  return state
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SUBMISSIONS_WEB_SOCKET.start():
      return start(state)
    case types.SUBMISSIONS_WEB_SOCKET.fail():
      return fail(state, payload)
    case types.SUBMISSIONS_WEB_SOCKET.reset():
      return reset()
    case types.SUBMISSIONS_WEB_SOCKET.custom('RECEIVED'):
      return receive(state, payload)
    case types.SUBMISSIONS_WEB_SOCKET.custom('SENDING'):
      return send(state)
    case types.SUBMISSIONS_WEB_SOCKET.custom('CLOSED'):
      return reset()
    case types.SUBMISSIONS_WEB_SOCKET.custom('RESET_ON_UPDATE'):
      return resetOnUpdate(state)
    default:
      return state
  }
}
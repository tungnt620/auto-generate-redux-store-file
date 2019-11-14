import * as types from '../actionTypes'
import Sockette from 'sockette'

let ws = null

export const resetVoucherRequestWebsocket = () => {
  return {
    type: types.REQUEST_WEB_SOCKET.reset(),
  }
}

const start = () => {
  return {
    type: types.REQUEST_WEB_SOCKET.start(),
  }
}

const fail = (error) => {
  return {
    type: types.REQUEST_WEB_SOCKET.fail(),
    payload: { error },
  }
}

const receive = (data) => {
  return {
    type: types.REQUEST_WEB_SOCKET.custom('RECEIVED'),
    payload: { data },
  }
}

export const connectVoucherRequestWebSocket = (requestID) => {
  return dispatch => {
    ws = new Sockette(
      `${process.env.REACT_APP_SOCKET_BASE_URL}/ws/voucher_requests/${requestID}/`,
      {
        onopen: () => dispatch(start()),
        onmessage: e => dispatch(receive(JSON.parse(e.data))),
        onerror: () => dispatch(fail('error')),
      })
    return {
      type: types.REQUEST_WEB_SOCKET.custom('CONNECT'),
    }
  }
}

export const closeVoucherRequestWebSocket = () => {
  if (ws) {
    ws.close(1000)
  }
  return {
    type: types.REQUEST_WEB_SOCKET.custom('CLOSED'),
  }
}

import * as types from './types'
import axios from '../../../axios-settings'
import EventEmitter from 'shared/EventEmitter'
import { EVENT_COMMENT_TO_SUBMISSION } from '../../../components/Voucher/Request/contants'

export const resetGetListComments = () => {
  return {
    type: types.GET_LIST_REQUEST_COMMENTS.reset(),
  }
}

const getListCommentsSuccess = (data, code) => {
  return {
    type: types.GET_LIST_REQUEST_COMMENTS.success(),
    payload: {
      data,
      code,
    },
  }
}

const getListCommentsFail = (error, code) => {
  return {
    type: types.GET_LIST_REQUEST_COMMENTS.fail(),
    payload: {
      error,
      code,
    },
  }
}

const getListCommentsStart = () => {
  return {
    type: types.GET_LIST_REQUEST_COMMENTS.start(),
  }
}

export const getListComments = (params) => {
  return dispatch => {
    dispatch(getListCommentsStart())
    axios({
      method: 'get',
      url: '/api/vouchers/comments/',
      params: params,
    }).then(res => {
      const { data, code, msg } = res.data
      if (code === 0) {
        dispatch(getListCommentsSuccess(data, code))
      } else {
        dispatch(getListCommentsFail(msg, code))
      }
    }).catch(err => {
      dispatch(getListCommentsFail(err.toString()))
    })
  }
}

export const resetCreateComment = () => {
  return {
    type: types.CREATE_REQUEST_COMMENT.reset(),
  }
}

const createCommentSuccess = (data, code) => {
  return {
    type: types.CREATE_REQUEST_COMMENT.success(),
    payload: {
      data,
      code,
    },
  }
}

const createCommentFail = (error, code) => {
  return {
    type: types.CREATE_REQUEST_COMMENT.fail(),
    payload: {
      error,
      code,
    },
  }
}

const createCommentStart = () => {
  return {
    type: types.CREATE_REQUEST_COMMENT.start(),
  }
}

export const createComment = (params) => {
  return dispatch => {
    dispatch(createCommentStart())
    axios({
      method: 'post',
      url: '/api/vouchers/comments/',
      data: params,
    }).then(res => {
      const { msg, code, data } = res.data
      if (code === 0) {
        dispatch(createCommentSuccess(data, code))

        EventEmitter.dispatch(
          EVENT_COMMENT_TO_SUBMISSION,
          { commentID: data.id, submissionIDs: data.submission_ids }
        )
      } else {
        dispatch(createCommentFail(msg, code))
      }
    }).catch(err => {
      dispatch(createCommentFail(err))
    })
  }
}

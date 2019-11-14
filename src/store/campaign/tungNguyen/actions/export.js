import * as types from '../actionTypes'
import axios from 'axios-settings'
import FileSaver from 'file-saver'
import { setFeedbackMessage } from 'src/store/feedback/actions'

const success = (data) => {
  return {
    type: types.CAMPAIGN_EXPORT.success(),
    payload: { data }
  }
}

const fail = (error) => {
  return {
    type: types.CAMPAIGN_EXPORT.fail(),
    payload: { error }
  }
}

const start = () => {
  return {
    type: types.CAMPAIGN_EXPORT.start()
  }
}

export const exportCampaign = (campaignID) => {
  return dispatch => {
    dispatch(start())
    axios({
      method: 'post',
      url: `/api/tungNguyen/export/${campaignID}/`,
      responseType: 'blob'
    }).then(res => {
      if (res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // TODO: logic here maybe can be reuse, we have multiple place download speadsheet file
        let fileName = ''
        const disposition = res.headers['content-disposition']
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = new RegExp(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
          const matches = filenameRegex.exec(disposition)
          if (matches != null && matches[1]) {
            fileName = matches[1].replace(/['"]/g, '')
          }
        }
        FileSaver.saveAs(res.data, fileName)
        dispatch(success('Success'))
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

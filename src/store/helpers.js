import FileSaver from 'file-saver'
import { setFeedbackMessage } from './feedback/actions'

export function processDownloadFileResp(res, dispatch, success, fail) {
  if (res.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    || res.headers['content-type'] === 'application/x-zip-compressed') {
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
    dispatch(success(0))
  } else {
    let code, msg
    const fr = new FileReader()
    fr.onload = function () {
      const respData = JSON.parse(this.result)
      code = respData.code
      msg = respData.msg

      dispatch(fail(msg, code))
      dispatch(setFeedbackMessage('error', msg))
    }
    fr.readAsText(res.data)
  }
}

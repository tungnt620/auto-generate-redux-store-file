import * as types from '../actionTypes'

export const initial = {
  loading: false,
  data: [],
  error: null,
  code: null,
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
    ...payload,
    loading: false,
  }
}

const massDelete = (state, payload) => {
  const { ids } = payload
  const newData = state.data.filter(sbm => !ids.includes(sbm.id))

  return {
    ...state,
    data: newData,
    loading: false,
  }
}

const massUpdate = (state, payload) => {
  const { submissions } = payload
  const needUpdatedSbmIDDataMap = submissions.reduce((map, sbm) => {
    map[sbm.id] = sbm
    return map
  }, {})

  let newData = []
  state.data.forEach(sbm => {
    newData.push(needUpdatedSbmIDDataMap[sbm.id] ? needUpdatedSbmIDDataMap[sbm.id] : sbm)
    delete needUpdatedSbmIDDataMap[sbm.id]
  })

  newData = [...Object.values(needUpdatedSbmIDDataMap), ...newData]

  return {
    ...state,
    data: newData,
    loading: false,
  }
}

const addToList = (state, payload) => {
  const { submission } = payload
  const newData = [submission, ...state.data]

  return {
    ...state,
    data: newData,
    loading: false,
  }
}

const updateItemInList = (state, payload) => {
  const { submission } = payload
  const newData = []
  state.data.forEach(sbm => {
    newData.push(sbm.id === submission.id ? submission : sbm)
  })

  return {
    ...state,
    data: newData,
    loading: false,
  }
}

const deleteItemInList = (state, payload) => {
  const { id } = payload

  const newData = []
  state.data.forEach(sbm => {
    if (sbm.id !== id) newData.push(sbm)
  })

  return {
    ...state,
    data: newData,
    loading: false,
  }
}

const fail = (state, payload) => {
  return {
    ...state,
    ...payload,
    loading: false,
  }
}

const reset = () => {
  return initial
}

export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case types.GET_LIST_SUBMISSION.start():
      return start(state)
    case types.GET_LIST_SUBMISSION.success():
      return success(state, payload)
    case types.GET_LIST_SUBMISSION.fail():
      return fail(state, payload)
    case types.GET_LIST_SUBMISSION.reset():
      return reset()
    case types.GET_LIST_SUBMISSION.custom('massDelete'):
      return massDelete(state, payload)
    case types.GET_LIST_SUBMISSION.custom('massUpdate'):
      return massUpdate(state, payload)
    case types.GET_LIST_SUBMISSION.custom('addToList'):
      return addToList(state, payload)
    case types.GET_LIST_SUBMISSION.custom('updateItemInList'):
      return updateItemInList(state, payload)
    case types.GET_LIST_SUBMISSION.custom('deleteItemInList'):
      return deleteItemInList(state, payload)
    default:
      return state
  }
}

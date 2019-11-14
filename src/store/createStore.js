import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import campaignsReducer from './campaign/campaigns/reducers'
import userReducer from './user/reducers'
import groupCategoriesReducer from './groupCategories/reducers'
import categoriesReducer from './categories/reducers'
import feedbackReducer from './feedback/reducers'
import templatesReducer from './campaign/templates/reducers'
import mechanicsReducer from './campaign/mechanics/reducers'
import submissionsReducer from './campaign/submissions/reducers'
import teamsReducer from './teams/reducers'
import previewsReducer from './campaign/previews/reducers'
import approversReducer from './voucher/approvers/reducers'
import templateShortInfosReducer from './voucher/templateShortInfos/reducers'
import requestsReducer from './voucher/requests/reducers'
import voucherTemplateReducer from './voucher/templates/reducers'
import submissionsTemplateReducer from './voucher/submissions/reducers'
import commentReducer from './voucher/comments/reducers'
import voucherFileReducer from './voucher/fileAttachment/reducers'
import attachmentsTemplateReducer from './voucher/attachments/reducers'
import voucherTeamsReducer from './voucher/teams/reducers'
import voucherCategoriesReducer from './voucher/categories/reducers'
import voucherStatisticsReducer from './voucher/statistics/reducers'
import voucherUIConfigReducer from './ui/voucher/reducers'
import commonUIConfigReducer from './ui/common/reducers'

const voucherRootReducer = combineReducers({
  approvers: approversReducer,
  templateShortInfos: templateShortInfosReducer,
  requests: requestsReducer,
  templates: voucherTemplateReducer,
  submissions: submissionsTemplateReducer,
  comments: commentReducer,
  fileAttachments: voucherFileReducer,
  attachments: attachmentsTemplateReducer,
  teams: voucherTeamsReducer,
  categories: voucherCategoriesReducer,
  statistics: voucherStatisticsReducer,
})

const campaignRootReducer = combineReducers({
  campaigns: campaignsReducer,
  templates: templatesReducer,
  mechanics: mechanicsReducer,
  submissions: submissionsReducer,
  previews: previewsReducer,
})

const UIRootReducer = combineReducers({
  voucher: voucherUIConfigReducer,
  common: commonUIConfigReducer,
})

const rootReducer = combineReducers({
  user: userReducer,
  groupCategories: groupCategoriesReducer,
  categories: categoriesReducer,
  feedback: feedbackReducer,
  teams: teamsReducer,

  voucher: voucherRootReducer,
  campaign: campaignRootReducer,
  ui: UIRootReducer,
})

const middlewares = [thunk]
let composeEnhancers = compose
if (process.env.NODE_ENV === 'development') {
  const loggerMiddleware = createLogger()
  middlewares.push(loggerMiddleware)
  composeEnhancers = (typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
}

export default (preloadState) => createStore(
  rootReducer,
  preloadState,
  composeEnhancers(applyMiddleware(...middlewares)),
)

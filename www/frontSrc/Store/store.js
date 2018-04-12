import { combineReducers , createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import userReducer from '../Header/Reducers/userReducer'
import clockReducer from '../Header/Reducers/clockReducer'
import serviceReducer from '../Header/Reducers/serviceReducer'
import hostReducer from '../Header/Reducers/hostReducer'

const logger = createLogger()

const rootReducer = combineReducers({
  user: userReducer,
  clock: clockReducer,
  service: serviceReducer,
  host: hostReducer,
})

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)
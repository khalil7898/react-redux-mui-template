import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { Env } from 'config/Env'
import postsReducer from 'features/posts/store/posts.slice'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
}

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 1,
})

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    posts: postsReducer,
    router: routerReducer,
  }),
)

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: Env.isDev(),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: true }).concat(routerMiddleware).concat(logger),
  })

  return store
}

export const store = makeStore()
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const history = createReduxHistory(store)

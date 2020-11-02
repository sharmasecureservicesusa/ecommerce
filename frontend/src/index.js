import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth'
import shopReducer from './store/reducers/shop'
import orderReducer from './store/reducers/order';
import adminReducer from './store/reducers/admin'
import { watchAuth, watchShop, watchAdmin, watchOrder } from './store/sagas/index'

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  shop: shopReducer,
  order: orderReducer,
  admin: adminReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchShop)
sagaMiddleware.run(watchOrder)
sagaMiddleware.run(watchAdmin)

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

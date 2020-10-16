import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

// redux-thunk library for async fetch

// redux-sagas
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

// LOGGER LIBRARY
// catches the action, it console logs it out
// and then it moves it along
import { logger } from 'redux-logger';
import rootReducer from './root-reducer';

const createSagaMiddlewares = createSagaMiddleware();

const middlewares = [createSagaMiddlewares];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

createSagaMiddlewares.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };

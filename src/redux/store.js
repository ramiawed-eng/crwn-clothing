import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
// LOGGER LIBRARY
// catches the action, it console logs it out
// and then it moves it along
import { logger } from 'redux-logger';
import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };

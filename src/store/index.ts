import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './reducers/authReducer';
import { thunk } from 'redux-thunk';
import retailerReducer from './reducers/retailerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  retailer: retailerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk) as any);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = ReturnType<typeof store.dispatch>;

export default store;

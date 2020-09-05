import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/';

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  );
}
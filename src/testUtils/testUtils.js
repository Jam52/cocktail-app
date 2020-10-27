import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/rootReducer';
import ReduxThunk from 'redux-thunk';

export const storeFactory = (initialState) => {
  const middlewears = [ReduxThunk];
  const createStoreWithMiddlewears = applyMiddleware(...middlewears)(
    createStore,
  );
  return createStoreWithMiddlewears(rootReducer, initialState);
};

export const findByAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

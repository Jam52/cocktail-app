import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleWears = [ReduxThunk];

const createStoreWithMiddlewear = applyMiddleware(...middleWears)(createStore);

export default createStoreWithMiddlewear(rootReducer);

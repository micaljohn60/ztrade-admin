import {applyMiddleware,compose,legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/index';

// const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(thunk))
)

export default store;
import {combineReducers} from 'redux';
import { CategoryReducer } from './reducers/category_reducers';
import { PercentReducer } from './reducers/percent_reducer';
import { SliderReducer } from './reducers/slider_reducers';
import { StoreReducer } from './reducers/store_reducers';

const reducers = combineReducers({
    categories : CategoryReducer,
    percent : PercentReducer,
    slider : SliderReducer,
    store : StoreReducer
});

export default reducers;
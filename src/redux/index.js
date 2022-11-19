import {combineReducers} from 'redux';
import { AboutUsReducer } from './reducers/about_us_reducer';
import { BannerReducer } from './reducers/banner_reducer';
import { CategoryReducer } from './reducers/category_reducers';
import { PercentReducer } from './reducers/percent_reducer';
import { ProductReducer } from './reducers/product_reducers';
import { SliderReducer } from './reducers/slider_reducers';
import { StoreReducer } from './reducers/store_reducers';

const reducers = combineReducers({
    categories : CategoryReducer,
    percent : PercentReducer,
    slider : SliderReducer,
    store : StoreReducer,
    banner : BannerReducer,
    product : ProductReducer,
    aboutus : AboutUsReducer
});

export default reducers;
import { combineReducers } from 'redux';
import { AboutUsReducer, PolicyReducer, TermReducer } from './reducers/about_us_reducer';
import { BannerReducer } from './reducers/banner_reducer';
import { CategoryReducer } from './reducers/category_reducers';
import { OrderReducer } from './reducers/order_reducers';
import { PercentReducer } from './reducers/percent_reducer';
import { ProductReducer, SingleProductReducer } from './reducers/product_reducers';
import { RoleAndPermissionReducer } from './reducers/role_and_permissions_reducer';
import { SiteSettingReducer } from './reducers/site_setting_reducer';
import { SliderReducer } from './reducers/slider_reducers';
import { StaffReducer } from './reducers/staff_reducers';
import { StoreReducer } from './reducers/store_reducers';
import { UserReducer } from './reducers/user_reducers';

const reducers = combineReducers({
    categories: CategoryReducer,
    percent: PercentReducer,
    slider: SliderReducer,
    store: StoreReducer,
    banner: BannerReducer,
    product: ProductReducer,
    aboutus: AboutUsReducer,
    term: TermReducer,
    policy: PolicyReducer,
    singleProduct: SingleProductReducer,
    user: UserReducer,
    roleAndPermissions: RoleAndPermissionReducer,
    staff: StaffReducer,
    siteSetting: SiteSettingReducer,
    order: OrderReducer
});

export default reducers;

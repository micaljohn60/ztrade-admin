import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import { getCookie } from './cookies/cookie';
import BannerManagement from './layouts/dashboard/banner/BannerManagement';
import ProductCategory from './layouts/dashboard/product_category/ProductCategory';
import RolesAndPermissions from './layouts/dashboard/rolesAndPermissions/RolesAndPermissions';
import SliderManagement from './layouts/dashboard/slider/SliderManagement';
import AddNewUser from './layouts/dashboard/user/AddNewUser';
import AboutUs from './pages/about_us/AboutUs';
import Customer from './pages/Customer';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import Order from './pages/Order';
import NotFound from './pages/Page404';
import PrivacyPolicy from './pages/privacy_policy/PrivacyPolicy';
import CreateProduct from './pages/products/CreateProduct';
import EditProduct from './pages/products/ProductEdit';
import ProductLists from './pages/products/ProductLists';
import Profile from './pages/profile/Profile';
import SiteSetting from './pages/site_setting/SiteSetting';
import Store from './pages/store/Store';
import TermAndCondition from './pages/terms_and_conditions/terms_and_conditions';
import User from './pages/User';

// ----------------------------------------------------------------------

export default function Router() {

    const getUserCookie = getCookie("token");

    return useRoutes([
        getUserCookie === null ?

            {
                path: '/',
                element: <Login />,
                children: [
                    { path: '*', element: <Navigate to="/404" /> }
                ]

            }
            :

            {
                path: '/dashboard',
                element: <DashboardLayout />,
                children: [
                    { path: 'app', element: <DashboardApp /> },
                    { path: 'user', element: <User /> },
                    { path: 'aboutus', element: <AboutUs /> },
                    { path: 'customers', element: <Customer /> },
                    { path: 'profile', element: <Profile /> },
                    { path: 'privacy_policy', element: <PrivacyPolicy /> },
                    { path: 'terms_and_conditions', element: <TermAndCondition /> },
                    { path: 'products', element: <ProductLists /> },
                    { path: 'products/:productId', element: <EditProduct /> },
                    { path: 'brand', element: <Store /> },
                    { path: 'rolesandpermisions', element: <RolesAndPermissions /> },
                    { path: 'addnewusers', element: <AddNewUser /> },
                    // { path: 'blog', element: <Blog /> },
                    { path: 'createproduct', element: <CreateProduct /> },
                    { path: 'site_setting', element: <SiteSetting /> },
                    { path: 'slider', element: <SliderManagement /> },
                    { path: 'productcategory', element: <ProductCategory /> },
                    { path: 'banner', element: <BannerManagement /> },
                    { path: 'orders', element: <Order /> },
                ],
            },
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: '/', element: <Navigate to="/dashboard/app" /> },
                // { path: 'login', element: <Login /> },
                // { path: 'register', element: <Register /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },


    ]);
}

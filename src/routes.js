import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CreateProduct from './pages/products/CreateProduct';
import SliderManagement from './layouts/dashboard/slider/SliderManagement';
import ProductCategory from './layouts/dashboard/product_category/ProductCategory';
import BannerManagement from './layouts/dashboard/banner/BannerManagement';
import ProductLists from './pages/products/ProductLists';
import RolesAndPermissions from './layouts/dashboard/rolesAndPermissions/RolesAndPermissions';
import AddNewUser from './layouts/dashboard/user/AddNewUser';
import Store from './pages/store/Store';
import EditProduct from './pages/products/ProductEdit';
import AboutUs from './pages/about_us/AboutUs';
import PrivacyPolicy from './pages/privacy_policy/PrivacyPolicy';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },       
        { path: 'aboutus', element: <AboutUs /> },
        { path: 'privacy_policy', element: <PrivacyPolicy /> },
        { path: 'products', element: <ProductLists/>},
        { path: 'products/:productId', element: <EditProduct/>},
        { path: 'brand', element: <Store/>},
        { path: 'rolesandpermisions', element: <RolesAndPermissions/>},
        { path: 'addnewusers', element: <AddNewUser/>},
        // { path: 'blog', element: <Blog /> },
        { path: 'createproduct', element: <CreateProduct/>},
        { path: 'slider', element: <SliderManagement/>},
        { path: 'productcategory', element: <ProductCategory/>},
        { path: 'banner', element: <BannerManagement/>}
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

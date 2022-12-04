// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Upload Product',
    path: '/dashboard/createproduct',
    icon: getIcon('gridicons:create'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Slider Management',
    path: '/dashboard/slider',
    icon: getIcon('dashicons:image-flip-horizontal'),
  },
  {
    title: 'Brands',
    path: '/dashboard/brand',
    icon: getIcon('tabler:brand-appgallery'),
  },
  {
    title: 'Product Category',
    path: '/dashboard/productcategory',
    icon: getIcon('eos-icons:products-outlined'),
  },
  {
    title: 'Banner Management',
    path: '/dashboard/banner',
    icon: getIcon('dashicons:cover-image'),
  },
  {
    title: 'Roles and Permissions',
    path: '/dashboard/rolesandpermisions',
    icon: getIcon('icon-park-outline:permissions'),
  },
  
  {
    title: 'Add New User',
    path: '/dashboard/addnewusers',
    icon: getIcon('akar-icons:person-add'),
  },
  {
    title: 'about us',
    path: '/dashboard/aboutus',
    icon: getIcon('clarity:help-info-line'),
  },
  {
    title: 'privacy policy',
    path: '/dashboard/privacy_policy',
    icon: getIcon('dashicons:privacy'),
  },
  {
    title: 'Site Setting',
    path: '/dashboard/site_setting',
    icon: getIcon('icon-park-outline:setting-web'),
  },
  
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;

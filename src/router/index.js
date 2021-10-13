
import { Notify } from 'vant';
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
const Catgort = () => import('../views/categort/Catgort');
const Detall = () => import('../views/detail/Detall');
const Home = () => import('../views/home/Home');
const Profile = () => import('../views/profile/Profile');
const Shopcart = () => import('../views/shopcart/Shopcart');
const retister = () => import('../views/profile/retister');
const login = () => import("../views/profile/login");
const Address = ()=>import("../views/profile/Address")
const AddressEdit = ()=>import("../views/profile/AddressEdit")
const CreateOrder = ()=>import("../views/order/CreateOrder")
const order = ()=>import("../views/order/order")
const orderdetail = ()=>import("../views/order/orderdetail")
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/',
    name: 'DefHome',
    component: Home,
    meta: {
      title: '图书兄弟'
    }
  },
  {
    path: '/categort',
    name: 'Catgort',
    component: Catgort,
    meta: {
      title: '商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detall',
    component: Detall,
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: '个人中心',
      isAuthRequired: true,
    }
  },
  {
    path: '/retister',
    name: 'retister',
    component: retister,
    meta: {
      title: '注册'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta: {
      title: '购物车',
      //isAuthRequired: true,
    }
  },

  {
    path: '/Address',
    name: 'Address',
    component: Address,
    meta: {
      title: '地址管理',
      isAuthRequired: true,
    }
  },

  {
    path: '/AddressEdit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      title: '地址编辑',
      isAuthRequired: true,
    }
  },

  {
    path: '/CreateOrder',
    name: 'CreateOrder',
    component: CreateOrder,
    meta: {
      title: '结算',
      isAuthRequired: true,
    }
  },
  
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {
      title: '订单列表',
      isAuthRequired: true,
    }
  },
  {
    path: '/orderdetail',
    name: 'orderdetail',
    component: orderdetail,
    meta: {
      title: '订单详情',
      isAuthRequired: true,
    }
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  if (to.meta.isAuthRequired && store.state.user.isLogin === false) {
    Notify('没有登录')
    return next('/login')
  } else {
    next();

  }
  document.title = to.meta.title;
})
export default router

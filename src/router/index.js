
import { createRouter, createWebHistory } from 'vue-router'
const Catgort = () => import('../views/categort/Catgort');
const Detall = () => import('../views/detail/Detall');
const Home = () => import( '../views/home/Home');
const Profile = () => import( '../views/profile/Profile');
const Shopcart = () => import('../views/shopcart/Shopcart');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/',
    name: 'DefHome',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/categort',
    name: 'Catgort',
    component: Catgort,
    meta:{
      title:'商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detall',
    component: Detall,
    meta:{
      title:'商品详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'个人中心'
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta:{
      title:'购物车'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to,from,next)=>{
  next();
  document.title=to.meta.title;
})
export default router

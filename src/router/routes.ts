import LandingPage from 'pages/LandingPage.vue';
import VerifyAccount from 'components/tools/VerifyAccount.vue';
import LoginPage from 'pages/LoginPage.vue';
import AdminPage from 'pages/AdminPage.vue';
import ProductDetail from 'pages/ProductDetail.vue';

export const routes = [
  {
    path:"/",
    name:"Home",
    component:LandingPage,
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/about",
    name:"About",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/news",
    name:"News",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/keyboard",
    name:"Keyboards",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/Kit keyboard",
    name:"Kit Keyboard",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/mouse",
    name:"Mouse",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/accessory",
    name:"Accessory",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/switch",
    name:"Switch",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/gear",
    name:"Gear",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/support",
    name:"Support",
    meta: {
      show: true,
      showMainMenu:true
    }
  },
  {
    path:"/shop",
    name:"Shop",
    meta: {
      show: true,
      showMainMenu:false
    }
  },
  {
    path:"/detail",
    name:"Detail",
    meta: {
      show: false,
      showMainMenu:true
    },
    component: ProductDetail
  },
  {
    path:"/admin",
    name:"Admin",
    meta: {
      show: true,
      showMainMenu:false
    },
    component: AdminPage
  },
  {
    path:"/verify/:id",
    name:"verify account",
    show:false,
    meta: {
      show: false,
      showMainMenu:true
    },
    component:VerifyAccount
  },
  {
    name:"Sign Up",
    path:"/sign-up",
    show:false,
    meta: {
      show: false,
      showMainMenu:false
    },
    component:LoginPage,
  },
  {
    name:"Login",
    path:"/login",
    show:false,
    meta: {
      show: false,
      showMainMenu:false
    },
    component:LoginPage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  }
]
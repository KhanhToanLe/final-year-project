import LandingPage from 'pages/LandingPage.vue';
import VerifyAccount from 'components/tools/VerifyAccount.vue';
import LoginPage from 'pages/LoginPage.vue';
import AdminPage from 'pages/AdminPage.vue';
import ProductDetail from 'pages/ProductDetail.vue';
import ProductList from 'pages/ProductList.vue'
import ProductLayout from 'src/components/pages/ProductLayout.vue';

export const routes = [
  {
    path: "/",
    name: "Home",
    component: LandingPage,
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },
  {
    path: "/product",
    name: "Product",
    component: ProductLayout,
    meta: {
      show: false,
      showMainMenu: true,
      showSidebar: true,
    },
    children: [
      {
        path: "list",
        component: ProductList,
        meta: {
          showSortBy: true,
        }
      },
      {
        path: "detail/:id",
        component: ProductDetail,
        meta: {
          showSortBy: false,
        }
      }
    ]
  },
  {
    path: "/keyboard",
    name: "Keyboards",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    },
    component: ProductList
  },
  {
    path: "/about",
    name: "About",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false,

    }
  },
  {
    path: "/news",
    name: "News",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },

  {
    path: "/Kit keyboard",
    name: "Kit Keyboard",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false

    }
  },
  {
    path: "/mouse",
    name: "Mouse",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false

    }
  },
  {
    path: "/accessory",
    name: "Accessory",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },
  {
    path: "/switch",
    name: "Switch",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },
  {
    path: "/gear",
    name: "Gear",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },
  {
    path: "/support",
    name: "Support",
    meta: {
      show: true,
      showMainMenu: true,
      showSidebar: false
    }
  },
  {
    path: "/shop",
    name: "Shop",
    meta: {
      show: true,
      showMainMenu: false,
      showSidebar: false

    }
  },
  {
    path: "/detail",
    name: "Detail",
    meta: {
      show: false,
      showMainMenu: true,
      showSidebar: false
    },
    component: ProductDetail
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      show: true,
      showMainMenu: false,
      showSidebar: false
      ,
    },
    component: AdminPage
  },
  {
    path: "/verify/:id",
    name: "verify account",
    show: false,
    meta: {
      show: false,
      showMainMenu: false,
      showSidebar: false
    },
    component: VerifyAccount
  },
  //  {
  //   path: "/product-detail/:id",
  //   name: "Product Detail",
  //   show: false,
  //   meta: {
  //     show: false,
  //     showMainMenu: false,
  //     showSidebar: false
  //   },
  //   component: ProductDetail
  // },
  {
    name: "Sign Up",
    path: "/sign-up",
    show: false,
    meta: {
      show: false,
      showMainMenu: false,
      showSidebar: false

    },
    component: LoginPage,
  },
  {
    name: "Login",
    path: "/login",
    show: false,
    meta: {
      show: false,
      showMainMenu: false,
      showSidebar: false

    },
    component: LoginPage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  }
]
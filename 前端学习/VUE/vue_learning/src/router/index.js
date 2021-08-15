import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/learning",
    name: "Learning",
    component: () => import("../views/Learning.vue")
  },
  {
    path: "/setting",
    component: () => import("../views/viewsLayout.vue"),
    children: [
      {
        path: "emails",
        component: () => import("../components/layout/EmailSubscription.vue")
      },
      {
        path: "profile",
        components: {
          default: () => import("../components/layout/UserProfile.vue"),
          helper: () => import("../components/layout/UserProfilePreview.vue")
        }
      }
    ]
  },
  {
    path: "/loginlimit",
    component: () => import("../views/loginLimit.vue"),
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      console.log("登录限制");
      if (to.matched.some(route => route.meta.requiresAuth)) {
        let user = sessionStorage.user || "{}";
        user = JSON.parse(user);
        console.log(user);
        if (user.id) {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  },
  {
    path: "/guidetransition",
    component: () => import("../views/guideTransition.vue"),
    children: [
      {
        path: "aaaa",
        component: () => import("../components/guideTransition/aaaa.vue")
      },
      {
        path: "bbbb",
        component: () => import("../components/guideTransition/bbbb.vue")
      }
    ]
  },
  {
    path: "*",
    component: () => import("../views/NotFound.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

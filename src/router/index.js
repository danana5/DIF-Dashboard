import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import EditNightSheet from "@/components/EditNightSheet";
import Dashboard from "@/components/Dashboard";
import ViewNightSheet from "@/components/ViewNightSheet";
import NewNightSheet from "@/components/NewNightSheet";
import ListNightSheets from "@/components/ListNightSheets";
import Search from "@/components/Search";
import Login from "@/components/Login";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/dash",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/new",
      name: "new-night-sheet",
      component: NewNightSheet,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/list",
      name: "list-night-sheets",
      component: ListNightSheets,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/edit/:sheet_id",
      name: "edit-night-sheet",
      component: EditNightSheet,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:sheet_id",
      name: "view-night-sheet",
      component: ViewNightSheet,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/dash",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

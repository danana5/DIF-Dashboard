import Vue from "vue";
import Router from "vue-router";
import EditNightSheet from "@/components/EditNightSheet";
import Dashboard from "@/components/Dashboard";
import ViewNightSheet from "@/components/ViewNightSheet";
import NewNightSheet from "@/components/NewNightSheet";
import ListNightSheets from "@/components/ListNightSheets";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/new",
      name: "new-night-sheet",
      component: NewNightSheet
    },
    {
      path: "/list",
      name: "list-night-sheets",
      component: ListNightSheets
    },
    {
      path: "/edit/:sheet_id",
      name: "edit-night-sheet",
      component: EditNightSheet
    },
    {
      path: "/:sheet_id",
      name: "view-night-sheet",
      component: ViewNightSheet
    }
  ]
});

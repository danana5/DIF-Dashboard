import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import "./components/firebaseInit";

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

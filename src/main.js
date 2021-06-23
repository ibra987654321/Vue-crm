import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Paginate from "vuejs-paginate";
import firebase from "firebase/app";
import dateFilter from "./filter/date.filter";
import currencyFilter from "./filter/currency.filter";
import tooltipDirective from "./directives/tooltip.directive";
import messagePlugin from "./utils/message.plugin";
import Loader from "./components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;
Vue.directive("tooltip", tooltipDirective);
Vue.use(messagePlugin);
Vue.component("Paginate", Paginate);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.component("Loader", Loader);

const firebaseConfig = {
  apiKey: "AIzaSyBiaV72FckdILgSjDoEYuq9SglnD_PrJcM",
  authDomain: "count-app-322e6.firebaseapp.com",
  databaseURL: "https://count-app-322e6-default-rtdb.firebaseio.com",
  projectId: "count-app-322e6",
  storageBucket: "count-app-322e6.appspot.com",
  messagingSenderId: "754960935040",
  appId: "1:754960935040:web:8718c330d4fb2b835f9e65",
  measurementId: "G-1SQJP3X0FH"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

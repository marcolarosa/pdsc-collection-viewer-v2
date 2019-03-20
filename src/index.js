"use strict";

import "@babel/polyfill";

import Vue from "vue";
import VueScrollTo from "vue-scrollto";
import infiniteScroll from "vue-infinite-scroll";
import { VueMasonryPlugin } from "vue-masonry";
Vue.use(VueScrollTo);
Vue.use(infiniteScroll);
Vue.use(VueMasonryPlugin);

import App from "components/app.vue";
import { router } from "./routes";
// import { store } from "store";
// import { http } from "services/http.service";

// Vue.prototype.inteja = { configuration };
// Vue.prototype.$http = http;
App.router = router;
// App.store = store;
const app = new Vue(App);

import { createStore } from "vuex";
import coach from "./modules/coach/index.js";
import request from "./modules/request/index.js";
import auth from "./modules/auth/index.js";

export default createStore({
  state() {},
  mutations: {},
  actions: {},
  getters: {},
  modules: { coaches: coach, requests: request, auth: auth }
});

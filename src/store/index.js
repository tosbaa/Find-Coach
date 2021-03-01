import { createStore } from "vuex";
import coach from "./modules/coach/index.js";
import request from "./modules/request/index.js";

export default createStore({
  state() {
    return {
      userId: "c3"
    };
  },
  mutations: {},
  actions: {},
  modules: { coaches: coach, requests: request }
});

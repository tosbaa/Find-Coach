import { createStore } from "vuex";
import coach from "./modules/coach/index.js";
import request from "./modules/request/index.js";

export default createStore({
  state() {
    return {
      userId: "c5"
    };
  },
  mutations: {},
  actions: {},
  getters: {
    userId(state) {
      return state.userId;
    }
  },
  modules: { coaches: coach, requests: request }
});

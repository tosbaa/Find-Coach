import { createRouter, createWebHistory } from "vue-router";
import CoachDetails from "../views/coaches/CoachDetails.vue";
import CoachList from "../views/coaches/CoachList.vue";
import CoachRegister from "../views/coaches/CoachRegister.vue";
import ContactCoach from "../views/requests/ContactCoach.vue";
import RequestReceived from "../views/requests/RequestsReceived.vue";
import UserAuth from "../views/auth/UserAuth.vue";
import NotFound from "../views/NotFound.vue";

import store from "../store/index.js";
const routes = [
  {
    path: "/",
    redirect: "/coaches"
  },
  {
    path: "/coaches",
    component: CoachList
  },
  {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [
      {
        path: "contact",
        component: ContactCoach
      }
    ]
  },
  {
    path: "/register",
    component: CoachRegister,
    meta: { requiresAuth: true }
  },
  {
    path: "/requests",
    component: RequestReceived,
    meta: { requiresAuth: true }
  },
  {
    path: "/auth",
    component: UserAuth,
    meta: { requiresUnauth: true }
  },
  {
    path: "/:notFound(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;

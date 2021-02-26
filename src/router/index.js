import { createRouter, createWebHistory } from "vue-router";
import CoachDetails from "../views/coaches/CoachDetails.vue";
import CoachList from "../views/coaches/CoachList.vue";
import CoachRegister from "../views/coaches/CoachRegister.vue";
import ContactCoach from "../views/requests/ContactCoach.vue";
import RequestReceived from "../views/requests/RequestsReceived.vue";
import NotFound from "../views/NotFound.vue";
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
    children: [
      {
        path: "contact",
        component: ContactCoach
      }
    ]
  },
  {
    path: "/register",
    component: CoachRegister
  },
  {
    path: "/requests",
    component: RequestReceived
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

export default router;

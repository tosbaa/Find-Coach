import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/coaches"
  },
  {
    path: "/coaches",
    component: null,
    children: [
      {
        path: ":id",
        component: null,
        children: [
          {
            path: "contact",
            component: null
          }
        ]
      }
    ]
  },
  {
    path: "/register",
    component: null
  },
  {
    path: "/requests",
    component: null
  },
  {
    path: "/coaches",
    component: null
  },

  {
    path: "/:notFound(.*)",
    component: null
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

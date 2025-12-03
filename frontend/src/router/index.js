import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/auth/Register.vue"),
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/receitas",
    name: "receitas",
    component: () => import("@/views/receitas/Index.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/receitas/favoritas",
    name: "receitas-favoritas",
    component: () => import("@/views/receitas/Favorites.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/receitas/criar",
    name: "receitas-criar",
    component: () => import("@/views/receitas/Create.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/receitas/:id",
    name: "receitas-show",
    component: () => import("@/views/receitas/Show.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/receitas/:id/editar",
    name: "receitas-editar",
    component: () => import("@/views/receitas/Edit.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;

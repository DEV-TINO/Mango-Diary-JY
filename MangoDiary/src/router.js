import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: "/",
    component: () => import("./components/SplashPage.vue"),},
    { path: "/calendar",
    component: () => import("./components/CalendarPage.vue")},
    { path: "/write/:selectedDay",
    component: () => import("./components/WritePage.vue") },
    { path: "/statistics",
    component: () => import("./components/StatisticsPage.vue")},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
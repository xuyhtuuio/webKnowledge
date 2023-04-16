import {
    createRouter,
    createWebHashHistory
} from "vue-router"

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import("~/404.vue")
        },
        {
          path : "/",
          redirect: "/login"
        },
        {
            path: "/home",
            component: () => import("~/pages/index.vue")
        },
        {
            path: "/login",
            component: () => import("~/pages/login/login.vue")
        },
    ]
})

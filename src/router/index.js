import {
    createRouter,
    createWebHashHistory
} from "vue-router"

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import("~/404.vue"),
            meta: {
                title: "404页面"
            }
        },
        {
          path: "/home",
          redirect: "/home/index"
        },
        {
            path: "/home",
            component: () => import("~/layouts/admin.vue"),
            children: [
                {
                    path : "index",
                    component : () => import("~/pages/index.vue"),
                    meta: {
                        title: "主控台"
                    }
                }
            ],

        },
        {
            path: "/login",
            component: () => import("~/pages/login/login.vue"),
            meta: {
                title: "登陆界面"
            }
        },
    ]
})

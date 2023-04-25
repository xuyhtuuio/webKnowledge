import {
    createRouter,
    createWebHashHistory
} from "vue-router"

export const router = createRouter({
    history: createWebHashHistory(),

    //这些是默认路由，所有用户共享
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import("~/404.vue"),
            meta: {
                title: "404页面"
            }
        },
        {
            path: "/",
            name: "admin",
            component: () => import("~/layouts/admin.vue"),
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


const asyncRoute = [
    {
        path: "/",
        name: "/",
        component: () => import("~/pages/index.vue"),
        meta: {
            title: "主控台"
        }
    },
    {
        path: "/about",
        name: "/about",
        component: () => import("~/pages/about/about.vue"),
        meta: {
            title: "关于"
        }
    },
    {
        path: "/goods/list",
        name: "/goods/list",
        component: () => import("~/pages/goods/list.vue"),
        meta: {
            title: "商品列表"
        }
    }
]

//添加动态路由，用来匹配菜单
export function asyncAddRoute (menus) {
    const findRouteAndAsyncRoute = (arr) => {
        arr.forEach(e => {
            let item = asyncRoute.find(Routeitem => Routeitem.path == e.frontpath)
            if(item && !router.hasRoute(e.frontpath)) {
                console.log(item)
                router.addRoute("admin", item)
            }
            if(e.child && e.child.length > 0) {
                //如果有子路由就递归再执行一次
                findRouteAndAsyncRoute(e.child)
            }
        })
    }

    findRouteAndAsyncRoute(menus)
}




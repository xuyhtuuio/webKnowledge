import {router} from "~/router/index.js";
import {getToken, setToken} from "~/utils/auth.js";
import {NoPermission} from "~/utils/pop.js";


router.beforeEach((to, from, next) => {
    console.log("走路由了~")
    let token = getToken();
    if (!token && to.path !== "/login") {
        NoPermission()
       return next({path: "login"})
    }
    next()
})


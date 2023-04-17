import MyAxios from "~/service/request/MyAxios.js";


export function login(username, password) {
    return MyAxios.post({
            url: '/admin/login',
            data: {
                username,
                password
            }
        }
    )
}

export function getPermission () {
    return MyAxios.post({
        url: "/admin/getinfo",
    })
}

import axios from "axios";
import {BASEURL, TIMEOUT} from "~/service/request/config.js";
import {ElNotification} from "element-plus";


class MyAxios {
    constructor(BASEURL, TIMEOUT) {
        this.instance = axios.create({
            baseURL: BASEURL,
            timeout: TIMEOUT
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(r => {
                resolve(r.data)
            }).catch(reject => {
                console.log(reject.response.data)
                ElNotification({
                    title: '废物',
                    message: '密码你都记不住？？',
                    type: 'error',
                    duration: 2000
                })
            })
        })
    }

    get(config) {
        return this.request({...config, method: "get"})
    }

    post(config) {
        return this.request({...config, method: "post"})
    }
}

export default new MyAxios(BASEURL, TIMEOUT)

<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>made by yunhao~</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <div>
        <div class="title">欢迎回来</div>
        <div>
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
        </div>
      </div>

      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <user/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
            <template #prefix>
              <el-icon>
                <lock/>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">登 录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>


</template>


<script setup>
import {reactive} from 'vue'
import {login} from "~/api/manager.js";
import {User, Lock} from '@element-plus/icons-vue'
import {ElNotification} from 'element-plus'
import {router} from "~/router/index.js";
import {useCookies} from "@vueuse/integrations/useCookies";
// do not use same name with ref
const form = reactive({
  password: "",
  username: ""
})

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空！！',
      trigger: 'blur',
    },
    {
      min: 3,
      message: '长度至少为3个！！',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空！！',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 12,
      message: '长度为3-12个！！',
      trigger: 'blur'
    },
  ]
}

const onSubmit = () => {


  login(form.username, form.password).then(res => {
    //提示成功
    ElNotification({
      title: '牛逼',
      message: '你记住了你的密码！！',
      type: 'success',
      duration: 2000
    })

    //存储token
    let cookie = useCookies();
    cookie.set("userToken", res.data.token)

    //跳转到后台首页
    router.push({
      path: "/home"
    })
  }).catch(err => {
    console.log(err.response.data)
  })
}
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-purple-500;
}

.login-container .left, .login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>

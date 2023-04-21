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
          <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit" :loading="loading">提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>


</template>


<script setup>
import {computed, onBeforeMount, onMounted, reactive, ref} from 'vue'
import {login, getPermission} from "~/api/manager.js";
import {User, Lock} from '@element-plus/icons-vue'
import {router} from "~/router/index.js";
import {getToken, setToken, removeToken} from "~/utils/auth.js";
import store from "~/store/index.js";


const loading = computed(() => {
  console.log(store.state.is_loading_login)
  return store.state.is_loading_login
})

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


function Login () {
  store.commit("change_login_state", true)
  login(form.username, form.password).then(res => {
    //存储token
    setToken(res.data.token)
    //跳转到后台首页
    router.push({
      path: "/home"
    })
    store.dispatch("getUserInfo", store).then(res => {
      console.log(res)
    })
  })
}

const onSubmit = () => {
  // loading.js.value = true
  Login()

}
function keyUp (event) {
  if(event.key === "Enter") {
   Login()
  }
}

onMounted(() => {
  document.addEventListener("keyup", keyUp)
})

onBeforeMount(() => {
  document.removeEventListener("keyup", keyUp)
})


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

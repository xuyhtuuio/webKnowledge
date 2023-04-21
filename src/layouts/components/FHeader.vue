<template>
  <div class="outer f-header">
    <div class="flex">
      <div class="logo">
        <el-icon :size="28" class="">
          <Basketball/>
        </el-icon>
        <span>云皓-最坚实的后盾</span>
      </div>

      <el-icon class="icon-btn">
        <fold/>
        <Expand/>
      </el-icon>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="icon-btn" @click="handleRefresh">
          <refresh/>
        </el-icon>
      </el-tooltip>

      <div class="ml-188 flex items-center">

        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-icon class="icon-btn" @click="handleFullScreen">
            <full-screen v-if="!isFullscreen"/>
            <aim v-else/>
          </el-icon>
        </el-tooltip>

        <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
        <span>
        <el-avatar :size="35" :src="$store.state.user.data.avatar"/>
         </span>
         {{ $store.state.user.data.username }}
         <el-icon class="el-icon--right">
           <arrow-down/>
         </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <flodDrawer ref="flodDrawerRef" submit-msg="提交" title="修改密码" @submit="onSubmit">
          <el-form ref="formRef" :rules="rules" :model="form" label-width="100px" small>-->
            <el-form-item prop="oldpassword" label="旧密码">
              <el-input v-model="form.oldpassword" placeholder="请输入旧密码"/>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
              <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
              </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认新密码">
              <el-input type="password" v-model="form.repassword" placeholder="请确认密码" show-password>
              </el-input>
            </el-form-item>
          </el-form>
        </flodDrawer>
      </div>
    </div>
  </div>
</template>

<script setup>

import {Aim, ArrowDown, Basketball, Expand, Fold, FullScreen, MoonNight, Refresh} from "@element-plus/icons-vue";
import store from "~/store/index.js";
import popModal from "~/utils/popmodal.js";
import {ElMessage} from "element-plus";
import {changePassword, logout} from "~/api/manager.js";
import {getToken, removeToken} from "~/utils/auth.js";
import {router} from "~/router/index.js";
import {useFullscreen} from '@vueuse/core'
import {reactive, ref} from "vue";
import FlodDrawer from "~/components/flodDrawer.vue";

const {
  isFullscreen,
  toggle
} = useFullscreen()

const drawer = ref(false)

const flodDrawerRef = ref(null)


function Logout() {
  return popModal("确定退出？", "warning", "退出了可麻烦")
      .then(() => {
        ElMessage({
          type: 'success',
          message: '退出成功',
        })
        logout()
            .finally(() => {
              //  清除token
              removeToken()
              //跳转
              router.push({
                path: "/login"
              })
              //清除vuex里的正在登录的用户数据
              store.commit("clean_user_info")
              //刷新页面
              location.reload()
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '很明智',
        })
      })
}


const form = reactive({
  oldpassword: "",
  password: "",
  repassword: ""

})

const rules = {
  oldpassword: [
    {
      required: true,
      message: '老密码不能为空！！',
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
      message: '新密码不能为空！！',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 12,
      message: '长度为3-12个！！',
      trigger: 'blur'
    },
  ],
  repassword: [
    {
      required: true,
      message: '新密码不能为空！！',
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

function handleChangePassword() {
  console.log("您要修改密码")
  // drawer.value = true
  flodDrawerRef.value.open()
}

//刷新
const handleRefresh = () => location.reload()
const handleFullScreen = () => toggle()

const onSubmit = () => {
  //修改密码逻辑
  changePassword(form)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
}

</script>

<style scoped>
.f-header {
  @apply flex items-center bg-purple-500 text-light-50 fixed top-0 left-0 right-0;
//width: 100%; height: 64px; z-index: 1000;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>

<template>
  <div>
    <el-container>
      <el-header>
        <div style="width:400px">
          <p style="float: left;">
            <el-icon color="#409EFF" :size="50">
              <ElementPlus/>
            </el-icon>
          </p>
          <p style="float: left;font-size: 25px; font-weight: bold"> 欢迎来到 </p></div>
      </el-header>
      <el-main>
        <el-card class="login_card">
          <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="95px">
            <el-form-item label="账号：" prop="username">
              <el-input v-model="form.username" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirmPassword">
              <el-input type="password" placeholder="请再次输入密码" v-model="form.confirmPassword"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">注册</el-button>
              <el-button type="primary" @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
      <el-footer>
        <p>关于我们 | 联系我们 | 人才招聘 | 广告服务 | 友情链接</p>
        <p>版权所有 © 2001-2022
          <el-tag>qq：1501788346</el-tag>
        </p>
      </el-footer>
    </el-container>
  </div>
</template>
<script setup> import userApi from "../api/user";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter();

const form = reactive({username: "", password: "", confirmPassword: "",});
const ruleFormRef = ref();
const rules = reactive({
  username: [{required: true, message: "账号不能为空", trigger: "blur"}],
  password: [{required: true, message: "密码不能为空", trigger: "blur"}],
  confirmPassword: [{required: true, message: "确认密码不能为空", trigger: "blur"},
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }],
});
const onSubmit = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await userApi.saveUser(form);
      if (res.data) {
        if (res.data.code === 0) {
          ElMessage.success("注册成功")
          router.push("/");
        } else {
          ElMessage.error(res.data.message);
        }
      } else {
        ElMessage.error("服务器内部错误");
      }
    } else {
      return false;
    }
  });
};
const resetForm = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.resetFields();
};

</script>
<style scoped>
.el-container {
  height: 720px;
}

.el-header {
  height: 10%;
}

.el-main {
  height: 80%;
  background-image: url("../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 120%;
  background-position-y: bottom;
}

.login_card {
  margin: 100px 200px;
  width: 20%;
  min-width: 300px;
  height: 250px;
  border-radius: 10px;
}

.el-footer {
  height: 10%;
  text-align: center;
} </style>
<template>
  <div>
    <navbar>
      <template v-slot:default>用户注册</template>
    </navbar>
    <div style="margin-top: 50px">
      <div style="text-align: center">
        <nav-image>
          <van-image
            width="100"
            height="100"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </nav-image>
      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password_confirmation"
        type="password"
        name="password_confirmation"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '确认密码' }]"
      />
      <van-field
        v-model="email"
        name="email"
        label="电子邮箱"
        placeholder="电子邮箱"
        :rules="[{ required: true, message: '电子邮箱' }]"
      />
      <div style="margin: 16px">
        <div @click="long">已有账号，立即登录</div>
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import Navbar from "../../components/common/navbar/Navbar.vue";
import { reactive, toRefs } from "vue";
import { Notify, Toast } from "vant";
import { reqister } from "../../network/user";
import { useRouter } from "vue-router";
export default {
  name: "",
  setup() {
    const router = useRouter();
    const userinfo = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const onSubmit = () => {
      if (userinfo.password != userinfo.password_confirmation) {
        Notify("密码不一致");
      } else {
        reqister(userinfo).then((res) => {
          if (res.status == "201") {
            Toast.success("注册成功");
            setTimeout(() => {
              router.push({ path: "/login" });
            }, 1000);
          }
        });
      }
    };
    const long = () => {
router.push({ path: "/login" });

    };
    return {
      ...toRefs(userinfo),
      onSubmit,
      long
    };
  },
  data() {
    return {};
  },
  //计算属性
  computed: {},
  //函数
  methods: {},
  //组件
  components: {
    Navbar,
  },
};
</script>

<style scoped>
</style>


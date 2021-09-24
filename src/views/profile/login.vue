<template>
  <div>
    <navbar>
      <template v-slot:default>用户登录</template>
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
        v-model="email"
        name="email"
        label="email"
        placeholder="email"
        :rules="[{ required: true, message: '请填写email' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <div @click="long">没有账号，立即注册</div>
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
import { login } from "../../network/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import getter from "../../store/getter";
export default {
  name: "",
  setup() {
    const router = useRouter();
    const store = useStore();
    const userinfo = reactive({
      email: "",
      password: "",
    });
    const onSubmit = () => {
      login(userinfo).then((res) => {
        //登录成功后保存本地window.localStorage.setItem
        window.localStorage.setItem("token", res.data.access_token);
        store.state.user.isLogin = true;
        Toast.success("登录成功");
        getter.lockgett();
        setTimeout(() => {
          router.go(-1);
        }, 500);
      });
    };
    const long = () => {
      router.push({ path: "/retister" });
    };
    return {
      ...toRefs(userinfo),
      onSubmit,
      long,
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


<template>
  <div class="login-container">
    <div class="login-form">
      <div class="">
        <h2 class="login-form-title">LOGIN FORM</h2>
      </div>
      <div class="input-container">
        <label for="login-email">Email</label>
        <input
            :style="mailOutline === 'red' ? {border: '5px solid rgba(255, 0, 0, 0.8)'} : mailOutline === 'green' ? {border: '5px solid rgba(36, 168, 3, 0.5)'} : ''"
            id="login-email" type="email"
            v-model="email" @input="checkEmail">
        <p :style="showEmailError ? {color: 'rgba(255, 0, 0, 0.8)'} : {color: '#fff'}">Not a valid Email address</p>
      </div>
      <div class="input-container">
        <label for="login-pass">Password</label>
        <input
            :style="passOutline === 'red' ? {border: '5px solid rgba(255, 0, 0, 0.8)'} : passOutline === 'green' ? {border: '5px solid rgba(36, 168, 3, 0.5)'} : ''"
            id="login-pass" type="password" v-model="password" @input="checkPassword">
        <p :style="showPasswordError ? {color: 'rgba(255, 0, 0, 0.8)'} : {color: '#fff'}">Password should have at
          least 4 characters</p>
      </div>
      <div class="login-btn" @click="login">
        <span>LOGIN</span>
      </div>
      <div class="sign-up">
        <span>Not a member? <a class="sign-up-link" href="#">Signup now</a></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore} from "../stores/mainStore";
import {useRoute, useRouter} from "vue-router";

interface LoginPageInterface {
  isEmailValid: boolean,
  isPasswordValid: boolean,
  email: string,
  password: string,
  showEmailError: boolean,
  showPasswordError: boolean,
  emailFormat: RegExp,
  mailOutline: string,
  passOutline: string,
}

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    return {store, router, route};
  },
  data(): LoginPageInterface{
    return {
      isEmailValid: false,
      isPasswordValid: false,
      email: "",
      password: "",
      showEmailError: false,
      showPasswordError: false,
      emailFormat: /^\S+@\S+\.\S+$/,
      mailOutline: "grey",
      passOutline: "grey",
    };
  },
  computed: {},
  methods: {
    checkEmail() {
      if (!this.email.toLowerCase().match(this.emailFormat)) {
        this.mailOutline = "red";
      } else {
        this.isEmailValid = true;
        this.mailOutline = "green";
      }
    },
    checkPassword() {
      if (this.password.length < 4) {
        this.passOutline = "red";
      } else {
        this.isPasswordValid = true;
        this.passOutline = "green";
      }
    },
    async login() {
      if (this.isEmailValid && this.isPasswordValid) {
        await this.store.login(this.email, this.password);
      } else {
        if (!this.isEmailValid) {
          this.mailOutline = "red";
          this.showEmailError = true;
          setTimeout(() => {
            this.showEmailError = false;
          }, 5000);
        }
        if (!this.isPasswordValid) {
          this.passOutline = "red";
          this.showPasswordError = true;
          setTimeout(() => {
            this.showPasswordError = false;
          }, 5000);
        }
      }
    }
  }
});
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  padding: 30px;
  margin: 20px 0 60px 0;
  width: 90%;
  max-width: 500px;
  background-color: #ffffff;
  border-radius: 30px;
  filter: drop-shadow(0 0 10px rgba(26, 25, 25, 0.4));
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.login-form-title {
  color: #272727;
  font-size: 2.5rem;
  font-weight: 900;
}

.input-container {
  margin: 0;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.input-container label {
  color: #595959;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.5rem;
  width: 100%;
  padding: 0 2px;
}

.input-container input {
  font-size: 1.3rem;
  padding: 0 20px;
  height: 60px;
  width: 100%;
  outline: none;
  border: 5px solid rgba(1, 1, 1, 0.2);
  border-radius: 10px;
}

.input-container p {
  margin: 0;
  padding: 10px 0 0 0;
  user-select: none;
  color: rgba(255, 0, 0, 0.8);
  font-weight: 600;
  font-size: 1.1rem;
}

.login-btn {
  background: rgb(125, 30, 201);
  background: linear-gradient(132deg, rgba(125, 30, 201, 1) 4%, rgba(0, 212, 255, 1) 83%);
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 900;
  height: 65px;
  letter-spacing: 2px;
  border-radius: 10px;
  margin: 30px 0 0 0;
  cursor: pointer;
  user-select: none;
}

.login-btn:active {
  filter: opacity(0.8);
}

.sign-up {
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 10px 0 30px 0;
}

.sign-up-link {
  color: #00a2ff;
  text-decoration: none;
}

</style>

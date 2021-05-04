<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title center-align"><b>Домашняя бухгалтерия</b></span>
      <div class="login-wrapper" v-if="!isLoading">
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email">Email</label>
          <small
              v-if="$v.email.$dirty && !$v.email.required"
              class="helper-text invalid"
          >Емейл не должен быть пустым</small>
          <small
              v-else-if="$v.email.$dirty && !$v.email.email"
              class="helper-text invalid"
          >Введите коректный емейл</small>
        </div>
        <div class="input-field">
          <input
              id="password"
              type="password"
              v-model="password"
              :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
          >
          <label for="password">Пароль</label>
          <small
              v-if="$v.password.$dirty && !$v.password.required"
              class="helper-text invalid"
          >Введите пароль</small>
          <small
              v-else-if="$v.password.$dirty && !$v.password.minLength"
              class="helper-text invalid"
          >Пароль должен содержать как минимум 6 символов</small>
        </div>
      </div>
      <Loader v-else />
    </div>
    <div class="card-action">
      <div>
        <button
            :class="{disabled: isLoading}"
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{loginButtonMessage}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/src/validators'
import messages from "@/utils/messages";
import Loader from "../components/app/Loader";

export default {
  name: "Login",
  components: {Loader},
  data: () => ({
    isLoading: false,
    loginButtonMessage: 'Вход',
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try {
        this.isLoading = true;
        this.loginButtonMessage = 'Выполняется вход...';
        await this.$store.dispatch('login', formData)
        this.loginButtonMessage = 'Успешно';
        this.isLoading = false;
        await this.$router.push('/');
      } catch (e) {
        this.isLoading = false;
        this.loginButtonMessage = 'Вход';
      }
    }
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  updated() {
    M.updateTextFields()
  }
}
</script>

<style scoped>

</style>
<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title center-align"><b>Домашняя бухгалтерия</b></span>
      <div class="actions-wrapper" v-if="!isLoading">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="name" :class="{active: !isLoading}">Имя</label>
          <small
              v-if="$v.name.$dirty && !$v.name.required"
              class="helper-text invalid"
          >Введите имя</small>
        </div>
        <div class="input-field">
          <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
          >
          <label for="email" :class="{active: !isLoading}">Email</label>
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
          <label for="password" :class="{active: !isLoading}">Пароль</label>
          <small
              v-if="$v.password.$dirty && !$v.password.required"
              class="helper-text invalid"
          >Введите пароль</small>
          <small
              v-else-if="$v.password.$dirty && !$v.password.minLength"
              class="helper-text invalid"
          >Пароль должен содержать как минимум 6 символов</small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree"/>
            <span>С правилами согласен</span>
          </label>
        </p>
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
          {{ registerButtonMessage }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";
import Loader from "../components/app/Loader";

export default {
  name: "Register",
  components: {Loader},
  data: () => ({
    name: '',
    email: '',
    password: '',
    agree: false,
    isLoading: false,
    registerButtonMessage: 'Зарегистрироваться',
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v => v}
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      try {
        this.isLoading = true;
        this.registerButtonMessage = 'Выполняется регистрация...'
        await this.$store.dispatch('register', formData);
        this.registerButtonMessage = 'Успешно'
        await this.$router.push('/');
      } catch (e) {
        this.isLoading = false;
        this.registerButtonMessage = 'Зарегистрироваться'
      }
    }
  }
}
</script>

<style scoped>

</style>
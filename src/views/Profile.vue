<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{'profile.title' | localize}}</h3>
      </div>

      <form class="form" @submit.prevent="onSubmit">
        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="name"
              :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="description">{{'profile.name' | localize}}</label>
          <small
              v-if="$v.name.$dirty && !$v.name.required"
              class="helper-text invalid"
          >{{'profile.error.enter-name' | localize}}</small>
        </div>

        <div class="switch">
          <label>
            {{'profile.locale.english' | localize}}
            <input type="checkbox" v-model="isRuLocale">
            <span class="lever"></span>
            {{'profile.locale.russian' | localize}}
          </label>
        </div>

        <button 
          class="btn waves-effect waves-light"
          type="submit">
          {{'profile.refresh' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/src/validators'
import {mapGetters, mapActions} from 'vuex';
import localizeFilter from '@/filters/localize.filter'

export default {
  name: "Profile",
  metaInfo() {
    return {
      title: this.$title('app.title.profile'),
    }
  },
  data: () => ({
    name: '',
    isRuLocale: true,
  }), 
  validations: {
    name: {required},
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  },
}
</script>

<style scoped>

</style>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
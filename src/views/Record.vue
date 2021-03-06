<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>Новая запись</h3>
      </div>

      <Loading v-if="loading" />

      <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
      
      <form v-else class="form" @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="categories_select" v-model="catetory">
            <option 
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
             >{{ category.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="income"
                v-model="type"
            />
            <span>Доход</span>
          </label>
        </p>

        <p>
          <label>
            <input
                class="with-gap"
                name="type"
                type="radio"
                value="outcome"
                v-model="type"
            />
            <span>Расход</span>
          </label>
        </p>

        <div class="input-field">
          <input
              id="amount"
              type="number"
              v-model.number="amount"
              :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
          >
          <label for="amount">Сумма</label>
          <span 
              class="helper-text invalid"
              v-if="$v.amount.$dirty && !$v.amount.minValue"
          >
          Минимальная сумма {{ $v.amount.$params.minValue.min }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="description"
              type="text"
              v-model="description"
              :class="{invalid: $v.description.$dirty && !$v.description.required}"
          >
          <label for="description">Описание</label>
          <span 
              class="helper-text invalid"
              v-if="$v.description.$dirty && !$v.description.required"
          >
          Введите описание
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex';

export default {
  name: "Record",
  metaInfo() {
    return {
      title: this.$title('app.title.record'),
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    catetory: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
      amount: {required, minValue: minValue(1)},
      description: {required}
  },
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
          this.$v.$touch()
          return
      }

      if(this.canCreateRecord) {
        const record = {
          categoryId: this.catetory,
          type: this.type,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON()
        }
        try {
          await this.$store.dispatch('createRecord', record)
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете: -${this.amount - this.info.bill} UAH`)
      }
    }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if(this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if(this.categories.length) {
      this.catetory = this.categories[0].id
    }

    setTimeout(() => {
      M.updateTextFields()
      this.select = M.FormSelect.init(this.$refs.categories_select)
    }, 0)
  
  },
  beforeDestroy() {
      if(this.select && this.select.destroy) {
          this.select.destroy()
      } 
  },
}
</script>

<style scoped>

</style>
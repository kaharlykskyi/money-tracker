<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3>{{'bill.title' | localize}}</h3>

        <button class="btn waves-effect waves-light btn-small" @click="refresh">
          <i class="material-icons">refresh</i>
        </button>
      </div>

      <Loading v-if="loading"/>

      <div v-else class="row">
          <HomeBill
            :rates="currency.rates"
          />
          <HomeCurrency
            :rates="currency.rates"
            :date="currency.date"
          />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('app.title.home'),
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  components: {
    HomeBill, HomeCurrency,
  }
}
</script>

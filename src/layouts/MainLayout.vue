<template>
  <div>
    <Loading v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @collapse="isOpen = !isOpen"/>

      <Sidebar v-model="isOpen"/>

      <main class="app-content" :class="{full: !isOpen}">
        <router-view />
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue pulse" to="/record" v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Неизвестная ошибка');
    }
  }
}
</script>

<style scoped>

</style>
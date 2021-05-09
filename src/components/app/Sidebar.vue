<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  name: "Sidebar",
  props: ['value'],
  data: () => ({
    links: [
      {title: localizeFilter('menu.bill'), url: '/', exact: true},
      {title: localizeFilter('menu.categories'), url: '/categories'},
      {title: localizeFilter('menu.planning'), url: '/planning'},
      {title: localizeFilter('menu.history'), url: '/history'},
    ]
  })
}
</script>

<style scoped>

</style>
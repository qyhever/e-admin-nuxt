<template>
  <div class="basic-layout" :class="{collapse}">
    <Sidebar></Sidebar>
    <div class="sidebar-pad" v-if="isSidebarFixed"></div>
    <section class="main">
      <Headerbar></Headerbar>
      <Nuxt />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { menuList } from '@/config/menu'
import { getMenuItemByRoutePath, getDocumentTitle } from '@/utils'
import Sidebar from './default/components/sidebar'
import Headerbar from './default/components/headerbar'
import './default/index.scss'
export default {
  components: {
    Sidebar,
    Headerbar
  },
  data() {
    return {
      isSidebarFixed: true
    }
  },
  watch: {
    $route() {
      this.setDocumentTitle()
    }
  },
  computed: {
    ...mapState(['collapse'])
  },
  mounted() {
    this.setDocumentTitle()
  },
  methods: {
    setDocumentTitle() {
      const menuItem = getMenuItemByRoutePath(this.$route.path, menuList)
      document.title = getDocumentTitle(menuItem)
    }
  }
}
</script>

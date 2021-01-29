<template>
  <aside class="sidebar" :class="[theme]">
    <router-link class="logo-container" to="/" title="e-admin">
      <img class="image" src="@/assets/images/logo.png" alt="logo">
      <transition name="el-fade-in">
        <h1 v-show="!collapse" class="title">e-admin</h1>
      </transition>
    </router-link>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        class="menu"
        :collapse="collapse"
        :collapse-transition="false"
      >
        <MenuItem :menus="menus"></MenuItem>
      </el-menu>
    </el-scrollbar>
    <div class="toggle-theme" v-show="!collapse">
      <div class="toggle-theme-left">
        <ComSvgIcon name="bulb"></ComSvgIcon>
        <span class="toggle-theme-text">切换主题</span>
      </div>
      <el-switch
        :active-text="collapse ? '' : '黑'"
        :inactive-text="collapse ? '' : '白'"
        active-value="dark"
        inactive-value="light"
        v-model="theme"
      />
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import { getAccessMenus } from '@/utils'
import { menuTree } from '@/config/menu'
import MenuItem from './menu-item'
export default {
  name: 'Sidebar',
  components: {
    MenuItem
  },
  data() {
    return {
      theme: 'light'
    }
  },
  computed: {
    ...mapState(['collapse', 'user']),
    activeMenu() {
      const { meta, path } = this.$route
      if (meta && meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    menus() {
      return getAccessMenus(menuTree, this.user.resourceCodes)
    }
  }
}
</script>

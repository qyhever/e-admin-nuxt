<template>
  <header class="header">
    <el-row type="flex">
      <el-row class="header-toggle" type="flex" align="middle" justify="center" @click.native="onToggle">
        <ComSvgIcon :name="collapse ? 'menu-collapse' : 'menu-uncollapse'" class="menu-button" />
      </el-row>
      <el-row type="flex" align="middle">
        <Breadcrumb />
      </el-row>
    </el-row>
    <div class="header-right">
      <el-dropdown placement="bottom-end">
        <el-row class="user" type="flex" align="middle">
          <span class="name">{{user.userName || '用户名'}}</span>
          <el-avatar class="avatar" :size="32" :src="user.avatar" @error="errorHandler">
            <img src="@/assets/images/default.png">
          </el-avatar>
          <i class="el-icon-caret-bottom user-dropdown__arrow"></i>
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="onLogout">
            <ComSvgIcon name="logout"></ComSvgIcon>
            安全退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import Breadcrumb from './breadcrumb'
export default {
  name: 'Headerbar',
  components: {
    Breadcrumb
  },
  computed: {
    ...mapState(['collapse', 'user'])
  },
  methods: {
    errorHandler() {
      return true
    },
    onToggle() {
      this.$store.commit('setCollapse')
    },
    onLogout() {
      this.$confirm('确定要退出吗?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookie.remove('token')
        window.location.reload()
      }).catch(console.log)
    }
  }
}
</script>

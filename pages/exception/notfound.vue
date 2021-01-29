<template>
  <el-row class="notfound" type="flex" align="middle">
    <SvgIcon name="404" class="notfound-image"></SvgIcon>
    <h3 class="title">404</h3>
    <p class="subtitle">抱歉，该页面不存在</p>
    <router-link to="/">
      <el-button type="primary">返回首页</el-button>
    </router-link>
  </el-row>
</template>

<script>
import SvgIcon from '@/components/svg-icon'
export default {
  name: 'NotFound',
  layout: 'blank',
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss" scoped>
  .notfound {
    flex-direction: column;
    padding-top: 48px;
  }
  .notfound-image {
    font-size: 300px;
  }
  .title {
    margin: 18px 0 16px;
    font-size: 24px;
    font-weight: 400;
  }
  .subtitle {
    margin-bottom: 18px;
    color: rgba(0, 0, 0, .45);
  }
</style>

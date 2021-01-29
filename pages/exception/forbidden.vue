<template>
  <el-row class="forbidden" type="flex" align="middle">
    <SvgIcon name="403" class="forbidden-image"></SvgIcon>
    <h3 class="title">403</h3>
    <p class="subtitle">抱歉，您没有权限访问此页</p>
    <router-link to="/">
      <el-button type="primary">返回首页</el-button>
    </router-link>
  </el-row>
</template>

<script>
import SvgIcon from '@/components/svg-icon'
export default {
  name: 'Forbidden',
  layout: 'blank',
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss" scoped>
  .forbidden {
    flex-direction: column;
    padding-top: 48px;
  }
  .forbidden-image {
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

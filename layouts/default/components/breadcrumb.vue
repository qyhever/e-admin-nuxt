<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in list" :key="item.path">
        <!-- last item not required click -->
        <span v-if="index === list.length - 1">{{item.name}}</span>
        <NuxtLink v-else :to="item.path">{{item.name}}</NuxtLink>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { menuTree } from '@/config/menu'
function getBreadcrumbs(breads, path) {
  const matches = []
  path
    // Remove trailing slash "/" from path
    .replace(/\/$/, '')
    // Split pathname into sections
    .split('/')
    // Reduce over the sections and breads map for each section.
    .reduce((previousSection, currentSection) => {
      // Combine the last route section with the currentSection.
      // For example, `pathname = /1/2/3` results in match checks for
      // `/1`, `/1/2`, `/1/2/3`.
      const pathSection = !currentSection ? '/' : `${previousSection}/${currentSection}`
      const breadcrumbName = breads[pathSection]
      if (breadcrumbName) {
        matches.push({
          path: pathSection,
          name: breadcrumbName
        })
      }
      return pathSection === '/' ? '' : pathSection
    }, '')
  return matches
}
export const generateBreadByRoutes = (list) => {
  const result = {}
  const pathMapToTitle = (data, parentPath) => {
    data.forEach(item => {
      const { bread, title, path } = item
      if (!result[path]) {
        if (path) {
          if (parentPath && !path.startsWith('/')) { // 如果不是绝对路径
            result[parentPath + '/' + path] = bread || title
          } else {
            result[path] = bread || title
          }
        }
        if (Array.isArray(item.children)) {
          pathMapToTitle(item.children, item.path)
        }
      }
    })
  }
  pathMapToTitle(list)
  return result
}

export default {
  name: 'Breadcrumb',
  data() {
    return {
      list: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        const breads = {
          ...generateBreadByRoutes(menuTree),
          '/': '首页'
        }
        this.list = getBreadcrumbs(breads, newRoute.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  ::v-deep .el-breadcrumb__item {
    white-space: nowrap;
  }
}
</style>


export const getDocumentTitle = (menuItem) => {
  if (menuItem && menuItem.title) {
    return 'e-admin-nuxt - ' + menuItem.title
  }
  return 'e-admin-nuxt'
}
/**
 * 判断当前路由是否拥有权限
 * @param {Object} menu 当前菜单对象
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (menu, resourceCodes = []) => {
  if (menu.auth && Array.isArray(menu.auth)) {
    return menu.auth.some(code => resourceCodes.includes(code))
  }
  return true
}

/**
 * 生成有权限的菜单
 * @param {Array} menuTree 菜单树
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} accessMenus
 */
export const getAccessMenus = (menuTree, resourceCodes) => {
  return menuTree.filter(item => {
    if (Array.isArray(item.children)) {
      item.children = getAccessMenus(item.children, resourceCodes)
    }
    return hasPermission(item, resourceCodes)
  })
}

/**
 * 根据菜单树获取扁平化的菜单列表
 * @param {Array} menuTree 菜单树
 * @return {Array} 菜单列表
 */
export const getFlattenMenus = (menuTree) => {
  let result = []
  menuTree.forEach(item => {
    result.push(item)
    if (Array.isArray(item.children)) {
      result = result.concat(getFlattenMenus(item.children))
    }
  })
  return result
}

export const getMenuItemByRoutePath = (routePath, flattenMenus) => {
  const current = flattenMenus.find(v => v.path === routePath)
  if (!current) {
    throw new Error('The current routing path is not found in the menu, please check your menu configuration')
  }
  return current
}

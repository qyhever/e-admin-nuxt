import axios from 'axios'
import { menuList } from '@/config/menu'
import { getMenuItemByRoutePath, hasPermission } from '@/utils'
const cookieparser = require('cookieparser')
const loginPagePath = '/login'

export default async function (ctx) {
  const { req, store, route, redirect } = ctx
  if (req?.headers?.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    axios.defaults.headers.common.Authorization = parsed.token
  }
  // 有 token
  const token = store.state.token
  if (token) {
    if (!store.state.user.id) {
      await store.dispatch('queryCurrentUser')
    }
    // login page
    if (route.path === loginPagePath) {
      return redirect('/')
    }
    // others page
    const menuItem = getMenuItemByRoutePath(route.path, menuList)
    if (!hasPermission(menuItem, store.state.user.resourceCodes)) {
      return redirect('/exception/forbidden')
    }
  }
  // 无 token
  if (!token) {
    if (route.path !== loginPagePath) {
      return redirect(loginPagePath)
    }
  }
}

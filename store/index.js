import { omit } from 'lodash'
import Cookie from 'js-cookie'
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: {},
    token: '',
    loading: false,
    collapse: false
  }
}
export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = token
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setCollapse(state, collapse) {
    state.collapse = typeof collapse !== 'undefined' ? collapse : !state.collapse
  }
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit')
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      // try {
      //   user = JSON.parse(parsed.user)
      //   // get async user
      // } catch (err) {
      //   // No valid cookie found
      // }
      // commit('setUser', user)
      commit('setToken', parsed.token)
    }
  },
  async login({ commit }, data) {
    try {
      const { token } = await this.$api.user.login(data)
      commit('setToken', token)
      Cookie.set('token', token)
    } catch (err) {
      console.log(err)
    }
  },
  async queryCurrentUser({ commit }) {
    try {
      const userInfo = await this.$api.user.getCurrentUser()
      const user = omit(userInfo, ['password'])
      user.resourceCodes = user.resources.map(v => v.code)
      commit('setUser', user)
    } catch (err) {
      console.log(err)
    }
  }
}

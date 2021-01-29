import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import Cookie from 'js-cookie'
import { initRequest } from '@/utils/request'
import api from '@/api'
const baseURL = 'https://qyhever.com/e-admin'

const codeMessage = {
  400: '请求错误',
  401: '登录状态失效，请重新登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  500: '服务器繁忙',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
}

const genEmptyPromise = () => new Promise(() => { }) // eslint-disable-line

export default (ctx, inject) => {
  let loadingCount = 0

  function startCount() {
    loadingCount++
    if (process.client && !ctx.store.state.user.loading) {
      ctx.store.commit('setLoading', true)
    }
  }

  function endCount() {
    loadingCount--
    if (process.client && loadingCount === 0) {
      ctx.store.commit('setLoading', false)
    }
  }
  // 生成错误 msg
  const getErrorMsg = (error, errorMsg) => {
    let msg = ''
    if (errorMsg) {
      return errorMsg
    }
    // http 错误响应
    if (error.response) {
      const { status } = error.response
      return codeMessage[status]
    }
    // 超时或断网
    if (error.message.includes('timeout')) {
      msg = '请求超时！请检查网络是否正常'
    } else {
      msg = '网络错误，请检查网络是否已连接！'
    }
    return msg || '操作失败'
  }

  // 请求开始
  const requestStart = (
    config,
    loadingCb,
    showLoading
  ) => {
    loadingCb(true)
    startCount()
    config.headers = config.headers || {}
    const token = axios.defaults.headers.common.Authorization || Cookie.get('token')
    if (token) {
      config.headers.Authorization = token
    }
    if (showLoading) {
      // Loading.open()
    }
  }

  // 请求结束，处理正常响应
  const requestThenEnd = (
    response,
    loadingCb,
    showWarning,
    warningMsg,
    throwWarningError
  ) => {
    loadingCb(false)
    endCount()
    const responseData = response.data || {}
    if (responseData.success) { // success code
      return responseData.data
    }
    // not success code
    if (showWarning) {
      Message.closeAll()
      Message.warning(warningMsg || responseData.msg || '操作失败')
    }
    // 抛出业务错误
    if (throwWarningError) {
      const err = new Error(JSON.stringify(responseData, null, 2))
      err.name = 'warning'
      return Promise.reject(err)
    }
    return genEmptyPromise()
  }

  // 请求结束，处理错误响应
  const requestCatchEnd = (
    error,
    loadingCb,
    showError,
    errorMsg,
    throwHttpError
  ) => {
    loadingCb(false)
    endCount()
    if (axios.isCancel(error)) { // 取消请求的错误，直接跳过
      console.log('repeated request: ' + error.message)
      return Promise.reject(error)
    }
    const msg = getErrorMsg(error, errorMsg)
    if (showError) {
      Message.closeAll()
      Message.warning(msg)
    }
    if (error.response) {
      const { status } = error.response
      if (status === 401) {
        // removeUserData()
        window.location.reload()
      }
    }
    // 抛出http错误
    if (throwHttpError) {
      return Promise.reject(error)
    }
    return genEmptyPromise()
  }

  /**
   * 过滤空参数
   * @param {Object} params 参数对象
   */
  const paramsSerializer = (params) => {
    const data = {}
    for (const k in params) {
      const value = params[k]
      if (value !== '' && value !== null && value !== undefined) {
        data[k] = value
      }
    }
    return qs.stringify(data)
  }

  const instance = axios.create({
    baseURL,
    // 只作用于 params（手动拼接在 url 后的参数不走这里）
    paramsSerializer
  })

  /**
   * @param {Object} options 请求配置参数
   * @param {Boolean} [options.showWarning=true] 是否显示业务错误提示（请求成功，但业务状态码非成功状态）
   * @param {Boolean} [options.showError=true] 是否显示http错误提示（http请求失败）
   * @param {Boolean} [options.showLoading=true] 是否显示 loading
   * @param {Function} [options.loadingCb=()=>{}] loading 状态回调
   * @param {Boolean} [options.throwWarningError=true] 是否抛出业务逻辑错误（请求成功，但业务状态码非成功状态）
   * @param {Boolean} [options.throwHttpError=true] 是否显示http错误（http请求失败）
   * @param {String} [options.warningMsg=''] 业务错误提示
   * @param {String} [options.errorMsg=''] http错误提示
   * @return {Promise} Promise
   */
  const request = (options) => {
    const {
      showWarning = true,
      showError = true,
      showLoading = true,
      loadingCb = () => { }, // eslint-disable-line
      throwWarningError = true,
      throwHttpError = true,
      warningMsg = '',
      errorMsg = '',
      ...config
    } = options
    requestStart(config, loadingCb, showLoading)
    return instance(config)
      .then(response => {
        return requestThenEnd(response, loadingCb, showWarning, warningMsg, throwWarningError)
      })
      .catch(error => {
        console.log('request catch', error)
        return requestCatchEnd(error, loadingCb, showError, errorMsg, throwHttpError)
      })
  }
  initRequest(request)
  inject('request', request)
  inject('api', api(request))
}

import { Base64 } from 'js-base64'
const baseName = 'e-admin-nuxt'
const REMEMBER_LOGIN_USER = `${baseName}-remember-user`

export const setRememberUser = (data) => {
  const enText = Base64.encode(JSON.stringify(data))
  return localStorage.setItem(REMEMBER_LOGIN_USER, enText)
}

export const getRememberUser = () => {
  const enText = localStorage.getItem(REMEMBER_LOGIN_USER)
  if (!enText) {
    return null
  }
  let data = null
  try {
    const deText = Base64.decode(enText)
    data = JSON.parse(deText)
  } catch (err) {
    console.log(err)
    removeRememberUser()
  }
  return data
}

export const removeRememberUser = () => {
  return localStorage.removeItem(REMEMBER_LOGIN_USER)
}

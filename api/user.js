export default function(request) {
  return {
    login(data) {
      return request({
        method: 'post',
        url: '/user/login',
        data
      })
    },
    getCurrentUser() {
      return request({
        method: 'get',
        url: '/user/current'
      })
    },
    getUsers(params) {
      return request({
        method: 'get',
        url: '/user',
        params
      })
    }
  }
}

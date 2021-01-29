import user from './user'
export default function(request) {
  return {
    user: user(request)
  }
}

// https://webpack.js.org/guides/dependency-management/#context-module-api
const req = require.context('../assets/svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
console.log('process.BROWSER_BUILD', process.BROWSER_BUILD)

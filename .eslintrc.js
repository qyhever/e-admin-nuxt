module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attributes-order': 'off',
    'vue/mustache-interpolation-spacing': 'off', // 双花括号前后必须空格
    'space-before-function-paren': 'off',
    'vue/name-property-casing': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/order-in-components': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-parens': 'off',
    'curly': 'off', // 强制所有控制语句使用一致的括号风格
    'vue/html-self-closing': 'off'
  }
}

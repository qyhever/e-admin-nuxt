const path = require('path')

function resolve(s) {
  return path.resolve(__dirname, s)
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'e-admin-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/index.scss',
    '@/assets/styles/element-variables.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/global-component',
    '@/plugins/request',
    '@/plugins/svg'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    extend(config, { isDev, isClient }) {
      // get and remove file loader
      // https://github.com/nuxt/nuxt.js/blob/dev/packages/webpack/src/config/base.js#L380
      // https://github.com/nuxt/nuxt.js/issues/1584
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp|avif)$/i')
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)
      // set svg-sprite-loader
      config.module.rules = config.module.rules.concat([
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: [resolve('assets/svg')],
          options: {
            symbolId: 'icon-[name]'
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
          loader: 'url-loader',
          exclude: [resolve('assets/svg')],
          options: {
            limit: 10000,
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      ])
      return config
    }
  },
  
  loading: {
    color: '#346fff',
    height: '3px'
  },
  // https://github.com/nuxt-community/style-resources-module/
  styleResources: {
    scss: '@/assets/styles/var.scss'
  },
  server: {
    port: 7777 // default: 3000
  },
  router: {
    middleware: [
      'auth',
      // 'anonymous'
    ],
    extendRoutes(routes, resolve) {
      const extraRoutes = [
        {
          path: '/',
          redirect: '/dashboard'
        },
        {
          path: '*',
          component: resolve(__dirname, 'pages/exception/notfound.vue')
        }
      ]
      routes.push(...extraRoutes)
    }
  }
}

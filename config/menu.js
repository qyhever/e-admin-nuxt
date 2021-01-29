import { getFlattenMenus } from '@/utils'
export const menuTree = [
  {
    path: '/dashboard',
    title: '仪表盘',
    icon: 'dashboard'
  },
  {
    path: '/component',
    title: '组件',
    icon: 'component',
    auth: ['component'],
    children: [
      {
        path: '/component/clipboard',
        title: '复制',
        auth: ['clipboard']
      },
      {
        path: '/component/qrcode',
        title: '二维码',
        auth: ['qrcode']
      }
    ]
  },
  {
    path: '/richtext',
    title: '富文本',
    icon: 'edit',
    auth: ['richtext'],
    children: [
      {
        path: '/richtext/tinymce',
        title: 'tinymce',
        auth: ['tinymce']
      },
      {
        path: '/richtext/ckeditor',
        title: 'ckeditor',
        auth: ['ckeditor']
      }
    ]
  },
  {
    path: '/user',
    title: '账号管理',
    icon: 'user',
    auth: ['user']
  },
  {
    path: '/role',
    title: '角色管理',
    icon: 'role',
    auth: ['role']
  },
  {
    path: '/resource',
    title: '权限管理',
    icon: 'resource',
    auth: ['resource']
  },
  {
    path: '/permission/admin',
    title: 'admin页面',
    icon: 'admin',
    auth: ['adminPage']
  },
  {
    path: '/permission/dev',
    title: 'dev页面',
    icon: 'dev',
    auth: ['devPage']
  },
  {
    path: '/permission/guest',
    title: 'guest页面',
    icon: 'guest',
    auth: ['guestPage']
  },
  {
    path: '/permission/test',
    title: 'test页面',
    icon: 'test',
    auth: ['testPage']
  },
  {
    path: '/permission/operation',
    title: 'operation页面',
    icon: 'operation',
    auth: ['operationPage']
  },
  {
    path: '/analysis',
    title: '分析页',
    icon: 'analysis'
  },
  {
    path: '/exception/forbidden',
    title: 'forbidden',
    hidden: true
  }
]

export const menuList = getFlattenMenus(menuTree)

/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 20:52:52
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 11:14:01
 * @Description: 描述
 */

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'icon-gongzuotai',
    component: './welcome',
  },
  {
    path: '/login',
    name: 'login',
    layout: false,
    component: './login',
  },
  {
    name: 'audit-management',
    icon: 'icon-shenheguanli',
    path: '/audit-management',
    access: '2',
    routes: [
      {
        path: '/audit-management',
        redirect: '/audit-management/collect-task',
      },
      {
        name: 'collect-task',
        icon: 'smile',
        path: '/audit-management/collect-task',
        component: './audit-management/collect-task',
        access: '3',
      },
      {
        name: 'vidu-audited',
        icon: 'smile',
        path: '/audit-management/vidu-audited',
        component: './audit-management/vidu-audited',
        access: '4',
      },
      {
        name: 'vidu-unaudited',
        icon: 'smile',
        path: '/audit-management/vidu-unaudited',
        component: './audit-management/vidu-unaudited',
        access: '5',
      },
      {
        name: 'eden-audited',
        icon: 'smile',
        path: '/audit-management/eden-audited',
        component: './audit-management/eden-audited',
        access: '6',
      },
      {
        name: 'eden-unaudited',
        icon: 'smile',
        path: '/audit-management/eden-unaudited',
        component: './audit-management/eden-unaudited',
        access: '7',
      },
      {
        name: 'auditing',
        icon: 'smile',
        path: '/audit-management/auditing',
        component: './audit-management/auditing',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'user',
    icon: 'icon-yonghuguanli',
    path: '/user',
    access: '8',
    routes: [

    ],
  },
  {
    name: 'personal-info',
    icon: 'smile',
    path: '/user/personal-info',
    component: './user/PersonalInfo',
    hideInMenu: true,
  },
  {
    name: 'quality-inspection',
    icon: 'icon-zhijian',
    path: '/quality-inspection',
    access: '9',
    routes: [],
  },
  {
    name: 'numerical-control',
    icon: 'icon-shukongjichuang',
    path: '/numerical-control',
    access: '10',
    routes: [],
  },
  {
    name: 'data-statistics',
    icon: 'icon-shujutongji',
    path: '/data-statistics',
    access: '11',
    routes: [],
  },
  {
    name: 'settings',
    icon: 'icon-shezhi',
    path: '/settings',
    access: '12',
    routes: [
      {
        path: '/settings',
        redirect: '/settings/staff',
      },
      {
        name: 'staff',
        icon: 'smile',
        path: '/settings/staff',
        component: './settings/staff',
      },
      {
        name: 'role',
        icon: 'smile',
        path: '/settings/role',
        component: './settings/role',
      },
      {
        name: 'common-setting',
        icon: 'smile',
        path: '/settings/common-setting',
        component: './settings/common-setting',
      },
    ],
  },
  {
    name: 'reset-password',
    icon: 'smile',
    path: '/settings/reset-password',
    component: './settings/reset-password',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

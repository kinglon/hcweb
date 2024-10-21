/*
 * @Author: Semmy Wong
 * @Date: 2023-05-25 16:32:27
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-11-21 22:29:29
 * @Description: 描述
 */
const pageCommon = {
  'page.common.all': '全部',
  'page.common.yes': '是',
  'page.common.no': '否',
  'page.common.open': '打开',
  'page.common.close': '关闭',
  'page.common.title': '标题',
  'page.common.operate': '操作',
  'page.common.edit': '编辑',
  'page.common.updating': '正在更新',
  'page.common.update-success': '更新成功',
  'page.common.delete': '删除',
  'page.common.deleting': '正在删除',
  'page.common.delete-success': '删除成功',
  'page.common.delete-confirm': '确定要删除吗',
  'page.common.add': '新增',
  'page.common.adding': '正在添加',
  'page.common.add-success': '添加成功',
  'page.common.created-time': '创建时间',
  'page.common.updated-time': '更新时间',
  'page.common.creator': '创建人',
  'page.common.import': '导入',
  'page.common.export': '导出',
  'page.common.date-time': '日期时间',
  'page.common.date': '日期',
  'page.common.sort': '排序',
  'page.common.remark': '备注',
  'page.common.unauthorized.access': '未授权访问',
  'page.common.auth-success': '成功授权',
  'page.common.auth-success-redirect': '授权成功，请等待跳转。',
  'page.common.request-interface-not-found': '请求接口不存在',
  'page.common.request-fail': '请求失败',
};

const pageWelcome = {};

const pageLogin = {
  'page.login.username-empty': '请输入用户名',
  'page.login.password-empty': '请输入密码'
};

export default {
  ...pageCommon,
  ...pageWelcome,
  ...pageLogin,
};

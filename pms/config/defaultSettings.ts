/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 20:52:52
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-21 11:41:00
 * @Description: 描述
 */
import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string | null | undefined;
} = {
  "navTheme": "light",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": true,
  "pwa": false,
  "colorPrimary": "#1890ff",
  "splitMenus": false,
  "logo": null,
  "siderMenuType": "sub",
  "title": '北京生数科技有限公司在线人审管理系统',
  "colorWeak": false,
  "iconfontUrl": '//at.alicdn.com/t/c/font_4096247_0nwjzdrkooja.js',
  "token": {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};


export default Settings;

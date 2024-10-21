/*
 * @Author: Semmy Wong
 * @Date: 2023-10-13 10:27:26
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-10-15 14:01:56
 * @Description: 描述
 */
import common from './common';
import component from './component';
import hook from './hook';
import menu from './menu';
import page from './page';

export default {
  ...common,
  ...page,
  ...menu,
  ...hook,
  ...component,
};

/*
 * @Author: Semmy Wong
 * @Date: 2023-09-19 23:10:28
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-09-19 23:22:22
 * @Description: 描述
 */
import { createFromIconfontCN } from '@ant-design/icons';
import defaultSettings from '../../../config/defaultSettings';

export const IconFont = createFromIconfontCN({
  // 该地址为iconfont中的项目地址，根据实际进行修改
  scriptUrl: defaultSettings.iconfontUrl,
});

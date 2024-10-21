/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 20:52:52
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-04-07 09:50:58
 * @Description: 描述
 */
declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
// 以下变量声明对应config.[env].ts文件内define的变量
declare const TITLE: string;
declare const LOGIN_SUBTITLE: string;
declare const FOOTER_COPY_RIGHT: string;
declare const LOGO: string;

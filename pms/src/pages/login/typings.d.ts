/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 23:24:00
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:10:29
 * @Description: 描述
 */
declare namespace API {
  interface LoginParamsType {
    userName?: string;
    password?: string;
    captcha?: string;
    agree?: boolean;
    type?: string;
  }

  interface LoginUserType {
    userName?: string;
    nickname?: string;
    avatar?: string;
    headPhoto?: string;
    email?: string;
    permission?: number[];
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  }

  type LoginResult = {
    token?: {
      value?: string;
    };
    user?: {
      id?: string;
      nickname?: string;
      userName?: string;
    };
  };
}

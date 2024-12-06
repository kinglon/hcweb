/*
 * @Author: Semmy Wong
 * @Date: 2023-04-21 22:05:35
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-24 19:56:59
 * @Description: 描述
 */
// @ts-ignore
/* eslint-disable */
import { LOGIN_PATH } from '@/common/constants';
import { request } from '@/common/request';
import { history } from '@umijs/max';

export const useLogin = <T = API.LoginUserType>() => {
  return {
    async getLoginUser(options?: { [key: string]: any }) {
      try {
        const data = request<T>('/hc/user/current', {
          method: 'GET',
          ...(options || {}),
        });
        return data;
      } catch (error) {
        history.replace(LOGIN_PATH);
      }
      return {} as T;
    },
    async login(body: API.LoginParamsType, options?: { [key: string]: any }) {
      const response = await request<API.LoginResult>('/hc/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
      });
      return response;
    },
    async logout(options?: { [key: string]: any }) {
      return request<Record<string, any>>('/hc/logout', {
        method: 'POST',
        ...(options || {}),
      });
    },
  };
};

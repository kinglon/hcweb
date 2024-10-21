/*
 * @Author: Semmy Wong
 * @Date: 2023-04-06 21:05:29
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-12 23:00:44
 * @Description: 描述
 */
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';

declare global {
  export interface PageParamsType {
    current?: number;
    pageSize?: number;
    keyword?: string; //与服务端约定keyword为模糊搜索关键字，不能定义为列名
    [key: string]: unknown;
  }
  export interface ListParamType {
    current: number;
    pageSize: number;
    keyword?: string;
    params?: Record<string, unknown>;
    specialParams?: Record<string, { rule: string; values: unknown }>;
  }

  export interface MatchItemType {
    field: string;
    rule: string;
    valueArr: unknown | unknown[];
  }
  export interface QueryListParamType {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    matchArr?: MatchItemType[];
  }
  export interface ListResultType<T> {
    list: T[];
    total: number;
  }

  export interface AppResponseType<T> {
    code: number;
    data: T;
    message: string;
  }

  export interface CRUDActionType<T> {
    currentRecord: T;
    tableActionRef?: React.MutableRefObject<ActionType | undefined>;
    tableFormRef?: React.MutableRefObject<ProFormInstance<T> | undefined>;
    createFormRef?: React.MutableRefObject<ProFormInstance<T> | undefined>;
    setCreateModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    updateFormRef?: React.MutableRefObject<ProFormInstance<T> | undefined>;
    setUpdateModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  }

  export interface CRUDActionOptionType<T> {
    entity?: Partial<T>;
    reload?: () => Promise<void>;
    successTip?: string;
    [key: string]: unknown;
  }

  export interface ListHandlerOptionType {
    params: PageParamsType & unknown;
    specialParams?: Record<string, { rule: string; values: unknown }>;
  }
}

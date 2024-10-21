/*
 * @Author: Semmy Wong
 * @Date: 2023-02-17 22:53:36
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-03-21 22:22:46
 * @Description: 页面的操作方法
 */
import type { ProColumns } from '@ant-design/pro-components';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';

import { FilterCondition } from '@/common/constants';
import { isEmptyObject } from '@/common/utils';

interface CommonPageParamsType {
  getQueryListParams(props: ListParamType): QueryListParamType;
  getAccessibleColumns<T>(columns: (ProColumns<T> & { accessible?: boolean })[]): ProColumns<T>[];
}

export const usePage = (): CommonPageParamsType => {
  return {
    getQueryListParams({
      current,
      pageSize,
      keyword,
      params = {},
      specialParams = {},
    }: ListParamType): QueryListParamType {
      const restParams: Record<string, unknown> = omit(params, Object.keys(specialParams));
      const restSpecialParams: Record<string, { rule: string; values: unknown }> = omitBy(specialParams, (item) => {
        if (Array.isArray(item.values)) {
          return isEmptyObject(item.values.filter((item) => !isEmptyObject(item)));
        } else {
          return isEmptyObject(item.values);
        }
      });
      const restParamsMatches = Object.keys(restParams).reduce((buf: MatchItemType[], currentField) => {
        if (isEmptyObject(restParams[currentField])) {
          return buf;
        }
        buf.push({
          field: currentField,
          rule: FilterCondition.LIKE,
          valueArr: Array.isArray(restParams[currentField]) ? restParams[currentField] : [restParams[currentField]],
        });

        return buf;
      }, []);
      const specialParamsMatches = Object.keys(restSpecialParams).reduce((buf: MatchItemType[], currentField) => {
        if (isEmptyObject(restSpecialParams[currentField]?.values)) {
          return buf;
        }
        const values = restSpecialParams[currentField].values;
        buf.push({
          field: currentField,
          rule: restSpecialParams[currentField].rule,
          valueArr: Array.isArray(values) ? values : [values],
        });
        return buf;
      }, []);
      return {
        pageNum: current - 1,
        pageSize,
        keyword,
        matchArr: [...restParamsMatches, ...specialParamsMatches],
      };
    },
    getAccessibleColumns<T>(columns: (ProColumns<T> & { accessible?: boolean })[]) {
      return columns.filter((item) => {
        if (isNil(item.accessible)) {
          return true;
        }
        return item.accessible;
      }) as ProColumns<T>[];
    },
  };
};

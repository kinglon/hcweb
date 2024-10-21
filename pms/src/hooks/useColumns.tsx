/*
 * @Author: Semmy Wong
 * @Date: 2023-07-05 22:56:24
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-12 22:47:21
 * @Description: 描述
 */
import { DEFAULT_PAGE_SIZE } from '@/common/constants';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

interface ColumnPropsType<T> {
  tableActionRef?: React.MutableRefObject<ActionType | undefined>;
  createdTimeFormat?: string;
}
export const useColumns = <T extends Record<string, unknown>>(
  props?: ColumnPropsType<T>,
): Record<string, ProColumns<T>> => {
  const { tableActionRef, createdTimeFormat = 'YYYY-MM-DD HH:mm:ss' } = props ?? {};
  const intl = useIntl();

  const serialColumn: ProColumns<T> = {
    title: '序号',
    className: 'serial-col',
    align: 'center',
    hideInSearch: true,
    width: 50,
    editable: false,
    renderText: (text: string, record: T, index: number) => {
      const { current = 1, pageSize = DEFAULT_PAGE_SIZE } = tableActionRef?.current?.pageInfo ?? {};
      return `${pageSize * (current - 1) + (index + 1)}`;
    },
  };

  const createdTimeColumn: ProColumns<T> = {
    title: '创建时间',
    valueType: 'dateTime',
    dataIndex: 'createdTime',
    align: 'center',
    hideInSearch: true,
  };
  const createdTimeFilterColumn: ProColumns<T> = {
    title: '创建时间',
    width: 160,
    align: 'center' as const,
    valueType: 'dateTimeRange' as const,
    fieldProps: {
      format: createdTimeFormat,
      presets: [
        {
          label: intl.formatMessage({ id: 'app.hook.last-7-day' }),
          value: [dayjs().add(-7, 'd').startOf('d'), dayjs()],
        },
        {
          label: intl.formatMessage({ id: 'app.hook.last-30-day' }),
          value: [dayjs().add(-30, 'd').startOf('d'), dayjs()],
        },
        {
          label: intl.formatMessage({ id: 'app.hook.last-90-day' }),
          value: [dayjs().add(-90, 'd').startOf('d'), dayjs()],
        },
      ],
      showTime: {
        defaultValue: [dayjs().startOf('d'), dayjs().endOf('d')],
      },
    },
    dataIndex: 'createdTime',
    render: (_: ReactNode, record: T) => {
      return <>{record.createdTime}</>;
    },
  };

  const updateTimeColumn: ProColumns<T> = {
    title: '更新时间',
    valueType: 'dateTime',
    dataIndex: 'updateTime',
    align: 'center',
    hideInSearch: true,
  };

  return {
    serialColumn,
    createdTimeColumn,
    createdTimeFilterColumn,
    updateTimeColumn,
  };
};

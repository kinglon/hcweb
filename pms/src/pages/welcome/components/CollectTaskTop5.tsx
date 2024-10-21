/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:24:59
 * @Description: Description
 */
import { useColumns } from '@/hooks';
import { useAuditTask } from '@/pages/audit-management/useAuditTask';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

export const CollectTaskTop5 = <T extends AuditTaskType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const { serialColumn } = useColumns<T>({ tableActionRef });

  const { assignTaskListHandler } = useAuditTask<T>({
    tableActionRef,
  });

  const columns: ProColumns<T>[] = [
    serialColumn,
    {
      title: '审核员',
      dataIndex: 'userName',
    },
    {
      title: '任务领取数量',
      dataIndex: 'count',
    },
  ];

  return (
    <ProTable<T, PageParamsType>
      headerTitle="任务领取TOP5排行"
      rowKey="roleId"
      tableAlertRender={false}
      pagination={false}
      search={false}
      options={{ density: false, fullScreen: false, reload: false, setting: false }}
      toolBarRender={() => []}
      request={assignTaskListHandler}
      columns={columns}
      scroll={{ x: 'max-content' }}
    />
  );
};

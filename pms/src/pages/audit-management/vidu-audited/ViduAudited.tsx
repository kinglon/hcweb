/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 21:17:55
 * @Description: Description
 */
import { AuditStatus } from '@/common/constants';
import { PageContextProvider } from '@/context';
import { useReduce } from '@/hooks';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { useRef } from 'react';
import { AuditTaskList } from '../components/AuditTaskList';

export const ViduAudited = <T extends AuditTaskType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const { state, dispatch } = useReduce<T, AuditTaskReduceStateType<T>, AuditTaskReduceActionType<T>>();

  return (
    <PageContextProvider value={{ tableActionRef, state, dispatch }}>
      <PageContainer header={{ title: null }}>
        <AuditTaskList auditedStatus={AuditStatus.AUDITED} product={1} />
      </PageContainer>
    </PageContextProvider>
  );
};

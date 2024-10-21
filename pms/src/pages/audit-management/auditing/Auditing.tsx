/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-19 23:22:15
 * @Description: Description
 */
import { PageContextProvider } from '@/context';
import { useReduce } from '@/hooks';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { useRef } from 'react';
import { AuditTaskList } from '../components/AuditTaskList';

export const Auditing = <T extends AuditTaskType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const { state, dispatch } = useReduce<T, RoleReduceStateType<T>, RoleReduceActionType<T>>();

  return (
    <PageContextProvider value={{ tableActionRef, state, dispatch }}>
      <PageContainer header={{ title: null }}>
        <AuditTaskList showSubmit={true} showCountDown={true} />
      </PageContainer>
    </PageContextProvider>
  );
};

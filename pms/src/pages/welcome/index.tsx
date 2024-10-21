/*
 * @Author: Semmy Wong
 * @Date: 2024-03-29 19:49:39
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-22 01:17:01
 * @Description: Description
 */
import { PageContextProvider } from '@/context';
import { useReduce } from '@/hooks';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Flex, Row } from 'antd';
import React, { useRef } from 'react';
import { AuditCountTop5 } from './components/AuditCountTop5';
import { CollectTaskTop5 } from './components/CollectTaskTop5';
import { ShortEnter } from './components/ShortEnter';
import { Summary } from './components/Summary';

export const Welcome = <T extends Record<string, unknown>>(): React.ReactNode => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState;

  const tableActionRef = useRef<ActionType>();
  const { state, dispatch } = useReduce<T, AuditTaskReduceStateType<T>, AuditTaskReduceActionType<T>>({
    states: {
      notAuditedCount: 0,
      auditingCount: 0,
      auditedCount: 0,
      auditorCount: 0,
    },
  });

  return (
    <PageContextProvider value={{ tableActionRef, state, dispatch }}>
      <PageContainer header={{ title: `👏 您好，${loginUser.userName}！` }}>
        <Flex justify="space-between" align="middle" gap="middle" vertical={true}>
          <Row gutter={[16, 16]} justify="space-around" align="middle">
            <Col span={18}>
              <Summary />
            </Col>
            <Col span={6}>
              <ShortEnter />
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify="space-around" align="middle">
            <Col span={12}>
              <CollectTaskTop5 />
            </Col>
            <Col span={12}>
              <AuditCountTop5 />
            </Col>
          </Row>
        </Flex>
      </PageContainer>
    </PageContextProvider>
  );
};

export default Welcome;

/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:35:48
 * @Description: Description
 */
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { Card, Form, Space } from 'antd';
import { useRef } from 'react';
import { useSetting } from './useSetting';

export const Setting = <T extends SettingType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();

  const { detailHandler, updateHandler } = useSetting<T>({
    tableActionRef,
  });

  return (
    <PageContainer header={{ title: null }}>
      <Card>
        <ProForm
          layout="horizontal"
          request={detailHandler}
          submitter={{
            searchConfig: {
              submitText: '保存',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              type: 'primary',
            },
          }}
          onFinish={updateHandler}
        >
          <Form.Item name="taskFinishTime" label="任务完成时间">
            <Space>
              <label>领取任务</label>
              <ProFormText allowClear name="taskFinishTime" noStyle />
              <label>分钟内未完成，自动取消任务</label>
            </Space>
          </Form.Item>
          <Form.Item name="taskAssignNum" label="领取任务设置">
            <Space>
              <ProFormText
                allowClear
                name="taskAssignNum"
                noStyle
                transform={(value) => {
                  if (Array.isArray(value)) {
                    return { taskAssignNum: value };
                  }
                  return { taskAssignNum: value?.split(',').map((val: string) => Number(val)) };
                }}
              />
              <label>（选项以英文逗号分开，例如：“100,500,1000,1500”）</label>
            </Space>
          </Form.Item>
          <Form.Item label="进审任务条件设置">
            <Space>
              <ProFormSwitch
                label="PASS"
                name="taskEnterPass"
                initialValue={false}
                transform={(value) => {
                  if (typeof value === 'string') {
                    return value;
                  }
                  return value ? '1' : '0';
                }}
                convertValue={(value) => {
                  if (typeof value === 'boolean') {
                    return value;
                  }
                  return value === '1';
                }}
              />
              <ProFormSwitch
                label="REVIEW"
                name="taskEnterReview"
                initialValue={false}
                transform={(value) => {
                  if (typeof value === 'string') {
                    return value;
                  }
                  return value ? '1' : '0';
                }}
                convertValue={(value) => {
                  if (typeof value === 'boolean') {
                    return value;
                  }
                  return value === '1';
                }}
              />
              <ProFormSwitch
                label="REJECT"
                name="taskEnterReject"
                initialValue={false}
                transform={(value) => {
                  if (typeof value === 'string') {
                    return value;
                  }
                  return value ? '1' : '0';
                }}
                convertValue={(value) => {
                  if (typeof value === 'boolean') {
                    return value;
                  }
                  return value === '1';
                }}
              />
            </Space>
          </Form.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

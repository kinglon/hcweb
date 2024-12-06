/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-11-14 17:20:41
 * @Description: Description
 */
import { LockOutlined } from '@ant-design/icons';
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card } from 'antd';
import { useRef } from 'react';
import { useResetPassword } from './useResetPassword';

export const ResetPassword = <T extends ResetPasswordType>(): React.ReactNode => {
  const formRef = useRef<ProFormInstance<any>>();
  const tableActionRef = useRef<ActionType>();

  const { updateHandler } = useResetPassword<T>({
    tableActionRef,
  });

  return (
    <PageContainer header={{ title: null }}>
      <Card>
        <ProForm
          formRef={formRef}
          onFinish={updateHandler}
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
        >
          <ProFormText.Password
            label="原密码"
            name="oldPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
          <ProFormText.Password
            label="新密码"
            name="newPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入新密码"
            rules={[
              {
                required: true,
                message: '请输入新密码',
              },
            ]}
          />
          <ProFormText.Password
            label="确认密码"
            name="newConfirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="请输入确认密码"
            rules={[
              {
                required: true,
                message: '请输入确认密码',
              },
              {
                validator: async (_, value, callback) => {
                  if (formRef.current?.getFieldValue('newPassword') !== value) {
                    throw new Error('两次密码输入不一致');
                  }
                },
              },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 23:15:29
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:12:31
 * @Description: 描述
 */
import Footer from '@/components/footer';
import type { InitialStateType } from '@@/plugin-initialState/@@initialState';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { App, Flex, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import Captcha from 'react-captcha-code';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const [type] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  const { login, getLoginUser } = useLogin();
  const intl = useIntl();
  const { message } = App.useApp();
  const captchaRef = useRef<any>();
  const [captcha, setCaptcha] = useState<string>('');

  const initAppConfig = async () => {
    const loginUser = await getLoginUser();
    const accesses = loginUser.permission?.reduce((pre: any, current: any) => {
      pre[`${current}`] = true;
      return pre;
    }, {});
    localStorage.setItem('loginUser', JSON.stringify(loginUser));
    const token = localStorage.getItem('token');
    await setInitialState((s: InitialStateType) => ({
      ...s,
      token,
      accesses,
      loginUser,
    }));
  };

  const submitHandler = async (values: API.LoginParamsType) => {
    if (!values.agree) {
      message.error('请先阅读并同意《用户手册》');
      return;
    }
    if (captcha !== values.captcha) {
      captchaRef.current.refresh();
      message.error('验证码错误');
      return;
    }
    try {
      // 登录
      await login({ ...values, type });
      // const token = data?.token?.value ?? '';
      // localStorage.setItem('token', token);
      const defaultLoginSuccessMessage = intl.formatMessage({
        id: '登录成功',
      });
      const hide = message.success(defaultLoginSuccessMessage);
      await initAppConfig();
      setTimeout(() => {
        hide();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
      }, 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login_container">
      <div className="boxer">
        <div className="box1">
          <div className="middle1">
            <div className="middle_right">
              <div className="mr_box">
                <h1>
                  <FormattedMessage id="登录" />
                </h1>
                <h2>
                  <FormattedMessage id="欢迎登录北京生数科技有限公司在线人审管理系统" />
                </h2>
                <LoginForm
                  initialValues={{
                    agree: true,
                  }}
                  onFinish={submitHandler}
                >
                  <>
                    <ProFormText
                      name="userName"
                      fieldProps={{
                        size: 'large',
                        prefix: <UserOutlined />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'page.login.username-empty',
                      })}
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="page.login.username-empty" />,
                        },
                      ]}
                    />
                    <ProFormText.Password
                      name="password"
                      fieldProps={{
                        size: 'large',
                        prefix: <LockOutlined />,
                      }}
                      placeholder={intl.formatMessage({
                        id: 'page.login.password-empty',
                      })}
                      rules={[
                        {
                          required: true,
                          message: <FormattedMessage id="page.login.password-empty" />,
                        },
                      ]}
                    />
                    <Form.Item
                      name={'captcha'}
                      rules={[
                        {
                          required: true,
                          message: '请输入验证码',
                        },
                      ]}
                    >
                      <Flex>
                        <Input placeholder="请输入验证码" />
                        <Captcha
                          ref={captchaRef}
                          charNum={4}
                          onClick={() => {
                            captchaRef.current.refresh();
                          }}
                          onChange={(text: string) => {
                            setCaptcha(text);
                          }}
                        />
                      </Flex>
                    </Form.Item>
                  </>
                  <div
                    style={{
                      marginBottom: 24,
                    }}
                  >
                    <ProFormCheckbox noStyle name="agree">
                      <FormattedMessage id="我已阅读并同意《用户手册》" />
                    </ProFormCheckbox>
                  </div>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;

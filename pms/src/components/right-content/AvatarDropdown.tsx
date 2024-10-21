import { LOGIN_PATH } from '@/common/constants';
import { useLogin } from '@/pages/login/useLogin';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useAccess, useIntl, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../header-dropdown';
import { IconFont } from '../icon-font';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  return <span className="anticon">{loginUser?.userName}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { logout } = useLogin();
  const accesses = useAccess();
  const intl = useIntl();

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await logout();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== LOGIN_PATH && !redirect) {
      history.replace({
        pathname: LOGIN_PATH,
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const onMenuClickHandler = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      if (key === 'resetPassword') {
        history.push('/settings/reset-password');
        return;
      }
      if (key === 'personalInfo') {
        history.push('/user/personal-info');
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { loginUser } = initialState;

  if (!loginUser || !loginUser.userName) {
    return loading;
  }

  const menuItems = [
    {
      key: 'resetPassword',
      icon: <SettingOutlined />,
      label: intl.formatMessage({ id: '重置密码' }),
      accessible: true,
    },
    {
      key: 'personalInfo',
      icon: <IconFont type="icon-geren" />,
      label: intl.formatMessage({ id: '个人信息' }),
      accessible: true,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: intl.formatMessage({ id: '退出系统' }),
      accessible: true,
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClickHandler,
        items: menuItems.filter((item) => item.accessible !== false),
      }}
    >
      {children}
    </HeaderDropdown>
  );
};

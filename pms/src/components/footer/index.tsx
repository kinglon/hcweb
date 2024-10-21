/*
 * @Author: Semmy Wong
 * @Date: 2023-04-03 20:52:52
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-09 22:16:28
 * @Description: 描述
 */
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '北京生数科技有限公司在线人审管理系统',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};

export default Footer;

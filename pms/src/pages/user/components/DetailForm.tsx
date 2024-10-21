/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-03-21 22:11:30
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { ModalForm, ProDescriptions } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Button, Divider } from 'antd';
import { useState } from 'react';
import { useHospital } from '../useUser';

export const DetailForm = <T extends HospitalType>(): JSX.Element => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`& .ant-descriptions-title`]: {
        fontWeight: 'unset',
      },
      [`& .qrcode-image-column`]: {
        ['& .ant-image-img']: { width: 150 },
        ['& .ant-image-mask']: {
          textAlign: 'center',
          width: 150,
        },
      },
      [`& .amount-column`]: {
        [`& .ant-descriptions-item-content`]: {
          marginTop: -6,
          color: token.colorError,
          fontSize: token.fontSizeHeading4,
        },
      },
    };
  });
  const { tableActionRef, state, dispatch } = usePageContext<
    T,
    HospitalReduceStateType<T>,
    HospitalReduceActionType<T>
  >();
  const [dataSource, setDataSource] = useState<T>();
  const { detailHandler } = useHospital<T>({ tableActionRef, currentRecord: state.currentRecord });

  useAsyncEffect(async () => {
    if (!state.currentRecord?.id || !state.detailModalVisible) {
      return;
    }
    const response = await detailHandler();
    setDataSource(response);
  }, [state.currentRecord?.id]);

  return (
    <ModalForm
      title={<FormattedMessage id="详情" />}
      open={state.detailModalVisible}
      onOpenChange={(visible) =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { detailModalVisible: visible },
        })
      }
      submitter={{
        render: () => {
          return [
            <Button
              key="cancel"
              onClick={() =>
                dispatch?.({
                  type: CommonReducerAction.SetState,
                  payload: { detailModalVisible: false },
                })
              }
            >
              <FormattedMessage id="page.common.close" />
            </Button>,
          ];
        },
      }}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        closable: true,
      }}
      className={className}
    >
      <ProDescriptions
        title="转账任务详情"
        column={{ xs: 1, sm: 2, md: 2 }}
        style={{ marginBottom: 32 }}
        dataSource={dataSource}
        columns={[
          {
            title: '任务单号',
            dataIndex: 'code',
          },
          {
            title: '商户名称',
            dataIndex: ['tenant', 'name'],
          },
          {
            title: '金额',
            dataIndex: 'amount',
            className: 'amount-column',
            render(_, record) {
              return `${record.amount} ${record.currency}`;
            },
          },
          {
            title: '备注',
            dataIndex: 'remark',
          },
          {
            title: '图片',
            valueType: 'image',
            className: 'qrcode-image-column',
            dataIndex: 'toAccountImg',
          },
        ]}
      />
      <Divider />
      <ProDescriptions
        title="支付详情"
        column={{ xxl: 2, xl: 2, lg: 2, xs: 1, sm: 2, md: 2 }}
        style={{ marginBottom: 32 }}
        dataSource={dataSource}
        columns={[
          {
            title: '支付时间',
            dataIndex: 'paidTime',
          },
          {
            title: '支付凭证',
            valueType: 'image',
            className: 'qrcode-image-column',
            dataIndex: 'paidImg',
          },
          {
            title: '支付备注',
            dataIndex: 'paidRemark',
          },
        ]}
      />
    </ModalForm>
  );
};

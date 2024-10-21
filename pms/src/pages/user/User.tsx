/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-29 09:14:32
 * @Description: Description
 */
import { CommonReducerAction, DEFAULT_PAGE_SIZE, IMAGE_ERROR_PATH, TableImageSize } from '@/common/constants';
import { PageContextProvider } from '@/context';
import { useReduce } from '@/hooks';
import { useColumns } from '@/hooks/useColumns';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Image, Popconfirm } from 'antd';
import { ReactNode, useRef } from 'react';
import { useUser } from './useUser';

export const User = <T extends UserType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const { state, dispatch } = useReduce<T, UserReduceStateType<T>, UserReduceActionType<T>>();

  const { createdTimeColumn } = useColumns<T>();
  const { listHandler, removeHandler, changeRentHandler } = useUser<T>({
    tableActionRef,
  });

  const columns: ProColumns<T>[] = [
    {
      title: '头像',
      search: false,
      width: 130,
      align: 'center',
      dataIndex: 'icon',
      render: (_: ReactNode, record: T) => {
        return (
          <Image
            key={record.id as string}
            src={`${record.icon}`}
            fallback={IMAGE_ERROR_PATH}
            preview={{ src: record.img as string }}
            height={TableImageSize.height}
            width={TableImageSize.width}
          />
        );
      },
    },
    {
      title: '身份证',
      search: false,
      dataIndex: 'identity',
    },
    {
      title: '用户名称',
      search: false,
      dataIndex: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '租户',
        },
        1: {
          text: '业主',
        },
      },
      renderText(_, record, index, action) {
        return record.role === 0 ? '租户' : '业主';
      },
    },
    {
      title: '年龄',
      search: false,
      dataIndex: 'age',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={async () =>
            dispatch({
              type: CommonReducerAction.SetState,
              payload: { createUpdateModalVisible: true, currentRecord: record },
            })
          }
        >
          编辑
        </a>,
        <Popconfirm
          key="remove"
          title="确定要删除吗"
          icon={<DeleteOutlined />}
          onConfirm={removeHandler.bind(null, record)}
        >
          <a>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContextProvider value={{ tableActionRef, state, dispatch }}>
      <PageContainer header={{ title: null }}>
        <ProTable<T, PageParamsType>
          headerTitle={'用户列表'}
          actionRef={tableActionRef}
          rowKey="id"
          search={{
            defaultCollapsed: false,
          }}
          pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }}
          options={{ density: false, fullScreen: false, reload: true, setting: false }}
          toolBarRender={() => [
            <Button
              key="buttonStoreManageCreate"
              type="primary"
              onClick={() =>
                dispatch({
                  type: CommonReducerAction.SetState,
                  payload: { createUpdateModalVisible: true, currentRecord: undefined },
                })
              }
            >
              <PlusOutlined /> 新增
            </Button>,
          ]}
          request={listHandler}
          columns={columns}
        />
      </PageContainer>
    </PageContextProvider>
  );
};

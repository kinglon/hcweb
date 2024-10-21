/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:49:57
 * @Description: Description
 */
import { CommonReducerAction, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { PageContextProvider } from '@/context';
import { useColumns, useReduce } from '@/hooks';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';
import { CreateUpdateForm } from './components/CreateUpdateForm';
import { useRole } from './useRole';

export const Role = <T extends RoleType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const tableFormRef = useRef<ProFormInstance<T>>();
  const { state, dispatch } = useReduce<T, RoleReduceStateType<T>, RoleReduceActionType<T>>();
  const { serialColumn } = useColumns<T>({ tableActionRef });

  const { listHandler, removeHandler } = useRole<T>({
    tableActionRef,
  });

  const columns: ProColumns<T>[] = [
    serialColumn,
    {
      title: '角色状态',
      align: 'center',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        1: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '角色人数',
      align: 'center',
      dataIndex: 'userCount',
      search: false,
    },
    {
      title: '角色名称',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '角色描述',
      align: 'center',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Access key="update" accessible={record.roleId !== 1}>
          <a
            onClick={async () =>
              dispatch({
                type: CommonReducerAction.SetState,
                payload: { createUpdateModalVisible: true, currentRecord: record },
              })
            }
          >
            编辑
          </a>
        </Access>,
        <Access key="remove" accessible={record.roleId !== 1}>
          <Popconfirm title="确定要删除吗" icon={<DeleteOutlined />} onConfirm={removeHandler.bind(null, record)}>
            <a>删除</a>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  return (
    <PageContextProvider value={{ tableActionRef, state, dispatch }}>
      <PageContainer header={{ title: null }}>
        <ProTable<T, PageParamsType>
          actionRef={tableActionRef}
          formRef={tableFormRef}
          rowKey="roleId"
          tableAlertRender={false}
          pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }}
          options={{ density: false, fullScreen: false, reload: true, setting: false }}
          dateFormatter={(value) => value.format('YYYY-MM-DD HH:mm:ss')}
          toolBarRender={() => [
            <Button
              type="primary"
              onClick={() =>
                dispatch({
                  type: CommonReducerAction.SetState,
                  payload: { createUpdateModalVisible: true, currentRecord: undefined },
                })
              }
            >
              <PlusOutlined /> 新增角色
            </Button>,
          ]}
          request={listHandler}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />
      </PageContainer>
      <CreateUpdateForm />
    </PageContextProvider>
  );
};

/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:50:19
 * @Description: Description
 */
import { CommonReducerAction, DEFAULT_PAGE_SIZE } from '@/common/constants';
import { isEmptyObject } from '@/common/utils';
import { PageContextProvider } from '@/context';
import { useReduce } from '@/hooks';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useRole } from '../role/useRole';
import { CreateUpdateForm } from './components/CreateUpdateForm';
import { useStaff } from './useStaff';

export const Staff = <T extends StaffType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const tableFormRef = useRef<ProFormInstance<T>>();
  const { state, dispatch } = useReduce<T, RoleReduceStateType<T>, RoleReduceActionType<T>>();

  const { listHandler, removeHandler } = useStaff<T>({
    tableActionRef,
  });
  const { searchHandler: searchRoleHandler } = useRole<any>();

  const columns: ProColumns<T>[] = [
    {
      title: '员工ID',
      align: 'center',
      dataIndex: 'userId',
    },
    {
      title: '员工姓名',
      align: 'center',
      dataIndex: 'userName',
    },
    {
      title: '账号状态',
      align: 'center',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Default' },
        1: { text: '启用', status: 'Success' },
      },
      valueType: 'select',
      search: false,
    },
    {
      title: '系统角色',
      align: 'center',
      dataIndex: 'roleId',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        allowClear: true,
      },
      request: searchRoleHandler,
      renderText: (_, record) => record.roleName,
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '添加人',
      align: 'center',
      dataIndex: 'createUserName',
      search: false,
    },
    {
      title: '添加时间',
      align: 'center',
      dataIndex: 'createdAt',
      valueType: 'dateTimeRange',
      search: {
        transform: (value: any) => {
          if (!isEmptyObject(value)) {
            const createdAtBegin = dayjs(value[0]).valueOf() / 1000;
            const createdAtEnd = dayjs(value[1]).valueOf() / 1000;
            return { createdAtBegin, createdAtEnd };
          }
          return value;
        },
      },
      render: (_, record) => {
        return dayjs(+record.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      align: 'center',
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
          actionRef={tableActionRef}
          formRef={tableFormRef}
          rowKey="id"
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
              <PlusOutlined /> 新增员工
            </Button>,
          ]}
          search={{
            defaultCollapsed: false,
          }}
          request={listHandler}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />
      </PageContainer>
      <CreateUpdateForm />
    </PageContextProvider>
  );
};

/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:29:54
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { LockOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRole } from '../../role/useRole';
import { useStaff } from '../useStaff';

export const CreateUpdateForm = <T extends StaffType>(): JSX.Element => {
  const { tableActionRef, state, dispatch } = usePageContext<T, RoleReduceStateType<T>, RoleReduceActionType<T>>();

  const { createHandler, updateHandler } = useStaff<T>({
    tableActionRef,
    currentRecord: state?.currentRecord,
  });

  const { searchHandler: searchRoleHandler } = useRole<any>();
  return (
    <ModalForm
      title={state?.currentRecord?.userId ? '编辑' : '新增'}
      open={state?.createUpdateModalVisible}
      onOpenChange={(visible) =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { createUpdateModalVisible: visible },
        })
      }
      onFinish={state?.currentRecord?.userId ? updateHandler : createHandler}
      initialValues={state?.currentRecord}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        closable: true,
      }}
    >
      <ProFormText
        label="姓名"
        name="userName"
        disabled={!!state?.currentRecord?.userId}
        rules={[
          {
            required: !state?.currentRecord?.userId,
            message: '请输入姓名',
          },
        ]}
      />
      <ProFormSelect
        label="系统角色"
        name="roleId"
        showSearch
        rules={[
          {
            required: true,
            message: '请选择系统角色',
          },
        ]}
        request={searchRoleHandler}
      />
      <ProFormText.Password
        label="登录密码"
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder="请输入密码"
        rules={[
          {
            required: !state?.currentRecord?.userId,
            message: '请输入密码',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="remark" />
      <ProFormSwitch
        label="账户状态"
        name="status"
        initialValue={true}
        transform={(value) => {
          if (typeof value === 'string') {
            return value;
          }
          return value ? 1 : 0;
        }}
        convertValue={(value) => {
          if (typeof value === 'boolean') {
            return value;
          }
          return value === 1;
        }}
      />
    </ModalForm>
  );
};

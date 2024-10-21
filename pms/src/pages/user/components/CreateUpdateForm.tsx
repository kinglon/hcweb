/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-03-21 22:11:12
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { ModalForm, ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import { useHospital } from '../useUser';

export const CreateUpdateForm = <T extends HospitalType>(): JSX.Element => {
  const { tableActionRef, state, dispatch } = usePageContext<
    T,
    HospitalReduceStateType<T>,
    HospitalReduceActionType<T>
  >();

  const { detailHandler, createHandler, updateHandler } = useHospital<T>({
    tableActionRef,
    currentRecord: state?.currentRecord,
  });

  return (
    <ModalForm
      title={state?.currentRecord?.id ? '编辑充值' : '新增充值'}
      open={state?.createUpdateModalVisible}
      onOpenChange={(visible) =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { createUpdateModalVisible: visible },
        })
      }
      onFinish={state?.currentRecord?.id ? updateHandler : createHandler}
      request={detailHandler}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        closable: true,
      }}
    >
      <ProFormDigit
        label="金额"
        name="amount"
        rules={[
          {
            required: true,
            message: '请输入金额',
          },
        ]}
      />
      <ProFormTextArea label="备注" name="remark" />
    </ModalForm>
  );
};

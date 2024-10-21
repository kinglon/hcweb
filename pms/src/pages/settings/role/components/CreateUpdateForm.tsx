/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:30:24
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { ModalForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Checkbox, Col, Form, Row } from 'antd';
import { useRole } from '../useRole';

export const CreateUpdateForm = <T extends RoleType>(): JSX.Element => {
  const className = useEmotionCss(() => {
    return {
      [`& .ant-checkbox-group`]: {
        display: 'block',
      },
    };
  });
  const { tableActionRef, state, dispatch } = usePageContext<T, RoleReduceStateType<T>, RoleReduceActionType<T>>();

  const { createHandler, updateHandler } = useRole<T>({
    tableActionRef,
    currentRecord: state?.currentRecord,
  });

  return (
    <ModalForm
      title={state?.currentRecord?.roleId ? '编辑' : '新增'}
      open={state?.createUpdateModalVisible}
      className={className}
      onOpenChange={(visible) =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { createUpdateModalVisible: visible },
        })
      }
      onFinish={state?.currentRecord?.roleId ? updateHandler : createHandler}
      initialValues={state?.currentRecord}
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        closable: true,
      }}
    >
      <ProFormText
        label="角色名称"
        name="name"
        rules={[
          {
            required: true,
            message: '请输入角色名称',
          },
        ]}
      />
      <ProFormTextArea label="角色描述" name="remark" />
      <Form.Item name="permission" label="分配权限">
        <Checkbox.Group>
          <Row>
            <Col>
              <Checkbox value={2}>审核管理</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox value={3}>任务领取</Checkbox>
            </Col>
            <Col>
              <Checkbox value={4}>Vidu已审核</Checkbox>
            </Col>
            <Col>
              <Checkbox value={5}>Vidu未审核</Checkbox>
            </Col>
            <Col>
              <Checkbox value={6}>Eden已审核</Checkbox>
            </Col>
            <Col>
              <Checkbox value={7}>Eden未审核</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox value={8}>用户管理</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox value={9}>质检</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox value={10}>数控</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col>
              <Checkbox value={11}>数据统计</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <ProFormSwitch
        label="角色状态"
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

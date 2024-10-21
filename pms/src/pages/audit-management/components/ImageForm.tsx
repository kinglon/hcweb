/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-29 01:23:10
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Image, Modal, Space } from 'antd';

export const ImageForm = <T extends AuditTaskType>(): JSX.Element => {
  const className = useEmotionCss(() => {
    return {
      [`& .ant-checkbox-group`]: {
        display: 'block',
      },
      [`& .ant-modal-close`]: {
        top: -5,
        right: 0,
      },
    };
  });
  const { tableActionRef, state, dispatch } = usePageContext<
    T,
    AuditTaskReduceStateType<T>,
    AuditTaskReduceActionType<T>
  >();

  return (
    <Modal
      title={null}
      open={state?.imageModalVisible}
      className={className}
      footer={null}
      onCancel={() =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { imageModalVisible: false },
        })
      }
      destroyOnClose={true}
    >
      <Space>
        {state?.images?.map((img) => {
          return <Image src={img} preview={false} />;
        })}
      </Space>
    </Modal>
  );
};

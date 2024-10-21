/*
 * @Author: Semmy Wong
 * @Date: 2023-04-20 12:01:22
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-29 01:02:07
 * @Description: 描述
 */
import { CommonReducerAction } from '@/common/constants';
import { usePageContext } from '@/context';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Modal, Spin } from 'antd';
import ReactPlayer from 'react-player';

export const VideoPlayerForm = <T extends AuditTaskType>(): JSX.Element => {
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
      open={state?.videPlayerModalVisible}
      className={className}
      footer={null}
      onCancel={() =>
        dispatch?.({
          type: CommonReducerAction.SetState,
          payload: { videPlayerModalVisible: false },
        })
      }
      destroyOnClose={true}
    >
      <ReactPlayer
        url={state.currentRecord?.videoLink}
        controls={false}
        playing={true}
        light={'/images/video_default.png'}
        playIcon={<img src={'/images/play.png'}></img>}
        width="100%"
        height="100%"
        fallback={<Spin />}
      />
    </Modal>
  );
};

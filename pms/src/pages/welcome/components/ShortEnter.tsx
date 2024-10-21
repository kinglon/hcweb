/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-20 20:19:47
 * @Description: Description
 */
import { IconFont } from '@/components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history } from '@umijs/max';
import { Card, Flex } from 'antd';

export const ShortEnter = <T extends AuditTaskType>(): React.ReactNode => {
  const className = useEmotionCss(() => {
    return {
      [`& .statistic-card-img`]: {
        display: 'block',
        width: 72,
        height: 72,
      },
    };
  });
  const onClickHandler = () => {
    history.push('/audit-management/collect-task');
  };
  return (
    <Card hoverable title="快捷入口" bordered={false} className={className} onClick={onClickHandler}>
      <Flex align="center" justify="center" vertical={true}>
        <IconFont type="icon-renwulingqu" style={{ fontSize: '48px' }} />,<span>任务领取</span>
      </Flex>
    </Card>
  );
};

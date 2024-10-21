/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:47:10
 * @Description: Description
 */
import { CommonReducerAction } from '@/common/constants';
import { IconFont } from '@/components';
import { usePageContext } from '@/context';
import { useColumns } from '@/hooks';
import { useAuditTask } from '@/pages/audit-management/useAuditTask';
import { useUser } from '@/pages/user/useUser';
import { StatisticCard } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useAsyncEffect } from 'ahooks';
import { Card, Flex } from 'antd';
import dayjs from 'dayjs';

export const Summary = <T extends AuditTaskType>(): React.ReactNode => {
  const className = useEmotionCss(() => {
    return {
      [`& .statistic-card-img`]: {
        display: 'block',
        width: 42,
        height: 42,
      },
    };
  });
  const { tableActionRef, state, dispatch } = usePageContext<
    T,
    AuditTaskReduceStateType<T>,
    AuditTaskReduceActionType<T>
  >();
  const { serialColumn } = useColumns<T>({ tableActionRef });

  const { getAuditTaskSummaryHandler } = useAuditTask<T>({
    tableActionRef,
  });
  const { countUserHandler } = useUser<UserType>();

  useAsyncEffect(async () => {
    const auditResponse = await getAuditTaskSummaryHandler();
    const userResponse = await countUserHandler();
    dispatch({
      type: CommonReducerAction.SetState,
      payload: {
        notAuditedCount: auditResponse.notAuditted,
        auditingCount: auditResponse.auditting,
        auditedCount: auditResponse.auditted,
        auditorCount: userResponse.notAdmin,
      },
    });
  }, []);

  return (
    <Card
      hoverable
      title={
        <>
          <span>实时概况</span>
          <span>数据截至：{dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}</span>
        </>
      }
      bordered={false}
      className={className}
    >
      <Flex justify="space-around" align="stretch">
        <StatisticCard.Group direction="row">
          <StatisticCard
            statistic={{
              title: '审核员',
              value: state.auditorCount,
              icon: <IconFont type="icon-yonghu" style={{ fontSize: '60px' }} />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '待审核',
              value: state.notAuditedCount,
              icon: <IconFont type="icon-daishenhe" style={{ fontSize: '60px' }} />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '审核中',
              value: state.auditingCount,
              icon: <IconFont type="icon-shenhezhong" style={{ fontSize: '60px' }} />,
            }}
          />
          <StatisticCard
            statistic={{
              title: '已审核',
              value: state.auditedCount,
              icon: <IconFont type="icon-yishenhe" style={{ fontSize: '60px' }} />,
            }}
          />
        </StatisticCard.Group>
      </Flex>
    </Card>
  );
};

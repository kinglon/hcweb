/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-11-11 22:12:15
 * @Description: Description
 */
import { LabelFilter } from '@/common/constants';
import { useSetting } from '@/pages/settings/common-setting/useSetting';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormDateTimeRangePicker, ProFormSelect } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useCollectTask } from './useCollectTask';

export const CollectTask = <T extends CollectTaskType>(): React.ReactNode => {
  const tableActionRef = useRef<ActionType>();
  const [labels, setLabels] = useState<Record<number, number>>([]);
  const { createHandler } = useCollectTask<T>({
    tableActionRef,
  });
  const { detailHandler: settingDetailHandler } = useSetting();

  useAsyncEffect(async () => {
    const response = await settingDetailHandler();
    setLabels(
      (response?.taskAssignNum as number[])?.reduce((preValue, current) => {
        preValue[current] = current;
        return preValue;
      }, {}),
    );
  }, []);

  const onFinishHandler = async (values: any) => {
    const { label, count, createdAt } = values;
    const response: any = await createHandler({
      label,
      count,
      createdAtBegin: dayjs(createdAt[0]).unix(),
      createdAtEnd: dayjs(createdAt[1]).unix(),
    } as T);
    if (response.count !== 0 && response.error !== 316) {
      history.push('/audit-management/auditing');
    }
  };

  return (
    <PageContainer header={{ title: null }}>
      <Card>
        <ProForm
          layout="horizontal"
          submitter={{
            searchConfig: {
              submitText: '开始审核',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              type: 'primary',
            },
            render: (props, doms) => {
              return [
                ...doms,
                <Button
                  htmlType="button"
                  onClick={() => {
                    history.push('/');
                  }}
                  key="cancel"
                >
                  取消
                </Button>,
              ];
            },
          }}
          onFinish={onFinishHandler}
        >
          <ProFormSelect
            name="label"
            label="标签筛选"
            valueEnum={LabelFilter}
            placeholder="请选择标签筛选"
            rules={[{ required: true, message: '请选择标签筛选' }]}
          />
          <ProFormSelect
            name="count"
            label="领取数量"
            valueEnum={labels}
            placeholder="请选择领取数量"
            rules={[{ required: true, message: '请选择领取数量' }]}
          />
          <ProFormDateTimeRangePicker
            name="createdAt"
            label="日期时间"
            rules={[{ required: true, message: '请选择要领取时间段' }]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:51:36
 * @Description: Description
 */
import {
  AuditStatus,
  CommonReducerAction,
  DEFAULT_PAGE_SIZE,
  LabelFilter,
  MachineAuditResult,
} from '@/common/constants';
import { convertSecondsToMinutesAndSeconds, isEmptyObject } from '@/common/utils';
import { usePageContext } from '@/context';
import { useSetting } from '@/pages/settings/common-setting/useSetting';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, FormattedMessage } from '@umijs/max';
import { useAsyncEffect, useUpdate } from 'ahooks';
import { Button, Col, Flex, Radio, Row, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useAuditTask } from '../useAuditTask';
import { ImageForm } from './ImageForm';
import { VideoPlayerForm } from './VideoPlayerForm';

interface IAuditTaskListProp {
  showSubmit?: boolean;
  showCountDown?: boolean;
  /**
   * 1: 未审核，2：已审核
   */
  auditedStatus?: number;
  product?: number;
}
export const AuditTaskList = <T extends AuditTaskType>(props: IAuditTaskListProp): React.ReactNode => {
  const className = useEmotionCss(() => {
    return {
      [`& .ant-table-cell .ant-space-gap-row-small`]: {
        rowGap: 3,
      },
    };
  });
  const { showCountDown = false, showSubmit = false, auditedStatus = AuditStatus.UNAUDITED, product } = props;
  const { tableActionRef, state, dispatch } = usePageContext<
    T,
    AuditTaskReduceStateType<T>,
    AuditTaskReduceActionType<T>
  >();
  const tableFormRef = useRef<ProFormInstance<T>>();
  const countDownRef = useRef<number>(0);
  const dataSourceRef = useRef<T[]>([]);
  const forceUpdate = useUpdate();
  const { detailHandler: settingDetailHandler } = useSetting();

  useAsyncEffect(async () => {
    if (showCountDown) {
      const response = await settingDetailHandler();
      const { taskFinishTime = 0 } = response;
      countDownRef.current = Number(taskFinishTime) * 60;
      startCountDown();
    }
  }, []);

  const startCountDown = async () => {
    const timer = setInterval(() => {
      if (countDownRef.current <= 0) {
        clearInterval(timer);
        countDownRef.current = 0;
        return;
      }
      countDownRef.current = countDownRef.current - 1;
      forceUpdate();
    }, 1000);
  };

  const { listHandler, bulkAuditTaskHandler } = useAuditTask<T>({
    tableActionRef,
  });

  const onSubmitHandler = async () => {
    const auditedResult = dataSourceRef.current
      .map((item) => {
        if (item._humanAuditedResult) {
          return { tid: item.tid, dataId: item.dataId, humanAuditedResult: item._humanAuditedResult };
        }
        return null;
      })
      .filter((item) => !!item) as { tid: number; dataId: string; humanAuditedResult: number }[];
    if (auditedResult.length === 0) {
      return;
    }
    await bulkAuditTaskHandler({ list: auditedResult });
    await tableActionRef.current?.reload();
    // history.push('/');
  };
  const changeAuditedResultHandler = (value: number, record: T) => {
    record._humanAuditedResult = value;
  };

  const columns: ProColumns<T>[] = (
    [
      {
        title: '标签选择',
        align: 'center',
        dataIndex: 'label',
        valueType: 'select',
        valueEnum: { ...LabelFilter, 0: undefined },
        hideInTable: true,
      },
      {
        title: '数据ID',
        align: 'center',
        dataIndex: 'dataId',
      },
      {
        title: '生成的视频',
        align: 'center',
        dataIndex: 'videoLink',
        search: false,
        render: (_, record) => {
          return (
            <a
              key={record.tid as number}
              onClick={() =>
                dispatch({
                  type: CommonReducerAction.SetState,
                  payload: { videPlayerModalVisible: true, currentRecord: record },
                })
              }
            >
              <img src={'/images/video_default.png'} width={60} height={50} />
            </a>
          );
        },
      },
      {
        title: '来源',
        align: 'center',
        dataIndex: 'taskSource',
        valueType: 'select',
        valueEnum: {
          1: {
            text: '国内',
          },
          2: {
            text: '国外',
          },
        },
      },
      {
        title: '输入文字',
        align: 'center',
        dataIndex: 'inputText',
        search: false,
      },
      {
        title: '翻译',
        align: 'center',
        dataIndex: '翻译',
        search: false,
        render: (_, record) => {
          const url = `https://fanyi.baidu.com/mtpe-individual/multimodal?query=${record.inputText}&lang=en2zh#/`;
          return (
            <a href={url} target="_blank">
              查看
            </a>
          );
        },
      },
      {
        title: '输入图片',
        align: 'center',
        dataIndex: 'inputImageLink',
        search: false,
        render: (_, record) => {
          return (
            <Space key={record.tid as number} direction="vertical">
              {record.inputImageLink.map((img, index) => {
                return (
                  <a
                    key={index}
                    onClick={() =>
                      dispatch({
                        type: CommonReducerAction.SetState,
                        payload: { imageModalVisible: true, currentRecord: record, images: record.inputImageLink },
                      })
                    }
                  >
                    <img src={img} width={30} height={30} />
                  </a>
                );
              })}
            </Space>
          );
        },
      },
      {
        title: '机审来源',
        align: 'center',
        dataIndex: 'machineService',
        search: false,
        renderText: (text) => {
          return text === 1 ? '数美' : '网易';
        },
      },
      {
        title: '机审ID',
        align: 'center',
        dataIndex: 'machineId',
      },
      {
        title: '机审定帧',
        align: 'center',
        dataIndex: 'machineImageLink',
        search: false,
        render: (_, record) => {
          return (
            <Space key={record.tid as number} direction="vertical">
              {record.machineImageLink.map((img, index) => {
                return (
                  <a
                    key={index}
                    onClick={() =>
                      dispatch({
                        type: CommonReducerAction.SetState,
                        payload: { imageModalVisible: true, currentRecord: record, images: record.machineImageLink },
                      })
                    }
                  >
                    <img src={img} width={30} height={30} />
                  </a>
                );
              })}
            </Space>
          );
        },
      },
      {
        title: '机审结果',
        align: 'center',
        dataIndex: 'machineAuditResult',
        valueType: 'select',
        valueEnum: {
          3: {
            text: '通过',
          },
          4: {
            text: '拒绝',
          },
          5: {
            text: '存疑',
          },
        },
      },
      {
        title: '机审标签',
        align: 'center',
        dataIndex: 'label',
        search: false,
        render(_, record) {
          if (record.machineAuditResult === MachineAuditResult.AUDITED_PASSED) {
            return null;
          }
          return (
            <Flex wrap={'wrap'}>
              {record.label?.map((item) => {
                return (
                  <Tag key={item} color={'#f5222d'}>
                    {LabelFilter[item]}
                  </Tag>
                );
              })}
            </Flex>
          );
        },
      },
      {
        title: '用户ID',
        align: 'center',
        dataIndex: 'userId',
        search: false,
      },
      {
        title: '用户昵称',
        align: 'center',
        dataIndex: 'nickName',
      },
      {
        title: '添加时间',
        align: 'center',
        dataIndex: 'createdAt',
        valueType: 'dateTimeRange',
        render: (_, record) => {
          return dayjs(+record.createdAt * 1000).format('YYYY-MM-DD HH:mm:ss');
        },
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
      },
      AuditStatus.AUDITED === auditedStatus
        ? {
            title: '审核时间',
            align: 'center',
            dataIndex: 'auditedAt',
            valueType: 'dateTimeRange',
            search: {
              transform: (value: any) => {
                if (!isEmptyObject(value)) {
                  const auditedAtBegin = dayjs(value[0]).valueOf() / 1000;
                  const auditedAtEnd = dayjs(value[1]).valueOf() / 1000;
                  return { auditedAtBegin, auditedAtEnd };
                }
                return value;
              },
            },
            render: (_, record) => {
              return dayjs(+record.auditedAt * 1000).format('YYYY-MM-DD HH:mm:ss');
            },
          }
        : null,
      AuditStatus.AUDITED === auditedStatus
        ? {
            title: '审核结果',
            align: 'center',
            dataIndex: 'humanAuditedResult',
            valueType: 'select',
            valueEnum: {
              3: {
                text: '通过',
              },
              4: {
                text: '拒绝',
              },
            },
          }
        : null,
      {
        title: '操作',
        align: 'center',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => [
          <Access key="updateAuditedResult" accessible={auditedStatus === 2}>
            <Radio.Group onChange={(e) => changeAuditedResultHandler(e.target.value, record)}>
              <Radio value={4}>拒绝</Radio>
            </Radio.Group>
          </Access>,
          <Access key="audit" accessible={showSubmit}>
            <Radio.Group onChange={(e) => changeAuditedResultHandler(e.target.value, record)}>
              <Radio value={3}>通过</Radio>
              <Radio value={4}>拒绝</Radio>
            </Radio.Group>
          </Access>,
        ],
      },
    ] as ProColumns<T>[]
  ).filter((item) => !!item);

  return (
    <>
      <ProTable<T, PageParamsType>
        className={className}
        headerTitle={
          showCountDown && countDownRef.current > 0 ? (
            <>
              <span>任务回收倒计时：</span>
              <span style={{ color: 'red', fontSize: 18 }}>
                {convertSecondsToMinutesAndSeconds(countDownRef.current)}
              </span>
            </>
          ) : null
        }
        actionRef={tableActionRef}
        formRef={tableFormRef}
        rowKey="id"
        tableAlertRender={false}
        search={{
          defaultCollapsed: false,
        }}
        pagination={{ defaultPageSize: DEFAULT_PAGE_SIZE }}
        options={{ density: false, fullScreen: false, reload: false, setting: false }}
        dateFormatter={(value) => value.format('YYYY-MM-DD HH:mm:ss')}
        toolBarRender={() => [
          <Access key="submitButton" accessible={showSubmit || auditedStatus === 2}>
            <Button type="primary" onClick={onSubmitHandler}>
              <PlusOutlined />
              <FormattedMessage id="提交任务" />
            </Button>
          </Access>,
        ]}
        params={{ auditedStatus, product }}
        request={async (params: PageParamsType & unknown) => {
          const result = await listHandler(params);
          dataSourceRef.current = result.data;
          return result;
        }}
        columns={columns}
        scroll={{ x: 'max-content' }}
        footer={() => {
          return (
            <Row gutter={[16, 16]}>
              <Col span={12}>
                {showCountDown && countDownRef.current > 0 ? (
                  <Flex>
                    <Space>
                      <span>任务回收倒计时：</span>
                      <span style={{ color: 'red', fontSize: 20 }}>
                        {convertSecondsToMinutesAndSeconds(countDownRef.current)}
                      </span>
                    </Space>
                  </Flex>
                ) : null}
              </Col>
              <Col span={12}>
                <Flex justify="end">
                  <Access key="submitButton" accessible={showSubmit || auditedStatus === 2}>
                    <Button type="primary" onClick={onSubmitHandler}>
                      <PlusOutlined />
                      <FormattedMessage id="提交任务" />
                    </Button>
                  </Access>
                </Flex>
              </Col>
            </Row>
          );
        }}
      />
      <ImageForm />
      <VideoPlayerForm />
    </>
  );
};

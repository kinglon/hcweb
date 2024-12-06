/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-11-20 18:24:39
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
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, FormattedMessage, history } from '@umijs/max';
import { useUnmount, useUnmountedRef, useUpdate } from 'ahooks';
import { Button, Col, Flex, Radio, Row, Space, Tag, message } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
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
  const tableHeightRef = useRef<number>(100);
  const timeoutTimerRef = useRef<NodeJS.Timeout>();
  const intervalTimerRef = useRef<NodeJS.Timeout>();
  const requestRemainTimeRef = useRef<boolean>(false);
  const unmountedRef = useUnmountedRef();
  const forceUpdate = useUpdate();
  const { listHandler, bulkAuditTaskHandler, getCountdownHandler } = useAuditTask<T>({
    tableActionRef,
  });

  const loadDataHandler = async (params: PageParamsType & unknown) => {
    const result = await listHandler(params);
    dataSourceRef.current = result.data;
    if (!requestRemainTimeRef.current && showCountDown) {
      requestRemainTimeRef.current = true;
      const response = await getCountdownHandler();
      const { remainTime = 0 } = response;
      countDownRef.current = remainTime as number;
      if (countDownRef.current > 0 && dataSourceRef.current.length > 0) {
        startCountDown();
      }
    }
    return result;
  };

  const startCountDown = async () => {
    intervalTimerRef.current = setInterval(() => {
      if (unmountedRef.current) {
        clearInterval(intervalTimerRef.current);
        return;
      }
      if (countDownRef.current <= 0) {
        countDownRef.current = 0;
        clearInterval(intervalTimerRef.current);
        clearTimeout(timeoutTimerRef.current);
        // timeoutTimerRef.current = setTimeout(() => {
        //   if (unmountedRef.current) {
        //     return;
        //   }
        //   history.push('/audit-management/collect-task');
        // }, 1000);
        return;
      }
      countDownRef.current--;
      forceUpdate();
    }, 1000);
  };

  const onSubmitHandler = async ({ autoAssignTask }: { autoAssignTask: boolean }) => {
    const auditedResult = dataSourceRef.current
      .map((item) => {
        if (item._humanAuditedResult) {
          return { tid: item.tid, dataId: item.dataId, humanAuditedResult: item._humanAuditedResult };
        }
        return null;
      })
      .filter((item) => !!item) as { tid: number; dataId: string; humanAuditedResult: number }[];
    if (auditedResult.length !== dataSourceRef.current.length) {
      console.log('======', auditedResult, dataSourceRef.current);
      message.error('存在未审核的任务');
      return;
    }
    await bulkAuditTaskHandler({ list: auditedResult, autoAssignTask });
    if (autoAssignTask) {
      await tableActionRef.current?.reload();
    } else if (!product) {
      history.push('/audit-management/collect-task');
    }
  };
  const changeAuditedResultHandler = (value: number, record: T) => {
    record._humanAuditedResult = value;
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      console.log('resize', entries);
      tableHeightRef.current = entries[0].contentRect.height - 580;
      tableHeightRef.current = tableHeightRef.current < 100 ? 100 : tableHeightRef.current;
      forceUpdate();
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, []);

  useUnmount(() => {
    clearInterval(intervalTimerRef.current);
    clearTimeout(timeoutTimerRef.current);
  });

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
        width: 200,
      },
      {
        title: '生成的视频',
        align: 'center',
        dataIndex: 'videoLink',
        width: 100,
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
        width: 50,
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
        width: 200,
      },
      {
        title: '翻译',
        width: 50,
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
        width: 150,
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
        width: 50,
        dataIndex: 'machineService',
        search: false,
        renderText: (text) => {
          return text === 1 ? '数美' : '网易';
        },
      },
      {
        title: '机审ID',
        align: 'center',
        width: 80,
        dataIndex: 'machineId',
      },
      {
        title: '机审定帧',
        align: 'center',
        width: 150,
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
        width: 50,
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
        width: 150,
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
        width: 100,
      },
      {
        title: '用户昵称',
        align: 'center',
        width: 100,
        dataIndex: 'nickName',
      },
      {
        title: '添加时间',
        align: 'center',
        dataIndex: 'createdAt',
        width: 150,
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
      {
        title: '审核人员',
        align: 'center',
        width: 100,
        dataIndex: 'assignUserName',
      },
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
        fixed: 'right',
        render: (_, record, index) => [
          <Access key={record.tid + 'updateAuditedResult' + index} accessible={auditedStatus === 2}>
            <Radio.Group onChange={(e) => changeAuditedResultHandler(e.target.value, record)}>
              <Radio value={4}>拒绝</Radio>
            </Radio.Group>
          </Access>,
          <Access key={record.tid + 'audit' + index} accessible={showSubmit}>
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
            <Button type="primary" onClick={() => onSubmitHandler({ autoAssignTask: false })}>
              <PlusOutlined />
              <FormattedMessage id="提交任务并返回首页" />
            </Button>
          </Access>,
          <Access key="submitButton" accessible={showSubmit || auditedStatus === 2}>
            <Button type="primary" onClick={() => onSubmitHandler({ autoAssignTask: true })}>
              <PlusOutlined />
              <FormattedMessage id="提交任务并继续审核下一轮" />
            </Button>
          </Access>,
        ]}
        params={{ auditedStatus, product }}
        request={loadDataHandler}
        columns={columns}
        scroll={{ x: 'max-content', y: tableHeightRef.current }}
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
                  <Space>
                    <Access key="submitButton" accessible={showSubmit || auditedStatus === 2}>
                      <Button type="primary" onClick={() => onSubmitHandler({ autoAssignTask: false })}>
                        <PlusOutlined />
                        <FormattedMessage id="提交任务并返回首页" />
                      </Button>
                    </Access>
                    <Access key="submitButton" accessible={showSubmit || auditedStatus === 2}>
                      <Button type="primary" onClick={() => onSubmitHandler({ autoAssignTask: true })}>
                        <PlusOutlined />
                        <FormattedMessage id="提交任务并继续审核下一轮" />
                      </Button>
                    </Access>
                  </Space>
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

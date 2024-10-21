/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:22:37
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useAuditTask = <T extends AuditTaskType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { getListHandler: getListServiceHandler, detailHandler: detailServiceHandler, updateHandler: updateServiceHandler } =
    useCRUDService<T>(options);

  async function listHandler(params: PageParamsType & unknown) {
    // if (!isEmptyObject(params?.createdAt)) {
    //   params.createTimeBegin = dayjs(params.createdAt?.[0]).valueOf() / 1000;
    //   params.createTimeEnd = dayjs(params.createdAt?.[1]).valueOf() / 1000;
    //   delete params.createdAt;
    // }
    // if (!isEmptyObject(params?.createdAt)) {
    //   params.createTimeBegin = dayjs(params.createdAt?.[0]).valueOf() / 1000;
    //   params.createTimeEnd = dayjs(params.createdAt?.[1]).valueOf() / 1000;
    //   delete params.createdAt;
    // }
    return await getListServiceHandler(`/hc/task/list`, { params });
  }
  async function detailHandler() {
    return await detailServiceHandler(``);
  }

  async function updateHandler(entity: T) {
    const record = { ...currentRecord, ...entity, taskAssignNum: (entity.taskAssignNum as string)?.split(',') };
    return await updateServiceHandler(``, {
      entity: record,
    });
  }
  async function bulkAuditTaskHandler(entity: { list: { tid: number; dataId: string; humanAuditedResult: number; }[] }) {
    return await updateServiceHandler(`/hc/task/list`, {
      entity,
    });
  }

  async function assignTaskListHandler(params: PageParamsType & unknown) {
    return await getListServiceHandler(`/hc/task/assign_rank`, { params });
  }
  async function auditTaskListHandler(params: PageParamsType & unknown) {
    const response = await getListServiceHandler(`/hc/task/audit_rank`, { params });
    return response;
  }
  async function getAuditTaskSummaryHandler() {
    return await detailServiceHandler(`/hc/task/summary`);
  }
  return {
    listHandler,
    detailHandler,
    updateHandler,
    bulkAuditTaskHandler,
    assignTaskListHandler,
    auditTaskListHandler,
    getAuditTaskSummaryHandler
  };
};

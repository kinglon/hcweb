/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-11-11 22:11:12
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useCollectTask = <T extends CollectTaskType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { getListHandler: getListServiceHandler, createHandler: createServiceHandler, detailHandler: detailServiceHandler, updateHandler: updateServiceHandler } =
    useCRUDService<T>(options);

  async function listHandler(params: PageParamsType & unknown) {
    return await getListServiceHandler(`/hc/task/list`, { params });
  }
  async function createHandler(entity: T) {
    entity.count = Number(entity.count);
    entity.label = Number(entity.label);
    return await createServiceHandler(`/hc/task/assign`, { entity }, { needResponse: true });
  }

  async function countSummaryHandler() {
    return await detailServiceHandler(`/hc/task/summary`);
  }

  async function updateHandler(entity: T) {
    const record = { ...currentRecord, ...entity };
    return await updateServiceHandler(`/hc/task/list`, {
      entity: record,
    });
  }
  return {
    listHandler,
    createHandler,
    updateHandler,
    countSummaryHandler,
  };
};

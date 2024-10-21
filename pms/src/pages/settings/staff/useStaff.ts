/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:19:21
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useStaff = <T extends StaffType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { getListHandler: getListServiceHandler, detailHandler: detailServiceHandler, createHandler: createServiceHandler, removeHandler: removeServiceHandler, updateHandler: updateServiceHandler } =
    useCRUDService<T>(options);
  async function listHandler(params: PageParamsType & { createdAt?: [string, string] }) {
    return await getListServiceHandler(`/hc/user/list`, { params });
  }
  async function detailHandler(id: string) {
    return await detailServiceHandler(`/house/rentingHouseInfo?id=${id}`);
  }
  async function createHandler(entity: T) {
    return await createServiceHandler(`/hc/user`, { entity });
  }
  async function removeHandler(entity: T | undefined) {
    if (!entity?.userId) {
      return;
    }
    return await removeServiceHandler(`/hc/user/${entity.userId}`);
  }
  async function updateHandler(entity: T) {
    return await updateServiceHandler(`/hc/user/${currentRecord?.userId}`, {
      entity,
    });
  }
  return {
    listHandler, detailHandler, createHandler, removeHandler, updateHandler
  };
};

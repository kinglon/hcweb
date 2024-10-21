/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 22:35:06
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useRole = <T extends RoleType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { getListHandler: getListServiceHandler,
    createHandler: createServiceHandler,
    removeHandler: removeServiceHandler,
    updateHandler: updateServiceHandler,
    searchHandler: searchServiceHandler } =
    useCRUDService<T>(options);

  async function listHandler(params: PageParamsType & unknown) {
    return await getListServiceHandler(`/hc/role/list`, { params });
  }
  async function createHandler(entity: T) {
    return await createServiceHandler(`/hc/role`, { entity });
  }
  async function removeHandler(entity: T | undefined) {
    if (!entity?.roleId) {
      return;
    }
    return await removeServiceHandler(`/hc/role/${entity.roleId}`);
  }
  async function updateHandler(entity: T) {
    return await updateServiceHandler(`/hc/role/${currentRecord?.roleId}`, {
      entity,
    });
  }
  async function searchHandler({ keyWords }: { keyWords: string }) {
    return await searchServiceHandler(`/hc/role/list`, {
      keyWords,
      label: 'name',
      value: 'roleId',
    });
  }

  return {
    listHandler,
    createHandler,
    removeHandler,
    updateHandler,
    searchHandler,
  };
};

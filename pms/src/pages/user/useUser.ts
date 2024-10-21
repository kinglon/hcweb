/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-20 23:27:14
 * @Description: 描述
 */
import { create } from '@/common/services';
import { useCRUDService } from '@/hooks';

export const useUser = <T extends UserType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { getListHandler, detailHandler, createHandler, removeHandler, searchHandler, updateHandler } =
    useCRUDService<T>(options);

  return {
    async listHandler(params: PageParamsType & unknown) {
      return await getListHandler(`/user/listAllUser`, { params: params });
    },
    async countUserHandler() {
      return await detailHandler(`/hc/user/summary`);
    },
    async createHandler(entity: T) {
      return await createHandler(`/v1/`, { entity });
    },
    async removeHandler(entity: T | undefined) {
      if (!entity?.id) {
        return;
      }
      return await removeHandler(`/v1//${entity.id}`);
    },
    async updateHandler(entity: T) {
      const record = { ...currentRecord, ...entity };
      return await updateHandler(`/hc/user/${record.userId}`, {
        entity: record,
      });
    },
    async changeRentHandler(id: string, status: boolean) {
      return await create(`/`, { data: { id, isRent: status } });
    },
    async searchStoreHandler({ keyWords }: { keyWords: string }) {
      return await searchHandler(`/v1/`, {
        keyWords,
        label: 'name',
        value: 'id',
      });
    },
  };
};

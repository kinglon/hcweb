/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-10-01 20:32:27
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useSetting = <T extends SettingType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { detailHandler: detailServiceHandler, updateHandler: updateServiceHandler } =
    useCRUDService<T>(options);

  async function detailHandler() {
    return await detailServiceHandler(`/hc/setting`);
  }

  async function updateHandler(entity: T) {
    const record = { ...currentRecord, ...entity, };
    return await updateServiceHandler(`/hc/setting`, {
      entity: record,
    });
  }
  return {
    detailHandler, updateHandler
  };
};

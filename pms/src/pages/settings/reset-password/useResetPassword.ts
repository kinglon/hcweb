/*
 * @Author: Semmy Wong
 * @Date: 2023-07-14 19:48:59
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-19 00:18:31
 * @Description: 描述
 */
import { useCRUDService } from '@/hooks';

export const useResetPassword = <T extends ResetPasswordType>(options: Partial<CRUDActionType<T>> = {}) => {
  const { currentRecord } = options;
  const { detailHandler: detailServiceHandler, updateHandler: updateServiceHandler } =
    useCRUDService<T>(options);

  async function detailHandler() {
    return await detailServiceHandler(`/hc/setting`);
  }

  async function updateHandler(entity: T) {
    const record = { ...currentRecord, ...entity };
    return await updateServiceHandler(`/hc/user/current/resetpassword`, {
      entity: record,
    });
  }
  return {
    detailHandler, updateHandler
  };
};

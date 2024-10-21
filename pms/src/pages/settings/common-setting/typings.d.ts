/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-18 23:12:33
 * @Description: Description
 */
interface SettingType extends Record<string, unknown> {
  id: string;
  name: string;
  sellerId: string;
  createdTime: number;
  usable: boolean;
  creator: UserModule.UserType;
}

interface SettingReduceStateType<T> extends ReduceStateType<T> { }
type SettingReduceActionType<T> = ReduceActionType<T, SettingReduceStateType<T>>;

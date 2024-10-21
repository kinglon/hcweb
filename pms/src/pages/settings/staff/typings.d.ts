/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:49:02
 * @Description: Description
 */
interface StaffType extends Record<string, unknown> {
  userId: string;
  name: string;
  sellerId: string;
  createdTime: number;
  usable: boolean;
  creator: UserModule.UserType;
  createdAt: number;
}

interface StaffReduceStateType<T> extends ReduceStateType<T> { }
type StaffReduceActionType<T> = ReduceActionType<T, StaffReduceStateType<T>>;

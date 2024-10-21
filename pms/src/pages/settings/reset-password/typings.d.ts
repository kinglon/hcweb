/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-18 23:59:16
 * @Description: Description
 */
interface ResetPasswordType extends Record<string, unknown> {
  id: string;
  name: string;
  sellerId: string;
  createdTime: number;
  usable: boolean;
  creator: UserModule.UserType;
}

interface ResetPasswordReduceStateType<T> extends ReduceStateType<T> { }
type ResetPasswordReduceActionType<T> = ReduceActionType<T, ResetPasswordReduceStateType<T>>;

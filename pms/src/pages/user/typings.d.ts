/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-03-31 10:23:18
 * @Description: Description
 */
interface UserType extends Record<string, unknown> {
  id: string;
  name: string;
  headPhoto: string;
  sellerId: string;
  createdTime: number;
  usable: boolean;
  creator: UserModule.UserType;
}

interface UserReduceStateType<T> extends ReduceStateType<T> { }
type UserReduceActionType<T> = ReduceActionType<T, UserReduceStateType<T>>;

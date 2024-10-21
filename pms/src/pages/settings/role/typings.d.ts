/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 23:45:35
 * @Description: Description
 */
interface RoleType extends Record<string, unknown> {
  roleId: number;
  roleName: string;
  roleRemark: string;
  status: number;
  permission: string;
}

interface RoleReduceStateType<T> extends ReduceStateType<T> { }
type RoleReduceActionType<T> = ReduceActionType<T, RoleReduceStateType<T>>;

/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-11-11 21:54:21
 * @Description: Description
 */
interface CollectTaskType extends Record<string, unknown> {
  id: string;
  name: string;
  label?: number;
  count: number;
  createdAtBegin: number;
  createdAtEnd: number;
}

interface CollectTaskReduceStateType<T> extends ReduceStateType<T> {

}
type CollectTaskReduceActionType<T> = ReduceActionType<T, CollectTaskReduceStateType<T>>;

/*
 * @Author: Semmy Wong
 * @Date: 2023-09-06 21:44:55
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-19 23:36:18
 * @Description: 描述
 */
import type { Reducer, ReducerState } from 'react';

declare global {
  interface ReduceStateType<T> {
    currentRecord: T;
    createModalVisible: boolean;
    updateModalVisible: boolean;
    detailModalVisible: boolean;
    createUpdateModalVisible: boolean;
    modalVisible: boolean;
    keyword: string | undefined;
    selectedRows: T[];
    expandedRowKeys: React.Key[];
  }
  interface ReduceActionType<T, S extends ReduceStateType<T>> {
    type: string;
    payload?: Partial<ReduceStateType<T> & S>;
  }

  type CommonReducerOptionType<T, S, A> = {
    reducer?: Reducer<ReduceStateType<T> & S, A>;
    states?: ReducerState<Reducer<Partial<S>, A>>;
  };
  type ReducerType<T, S, A> = (
    prevState: ReduceStateType<T> & S,
    action: ReduceActionType<T, ReduceStateType<T> & S> & A,
  ) => ReduceStateType<T> & S;
}

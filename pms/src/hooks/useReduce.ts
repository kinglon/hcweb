/*
 * @Author: Semmy Wong
 * @Date: 2023-08-10 22:08:54
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-19 23:37:38
 * @Description: 描述
 */

import { CommonReducerAction } from '@/common/constants';
import { isPlainObj } from '@/common/utils';
import { useReducer } from 'react';

const internalCreateInitialState = <T, S>(state: ReduceStateType<T> & S) => {
  return state;
};

const internalReducer = <T, S extends ReduceStateType<T>, A extends ReduceActionType<T, S>>(state: S, action: A) => {
  switch (action.type) {
    case CommonReducerAction.SetCurrentRecord:
      return {
        ...state,
        currentRecord: action.payload?.currentRecord,
      };
    case CommonReducerAction.ToggleCreateModalVisible:
      return {
        ...state,
        createModalVisible: action.payload?.createModalVisible ?? !state.createModalVisible,
      };
    case CommonReducerAction.ToggleUpdateModalVisible:
      return {
        ...state,
        updateModalVisible: action.payload?.updateModalVisible ?? !state.updateModalVisible,
      };
    case CommonReducerAction.ToggleDetailModalVisible:
      return {
        ...state,
        detailModalVisible: action.payload?.detailModalVisible ?? !state.detailModalVisible,
      };
    case CommonReducerAction.ToggleCreateUpdateModalVisible:
      return {
        ...state,
        createUpdateModalVisible: action.payload?.createUpdateModalVisible ?? !state.createUpdateModalVisible,
      };
    case CommonReducerAction.ToggleModalVisible:
      return {
        ...state,
        modalVisible: action.payload?.modalVisible ?? !state.modalVisible,
      };
    case CommonReducerAction.SetKeyword:
      return {
        ...state,
        keyword: action.payload?.keyword,
      };
    case CommonReducerAction.SetState:
      return {
        ...state,
        ...action.payload,
      };
    case CommonReducerAction.ResetState:
      return {
        currentRecord: undefined,
        createModalVisible: false,
        updateModalVisible: false,
        detailModalVisible: false,
        createUpdateModalVisible: false,
        modalVisible: false,
        keyword: undefined,
        selectedRows: [],
        expandedRowKeys: [],
      };
    default:
      return state;
  }
};

export const useReduce = <
  T extends Record<string, unknown>,
  S extends ReduceStateType<T> = ReduceStateType<T>,
  A extends ReduceActionType<T, S> = ReduceActionType<T, S>,
>(
  options?: CommonReducerOptionType<T, S, A>,
) => {
  const { reducer, states } = options ?? {};
  const initialState = {
    currentRecord: undefined,
    createModalVisible: false,
    updateModalVisible: false,
    detailModalVisible: false,
    createUpdateModalVisible: false,
    modalVisible: false,
    keyword: undefined,
    selectedRows: [],
    expandedRowKeys: [],
    ...(states ?? {}),
  } as ReduceStateType<T> & S;
  const reducerFn = (state: ReduceStateType<T> & S, action: ReduceActionType<T, ReduceStateType<T> & S> & A) => {
    try {
      if (reducer) {
        return reducer(state, action) as ReduceStateType<T> & S;
      }
    } catch { }
    return internalReducer<T, S, A>(state, action) as ReduceStateType<T> & S;
  };
  const [state, dispatch] = useReducer<
    ReducerType<T, ReduceStateType<T> & S, ReduceActionType<T, ReduceStateType<T> & S> & A>,
    ReduceStateType<T> & S
  >(reducerFn, initialState, internalCreateInitialState);
  const dispatchFn: React.Dispatch<A & ReduceActionType<T, ReduceStateType<T> & S>> = (
    value: (A & ReduceActionType<T, ReduceStateType<T> & S>) | (ReduceStateType<T> & S),
  ) => {
    if (isPlainObj(value) && 'type' in value) {
      dispatch(value);
    } else {
      dispatch({ type: CommonReducerAction.SetState, payload: value } as unknown as ReduceActionType<T, S> & A);
    }
  };
  return { state, dispatch: dispatchFn };
};

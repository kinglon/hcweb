/*
 * @Author: Semmy Wong
 * @Date: 2023-08-10 21:46:26
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2023-09-07 22:29:32
 * @Description: 描述
 */
import type { ActionType } from '@ant-design/pro-components';
import { createContext, useContext } from 'react';

interface PageContextType<T, S, A> {
  tableActionRef: React.MutableRefObject<ActionType | undefined>;
  state: ReduceStateType<T> & S;
  dispatch: React.Dispatch<ReduceActionType<T> & A>;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PageContext = createContext<PageContextType<any, any, any> | undefined>(undefined);

export function usePageContext<T, S = unknown, A = unknown>() {
  return useContext<PageContextType<T, S, A>>(PageContext as React.Context<PageContextType<T, S, A>>);
}

export const PageContextProvider = PageContext.Provider;

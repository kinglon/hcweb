import { request as umiRequest, type Request } from '@umijs/max';
import { convertKeysToSnakeCase } from './utils';


export const request: Request = <T = any>(url: string, opts: any = { method: 'GET' }) => {
  const params = opts?.params ? convertKeysToSnakeCase(opts.params) : undefined;
  const data = opts?.data ? convertKeysToSnakeCase(opts.data) : undefined;
  return umiRequest<T>(url, { ...opts, params, data });
}

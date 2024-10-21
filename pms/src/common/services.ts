/*
 * @Author: Semmy Wong
 * @Date: 2023-04-06 21:02:49
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-22 00:42:27
 * @Description: 描述
 */

import { request } from "./request";

export async function list<T>(url: string, options?: Record<string, unknown>): Promise<ListResultType<T>> {
  return await request<ListResultType<T>>(url, {
    method: 'POST',
    ...(options || {}),
  });
}
export async function getList<T>(url: string, options?: Record<string, unknown>): Promise<ListResultType<T>> {
  return await request<ListResultType<T>>(url, {
    method: 'GET',
    ...(options || {}),
  });
}
export async function postList<T>(url: string, options?: Record<string, unknown>): Promise<ListResultType<T>> {
  return await request<ListResultType<T>>(url, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function create<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  return await request<T>(url, {
    method: 'POST',
    ...(options || {}),
  });
}

export async function remove<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  return await request<T>(url, {
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function update<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  return await request<T>(url, {
    method: 'PUT',
    ...(options || {}),
  });
}
export async function detail<T>(url: string, options?: Record<string, unknown>): Promise<T> {
  return await request<T>(url, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getEnums<T>(code: string, options?: Record<string, unknown>): Promise<T> {
  return await request<T>(`/v1/common/enums/${code}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getOSSPolicy<T>(dirName = 'image', options?: Record<string, unknown>): Promise<T> {
  return await request<T>(`/v1/alioss/oss/policy/dir/${dirName}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getAccesses<T>(options?: Record<string, unknown>): Promise<T> {
  return await request<T>(`/v1/security/personal/frontPermissions`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function importExportFile<T>(
  url: string,
  options: { file: Blob | File; data?: QueryListParamType; params?: Record<string, unknown> },
) {
  const { file } = options;
  const formData = new FormData();
  formData.append('file', file);
  return await request<T>(url, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
    getResponse: true,
    responseType: 'blob',
  });
}

export async function importFile<T>(url: string, file: Blob | File, options?: Record<string, unknown>) {
  const formData = new FormData();
  formData.append('file', file);
  return await request<T>(url, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data',
    },
    ...(options || {}),
  });
}

export async function exportFile(
  url: string,
  options?: { data?: QueryListParamType; params?: Record<string, unknown> },
) {
  const { data, params } = options ?? {};
  return await request<Blob>(url, {
    method: 'POST',
    params,
    data,
    getResponse: true,
    responseType: 'blob',
  });
}

export async function downloadFile(
  url: string,
  options?: { data?: QueryListParamType; params?: Record<string, unknown> },
) {
  const { data, params } = options ?? {};
  return await request<Blob>(url, {
    method: 'GET',
    params,
    data,
    getResponse: true,
    responseType: 'blob',
  });
}

/**
 * 上传文件
 * @param params
 * @returns
 */
export async function uploadFile<T>(url: string, params: unknown & { file: File }) {
  const formData = new FormData();
  formData.append('files', params.file);
  return await request<T>(url, {
    method: 'POST',
    requestType: 'form',
    data: formData,
  });
}

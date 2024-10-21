/*
 * @Author: Semmy Wong
 * @Date: 2022-09-20 23:30:15
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-20 00:32:00
 * @Description: 描述
 */
import type { GetProp, UploadProps } from 'antd';
import { camelCase } from 'lodash';
import isNil from 'lodash/isNil';
import snakeCase from 'lodash/snakeCase';

const isType =
  <T>(type: string) =>
    (obj: unknown): obj is T =>
      toString.call(obj) === `[object ${type}]`;
export const isFn = isType<(...args: unknown[]) => unknown>('Function');
export const isArr = Array.isArray || isType<unknown[]>('Array');
export const isPlainObj = isType<object>('Object');
export const isStr = isType<string>('String');
export const isBool = isType<boolean>('Boolean');
export const isNum = isType<number>('Number');
export const isObj = (val: unknown): val is object => typeof val === 'object';
export const isRegExp = isType<RegExp>('RegExp');
export const isNumberLike = (t: string) => {
  return isNum(t) || /^(\d+)(\.\d+)?$/.test(t);
};
export function isEmptyObject(obj: Record<string, unknown> | string | number | undefined | null | unknown) {
  if (isNil(obj) || ((isPlainObj(obj) || isArr(obj) || isStr(obj)) && Object.keys(obj).length === 0)) {
    return true;
  }
  return false;
}

export function isValidObject(obj: Record<string, unknown> | string | number | undefined | null | unknown) {
  return !isEmptyObject(obj);
}

export function blobToString(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getBase64Image = (img: string): string => {
  return img?.startsWith('data:image') ? img : `data:image/png;base64,${img}`;
};


export function convertKeysToSnakeCase<T extends object>(obj: T): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = snakeCase(key);
      const value = obj[key];

      // 如果值是数组，递归处理数组中的每个对象
      if (Array.isArray(value)) {
        result[newKey] = value.map(item => {
          // 如果数组中的每个项是对象，则递归转换
          if (item && typeof item === 'object') {
            return convertKeysToSnakeCase(item);
          }
          return item; // 如果不是对象，直接返回
        });
      }
      // 如果值是对象且不为 null，递归调用
      else if (value && typeof value === 'object') {
        result[newKey] = convertKeysToSnakeCase(value);
      }
      // 其他情况，直接赋值
      else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

export function convertKeysToCamelCase<T extends object>(obj: T): { [key: string]: any } {
  const result: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = camelCase(key);
      const value = obj[key];

      // 如果值是数组，递归处理数组中的每个对象
      if (Array.isArray(value)) {
        result[newKey] = value.map(item => {
          // 要确保数组中的每个项目都进行键转换
          if (typeof item === 'object' && item !== null) {
            return convertKeysToCamelCase(item);
          }
          return item; // 如果不是对象，直接返回
        });
      }
      // 如果值是对象且不是 null，递归调用
      else if (value && typeof value === 'object') {
        result[newKey] = convertKeysToCamelCase(value);
      }
      // 其他情况，直接赋值
      else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

export function convertSecondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 补零操作，确保输出格式为两位数
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

/*
 * @Author: Semmy Wong
 * @Date: 2023-04-21 21:44:34
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 21:29:43
 * @Description: 描述
 */
export const LOGIN_PATH = '/login';

export const IS_DEV = process.env.NODE_ENV === 'development';
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_BIG_PAGE_SIZE = 1000;
export const IMAGE_ERROR_PATH = '/images/img_error.png';

/**
 * 常用的一些Reducer Action名称
 */
export const enum CommonReducerAction {
  SetCurrentRecord = 'SET_CURRENT_RECORD',
  ToggleUpdateModalVisible = 'TOGGLE_UPDATE_MODAL_VISIBLE',
  ToggleCreateModalVisible = 'TOGGLE_CREATE_MODAL_VISIBLE',
  ToggleDetailModalVisible = 'TOGGLE_DETAIL_MODAL_VISIBLE',
  ToggleCreateUpdateModalVisible = 'TOGGLE_CREATE_UPDATE_MODAL_VISIBLE',
  ToggleModalVisible = 'TOGGLE_MODAL_VISIBLE',
  SetKeyword = 'SET_KEYWORD',
  SetState = 'SET_STATE',
  ResetState = 'RESET_STATE',
}

export const FilterCondition = {
  IS_NULL: 'IS_NULL',
  IS_NOT_NULL: 'IS_NOT_NULL',
  EQ: 'EQ',
  NEQ: 'NEQ',
  IN: 'IN',
  NIN: 'NIN',
  GT: 'GT',
  GE: 'GE',
  LT: 'LT',
  LE: 'LE',
  BETWEEN: 'BETWEEN',
  LIKE: 'LIKE',
  LIKE_LEFT: 'LIKE_LEFT',
  LIKE_RIGHT: 'LIKE_RIGHT',
  AND: 'AND',
  OR: 'OR',
};

/** 表格里单元格图片的大小 */
export const TableImageSize = {
  width: 112,
  height: 100,
};

export const enum AuditStatus {
  /**
   * 未审核
   */
  UNAUDITED = 1,

  /**
   * 已审核
   */
  AUDITED = 2,

  /**
   * 审核中
   */
  AUDITING = 3,
}


export const enum AuditResult {
  /**
   * 通过
   */
  AUDITED_PASSED = 3,

  /**
   * 拒绝
   */
  AUDITED_REJECTED = 4,
}
export const enum MachineAuditResult {
  /**
   * 通过
   */
  AUDITED_PASSED = 3,

  /**
   * 拒绝
   */
  AUDITED_REJECTED = 4,

  /**
   * 存疑
   */
  AUDITED_REVIEW = 5,
}

export enum TaskSource {
  /**
   * 国内
   */
  DOMESTIC = 1,

  /**
   * 国外
   */
  INTERNATIONAL = 2
}

export enum MachineService {
  /**
   * 数美
   */
  SHUMEI = 1,

  /**
   * 网易
   */
  WANGYI = 2
}

export const LabelFilter = {
  0: '全部',
  1: '暴恐',
  2: '涉政',
  3: '违禁',
  4: '色情',
  5: '广告',
  6: '其他',
  7: '其他 - 广告法',
  8: '其他 - 灌水',
  9: '其他 - 谩骂 / 辱骂',
  10: '其他 - 涉价值观',
  11: '其他 - 恶心',
  12: '其他 - 二维码',
  13: '其他 - 性感 / 性感低俗',
  14: '其他 - 黑白名单',
  15: '其他 - 隐私',
  16: '其他 - 未成年人',
  17: '其他 - 网络诈骗',
  18: '其他 - 无意义',
}

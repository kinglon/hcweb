/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-30 21:13:36
 * @Description: Description
 */
interface AuditTaskType extends Record<string, unknown> {
  _humanAuditedResult?: number;
  id: string;
  videoLink?: string;
  auditedAt: string;
  createdAt: string;
  label: string[];
  inputImageLink: string[]
  machineImageLink: string[]
}

interface AuditTaskReduceStateType<T> extends ReduceStateType<T> {
  notAuditedCount: number;
  auditingCount: number;
  auditedCount: number;
  auditorCount: number;
  videPlayerModalVisible: boolean;
  imageModalVisible: boolean;
  images: string[];
}
type AuditTaskReduceActionType<T> = ReduceActionType<T, AuditTaskReduceStateType<T>>;

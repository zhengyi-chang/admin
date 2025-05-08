// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取操作日志列表 GET /api/v1/sys-operate-log */
export async function listSysOperateLog(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  let order = {};
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const element = options[key];
      order[key + 'Order'] = String(element).replace('end', '');
    }
  }
  return request<SysOperateLogList>('/api/v1/sys-operate-log', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询操作日志 Get /api/v1/sys-operate-log */
export async function getSysOperateLog(id?: number) {
  return request<SysOperateLogGet>('/api/v1/sys-operate-log/' + id, {
    method: 'GET',
  });
}

/** 删除操作日志 DELETE /api/v1/sys-operate-log */
export async function removeSysOperateLog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-operate-log', {
    method: 'DELETE',
    data: options || {},
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取异常日志列表 GET /api/v1/sys-abnormal-log */
export async function listSysAbnormalLog(
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
  return request<SysAbnormalLogList>('/api/v1/sys-abnormal-log', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询异常日志 Get /api/v1/sys-abnormal-log */
export async function getSysAbnormalLog(id?: number) {
  return request<SysAbnormalLogGet>('/api/v1/sys-abnormal-log/' + id, {
    method: 'GET',
  });
}

/** 修改异常日志 PUT /api/v1/sys-abnormal-log */
export async function updateSysAbnormalLog(options?: { [key: string]: any }) {
  return request<SysAbnormalLogItem>('/api/v1/sys-abnormal-log/' + String(options?.abId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建异常日志 POST /api/v1/sys-abnormal-log */
export async function addSysAbnormalLog(options?: { [key: string]: any }) {
  return request<SysAbnormalLogItem>('/api/v1/sys-abnormal-log', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除异常日志 DELETE /api/v1/sys-abnormal-log */
export async function removeSysAbnormalLog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-abnormal-log', {
    method: 'DELETE',
    data: options || {},
  });
}

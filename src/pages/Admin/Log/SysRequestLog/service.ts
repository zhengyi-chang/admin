// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取列表 GET /api/v1/sys-request-log */
export async function listSysRequestLog(
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
  return request<SysRequestLogList>('/api/v1/sys-request-log', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询 Get /api/v1/sys-request-log */
export async function getSysRequestLog(id?: number) {
  return request<SysRequestLogGet>('/api/v1/sys-request-log/' + id, {
    method: 'GET',
  });
}

/** 修改 PUT /api/v1/sys-request-log */
export async function updateSysRequestLog(options?: { [key: string]: any }) {
  return request<SysRequestLogItem>('/api/v1/sys-request-log/' + String(options?.id), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建 POST /api/v1/sys-request-log */
export async function addSysRequestLog(options?: { [key: string]: any }) {
  return request<SysRequestLogItem>('/api/v1/sys-request-log', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除 DELETE /api/v1/sys-request-log */
export async function removeSysRequestLog(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-request-log', {
    method: 'DELETE',
    data: options || {},
  });
}

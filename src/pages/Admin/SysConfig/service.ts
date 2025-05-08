// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取列表 GET /api/v1/sys-config */
export async function listSysConfig(
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
  return request<SysConfigList>('/api/v1/sys-config', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询 Get /api/v1/sys-config */
export async function getSysConfig(id?: number) {
  return request<SysConfigGet>('/api/v1/sys-config/' + id, {
    method: 'GET',
  });
}

/** 修改 PUT /api/v1/sys-config */
export async function updateSysConfig(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-config/' + String(options?.id), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建 POST /api/v1/sys-config */
export async function addSysConfig(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-config', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除 DELETE /api/v1/sys-config */
export async function removeSysConfig(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-config', {
    method: 'DELETE',
    data: options || {},
  });
}

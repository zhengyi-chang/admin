// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取接口列表 GET /api/v1/sys-api */
export async function listSysApi(
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
  return request<SysApiPage>('/api/v1/sys-api', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 获取接口列表 GET /api/v1/sys-api/list */
export async function listSysApiNoPage() {
  return request<SysApiList>('/api/v1/sys-api/list', {
    method: 'GET',
  });
}

/** 查询接口 Get /api/v1/sys-api */
export async function getSysApi(id?: number) {
  return request<SysApiGet>('/api/v1/sys-api/' + id, {
    method: 'GET',
  });
}

/** 修改接口 PUT /api/v1/sys-api */
export async function updateSysApi(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-api/' + String(options?.id), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建接口 POST /api/v1/sys-api */
export async function addSysApi(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-api', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除接口 DELETE /api/v1/sys-api */
export async function removeSysApi(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-api', {
    method: 'DELETE',
    data: options || {},
  });
}

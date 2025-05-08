// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取列表 GET /api/v1/dict/type */
export async function listSysDictType(
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
  return request<SysDictTypeList>('/api/v1/dict/type', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询 Get /api/v1/dict/type */
export async function getSysDictType(id?: number) {
  return request<SysDictTypeGet>('/api/v1/dict/type/' + id, {
    method: 'GET',
  });
}

/** 修改 PUT /api/v1/dict/type */
export async function updateSysDictType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/type/' + String(options?.dictId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建 POST /api/v1/dict/type */
export async function addSysDictType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/type', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除 DELETE /api/v1/dict/type */
export async function removeSysDictType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/type', {
    method: 'DELETE',
    data: options || {},
  });
}

/** 获取列表 GET /api/v1/dict/data */
export async function listSysDictData(
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
  return request<SysDictDataList>('/api/v1/dict/data', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询 Get /api/v1/dict/data */
export async function getSysDictData(id?: number) {
  return request<SysDictDataGet>('/api/v1/dict/data/' + id, {
    method: 'GET',
  });
}

/** 修改 PUT /api/v1/dict/data */
export async function updateSysDictData(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/data/' + String(options?.dictCode), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建 POST /api/v1/dict/data */
export async function addSysDictData(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/data', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除 DELETE /api/v1/dict/data */
export async function removeSysDictData(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dict/data', {
    method: 'DELETE',
    data: options || {},
  });
}

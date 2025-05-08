// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取部门列表 GET /api/v1/dept */
export async function dept(
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
  return request<API.DeptList>('/api/v1/dept', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询部门 Get /api/v1/dept */
export async function getDept(id?: number) {
  return request<API.DeptGet>('/api/v1/dept/' + id, {
    method: 'GET',
  });
}

/** 修改部门 PUT /api/v1/dept */
export async function updateDept(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dept/' + String(options?.deptId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建部门 POST /api/v1/dept */
export async function addDept(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dept', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除部门 DELETE /api/v1/dept */
export async function removeDept(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/dept', {
    method: 'DELETE',
    data: options || {},
  });
}

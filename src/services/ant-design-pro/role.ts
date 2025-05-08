// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取角色列表 GET /api/v1/ro le */
export async function role(
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
  return request<API.RoleList>('/api/v1/role', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询角色 Get /api/v1/role */
export async function getRole(id?: number) {
  return request<API.RoleGet>('/api/v1/role/' + id, {
    method: 'GET',
  });
}

/** 修改角色 PUT /api/v1/role */
export async function updateRole(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/role/' + String(options?.roleId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建角色 POST /api/v1/role */
export async function addRole(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/role', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除角色 DELETE /api/v1/role */
export async function removeRole(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/role', {
    method: 'DELETE',
    data: options || {},
  });
}

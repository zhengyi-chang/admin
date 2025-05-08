// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取用户列表 GET /api/user */
export async function user(
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
  return request<API.UserList>('/api/v1/sys-user', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询用户 Get /api/user */
export async function getUser(id?: number) {
  return request<API.UserGet>('/api/v1/sys-user/' + id, {
    method: 'GET',
  });
}

/** 修改用户 PUT /api/user */
export async function updateUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-user', {
    method: 'PUT',
    data: options || {},
  });
}

/** 修改用户状态 PUT /api/v1/user/status */
export async function updateStatusUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/user/status', {
    method: 'PUT',
    data: options || {},
  });
}

/** 修改 重置用户密码 PUT /api/user/pwd/reset */
export async function resetPasswordUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/user/pwd/reset', {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建用户 POST /api/user */
export async function addUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-user', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除用户 DELETE /api/user */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/sys-user', {
    method: 'DELETE',
    data: options || {},
  });
}

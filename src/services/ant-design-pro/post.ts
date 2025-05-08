// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取岗位列表 GET /api/sys-post */
export async function post(
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
  return request<API.PostList>('/api/v1/post', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询岗位 Get /api/sys-post */
export async function getPost(id?: number) {
  return request<API.PostGet>('/api/v1/post/' + id, {
    method: 'GET',
  });
}

/** 修改岗位 PUT /api/sys-post */
export async function updatePost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/post/' + String(options?.postId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建岗位 POST /api/sys-post */
export async function addPost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/post', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除岗位 DELETE /api/sys-post */
export async function removePost(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/post', {
    method: 'DELETE',
    data: options || {},
  });
}

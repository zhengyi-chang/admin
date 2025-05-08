// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取菜单列表 GET /api/sys-post */
export async function menu(
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
  return request<API.MenuList>('/api/v1/menu', {
    method: 'GET',
    params: {
      ...(params || {}),
      ...(order || {}),
    },
    ...(options || {}),
  });
}

/** 查询菜单树 Get /api/sys-menu */
export async function getMenuTree() {
  return request<API.MenuTreeOptionList>('/api/v1/roleMenuTreeselect/0', {
    method: 'GET',
  });
}

/** 查询菜单 Get /api/sys-menu */
export async function getMenu(id?: number) {
  return request<API.MenuGet>('/api/v1/menu/' + id, {
    method: 'GET',
  });
}

/** 修改菜单 PUT /api/sys-menu */
export async function updateMenu(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/api/v1/menu/' + String(options?.menuId), {
    method: 'PUT',
    data: options || {},
  });
}

/** 新建菜单 Menu /api/sys-menu */
export async function addMenu(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/api/v1/menu', {
    method: 'POST',
    data: options || {},
  });
}

/** 删除菜单 DELETE /api/sys-menu */
export async function removeMenu(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/menu', {
    method: 'DELETE',
    data: options || {},
  });
}

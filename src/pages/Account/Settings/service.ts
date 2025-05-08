import { request } from 'umi';
import type { CurrentUser, GeographicItemType, UpdatePwd } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/v1/user/current');
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/api/geographic/province');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}

export async function updateCurrent(options?: { [key: string]: any }) {
  return request<CurrentUser>('/api/v1/user/current', {
    method: 'PUT',
    data: options || {},
  });
}

/** 修改 重置用户密码 PUT /api/user/pwd/reset */
export async function updateUserPassword(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/user/pwd/set', {
    method: 'PUT',
    data: options || {},
  });
}

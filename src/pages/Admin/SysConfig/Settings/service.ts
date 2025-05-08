import { request } from 'umi';
import type { CurrentUser, GeographicItemType } from './data';

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

/** 修改 系统参数配置 PUT /api/v1/set-config */
export async function updateSysConfig(options: Record<string, any>) {
  const list: any[] = [];
  for (const [k, v] of Object.entries(options)) {
    list.push({
      configKey: k,
      configValue: v as string,
    });
  }
  return request<Record<string, any>>('/api/v1/set-config', {
    method: 'PUT',
    data: list || [],
  });
}

/** 查询后台配置参数对象 Get /api/v1/set-config */
export async function getSysConfig(): Promise<Record<string, any>> {
  return request('/api/v1/set-config', {
    method: 'GET',
  });
}

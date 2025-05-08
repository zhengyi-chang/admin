import { request } from 'umi';

const url = '/api/v1/oxs';

export async function getOXS() {
  return request<Record<string, any>>(url, {
    method: 'GET',
  });
}

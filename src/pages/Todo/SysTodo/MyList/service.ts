import { request } from 'umi';
import type { BasicListItemDataType } from './data';

type ParamsType = {
  pageSize?: number;
  current?: number;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(params: ParamsType): Promise<{
  data: { list: BasicListItemDataType[]; total: number; current: number; pageSize: number };
}> {
  return request('/api/v1/todo/list', {
    params,
  });
}

export async function queryFakeTodoTotal(
  params: ParamsType,
): Promise<{ data: { normal: number; active: number; exception: number; success: number } }> {
  return request('/api/v1/todo/total', {
    params,
  });
}

export async function removeFakeList(options?: Record<string, any>): Promise<{
  data: { list: BasicListItemDataType[]; total: number; current: number; pageSize: number };
}> {
  return request('/api/v1/todo/list', {
    method: 'DELETE',
    data: options || {},
  });
}

export async function addFakeList(params: ParamsType): Promise<{
  data: { list: BasicListItemDataType[]; total: number; current: number; pageSize: number };
}> {
  return request('/api/v1/todo/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateFakeList(params: ParamsType): Promise<{
  data: { list: BasicListItemDataType[]; total: number; current: number; pageSize: number };
}> {
  return request('/api/v1/todo/list/' + params.id, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

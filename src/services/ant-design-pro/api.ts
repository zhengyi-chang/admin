// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/v1/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的系统配置 GET /api/currentAppConfig */
export async function currentAppConfig() {
  return request<{
    data: API.AppConfig;
  }>('/api/v1/app-config', {
    method: 'GET',
  });
}

export async function fetchMenuData(options?: { [key: string]: any }) {
  return request<{
    data: API.MenuData;
  }>('/api/v1/menurole', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/user/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getImgCode() {
  return request<Record<string, any>>('/api/v1/captcha', {
    method: 'GET',
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/v1/sys/notice', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 根据key获取字典数据 GET /api/v1/dict-data/option-select */
export async function optionDictDataSelect(params: {
  // query
  /** 字典类型 */
  dictType?: string;
}) {
  return request<API.DictDataList>('/api/v1/dict-data/option-select', {
    method: 'GET',
    params: {
      ...params,
    },
  });
}

/** 获取角色下拉列表 GET /api/v1/role-option */
export async function optionRoleSelect() {
  return request<API.SelectOptionList>('/api/v1/role-option', {
    method: 'GET',
  });
}

/** 获取岗位下拉列表 GET /api/v1/post-option */
export async function optionPostSelect() {
  return request<API.SelectOptionList>('/api/v1/post-option', {
    method: 'GET',
  });
}

/** 获取部门树下拉列表 GET /api/v1/dept-tree-option */
export async function optionDeptSelect() {
  return request<API.TreeOptionList>('/api/v1/dept-tree-option', {
    method: 'GET',
  });
}

export async function uploadFile(options?: any) {
  return request<Record<string, any>>(
    '/api/v1/public/uploadFile?type=1&token=' + localStorage.getItem('token'),
    {
      method: 'POST',
      data: options || {},
      requestType: 'form',
    },
  );
}

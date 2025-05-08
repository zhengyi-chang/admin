// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    accessList: string[];
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type AppConfigItem = {
    [key: string]: any;
  };

  type AppConfig = {
    data: MenuDataItem[];
    success?: boolean;
  };

  type MenuData = {
    data: AppConfigItem[];
    success?: boolean;
  };
  type MenuDataItem = {
    authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: string;
    locale?: string;
    name?: string;
    path: string;
    [key: string]: any;
  };

  type LoginResult = {
    success?: boolean;
    token: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    code?: string;
    uuid?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type Response = {
    success?: boolean;
    errorCode?: string;
    errorMessage?: string;
    showType?: string;
    traceId?: string;
    host?: string;
    status?: string;
    data?: any;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode?: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  /** 用户管理功能模型 */
  type DeptItem = {
    deptId: number;
    parentId: number;
    deptPath: string;
    deptName: string;
    sort: number;
    leader: string;
    phone: string;
    email: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    dataScope: string;
    params: string;
    children?: any;
  };

  type UserListItem = {
    userId: number;
    username: string;
    nickName: string;
    phone: string;
    roleId: number;
    avatar: string;
    sex: string;
    email: string;
    deptId: number;
    postId: number;
    remark: string;
    status: string;
    deptIds: number[];
    postIds: number[];
    roleIds?: number[];
    dept?: DeptItem;
    createBy: number;
    updateBy: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type UserList = {
    data?: UserListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type UserGet = {
    data?: UserListItem;
    success?: boolean;
  };

  type DictDataListItem = {
    label: string;
    value: any;
  };

  type DictDataList = {
    data?: DictDataListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type SelectOptionList = {
    data: {}[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type TreeItem = {
    label: string;
    value: string;
    children?: TreeItem[];
  };

  type TreeOptionList = {
    data?: TreeItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type TreeI = {
    title: string;
    key: string;
    children?: TreeI[];
  };

  type MenuTreeOptionList = {
    data?: { menus: TreeItem[]; checkedKeys: number[] };
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  /**
   * Post
   * 岗位
   */
  type PostListItem = {
    postId: number;
    postName: string;
    postCode: string;
    sort: number;
    status: any;
    remark: string;
    dataScope: string;
    params: string;
    createBy: number;
    updateBy: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type PostList = {
    data?: PostListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PostGet = {
    data?: PostListItem;
    success?: boolean;
  };

  type MenuList = {
    data?: MenuListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type MenuGet = {
    data?: MenuListItem;
    success?: boolean;
  };

  /**
   * Menu
   * 菜单
   */
  type MenuListItem = {
    children: MenuListItem[] | undefined;
    component: string;
    createdAt?: Date;
    dataScope: string;
    icon: string;
    isFrame: string;
    visible: boolean;
    menuId: number;
    menuName: string;
    menuType: string;
    parentId: number;
    path: string;
    paths: string;
    permission: string;
    sort: number;
    sysApi: any[];
    apis: number[];
    title: string;
  };

  /**
   * Dept
   * 部门
   */
  type DeptListItem = {
    deptId: number;
    parentId: number;
    deptPath: string;
    deptName: string;
    sort: number;
    leader: string;
    phone: string;
    email: string;
    status: any;
    createBy: number;
    updateBy: number;
    createdAt: Date;
    updatedAt: Date;
    dataScope: string;
    params: string;
    children: DeptListItem[] | undefined;
  };

  type DeptList = {
    data?: DeptListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type DeptGet = {
    data?: DeptListItem;
    success?: boolean;
  };

  /**
   * Role
   * 角色
   */
  type RoleListItem = {
    roleId: number;
    roleName: string;
    status: number;
    roleKey: string;
    roleSort: number;
    flag: string;
    remark: string;
    admin: boolean;
    dataScope: string;
    params: string;
    menuIds: number[];
    deptIds: number[];
    sysDept: number[];
    sysMenu: any[];
    createBy: number;
    updateBy: number;
    createdAt: Date;
    updatedAt: Date;
  };

  type RoleList = {
    data?: RoleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RoleGet = {
    data?: RoleListItem;
    success?: boolean;
  };
}

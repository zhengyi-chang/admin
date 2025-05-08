/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canDashboard: (currentUser?.accessList.indexOf('canDashboard') ?? -1) >= 0,
    canDashboardWorkplace: (currentUser?.accessList.indexOf('canDashboardWorkplace') ?? -1) >= 0,

    can_SysUser_GetPage: (currentUser?.accessList.indexOf('can_SysUser_GetPage') ?? -1) >= 0,
    can_SysUser_Get: (currentUser?.accessList.indexOf('can_SysUser_Get') ?? -1) >= 0,
    can_SysUser_New: (currentUser?.accessList.indexOf('can_SysUser_New') ?? -1) >= 0,
    can_SysUser_Update: (currentUser?.accessList.indexOf('can_SysUser_Update') ?? -1) >= 0,
    can_SysUser_Delete: (currentUser?.accessList.indexOf('can_SysUser_Delete') ?? -1) >= 0,
    can_SysUser_ResetPwd: (currentUser?.accessList.indexOf('can_SysUser_ResetPwd') ?? -1) >= 0,

    can_SysMenu_GetPage: (currentUser?.accessList.indexOf('can_SysMenu_GetPage') ?? -1) >= 0,
    can_SysMenu_Get: (currentUser?.accessList.indexOf('can_SysMenu_Get') ?? -1) >= 0,
    can_SysMenu_New: (currentUser?.accessList.indexOf('can_SysMenu_New') ?? -1) >= 0,
    can_SysMenu_Edit: (currentUser?.accessList.indexOf('can_SysMenu_Edit') ?? -1) >= 0,
    can_SysMenu_Delete: (currentUser?.accessList.indexOf('can_SysMenu_Delete') ?? -1) >= 0,
    can_SysMenu_Child: (currentUser?.accessList.indexOf('can_SysMenu_Child') ?? -1) >= 0,
    can_SysMenu_Copy: (currentUser?.accessList.indexOf('can_SysMenu_Copy') ?? -1) >= 0,

    can_SysRole_GetPage: (currentUser?.accessList.indexOf('can_SysRole_GetPage') ?? -1) >= 0,
    can_SysRole_Get: (currentUser?.accessList.indexOf('can_Role_Get') ?? -1) >= 0,
    can_SysRole_New: (currentUser?.accessList.indexOf('can_SysRole_New') ?? -1) >= 0,
    can_SysRole_Edit: (currentUser?.accessList.indexOf('can_SysRole_Edit') ?? -1) >= 0,
    can_SysRole_Delete: (currentUser?.accessList.indexOf('can_SysRole_Delete') ?? -1) >= 0,

    can_SysPost_GetPage: (currentUser?.accessList.indexOf('can_SysPost_GetPage') ?? -1) >= 0,
    can_SysPost_Get: (currentUser?.accessList.indexOf('can_SysPost_Get') ?? -1) >= 0,
    can_SysPost_New: (currentUser?.accessList.indexOf('can_SysPost_New') ?? -1) >= 0,
    can_SysPost_Edit: (currentUser?.accessList.indexOf('can_SysPost_Edit') ?? -1) >= 0,
    can_SysPost_Delete: (currentUser?.accessList.indexOf('can_SysPost_Delete') ?? -1) >= 0,

    can_SysDept_GetPage: (currentUser?.accessList.indexOf('can_SysDept_GetPage') ?? -1) >= 0,
    can_SysDept_Get: (currentUser?.accessList.indexOf('can_SysDept_Get') ?? -1) >= 0,
    can_SysDept_New: (currentUser?.accessList.indexOf('can_SysDept_New') ?? -1) >= 0,
    can_SysDept_Edit: (currentUser?.accessList.indexOf('can_SysDept_Edit') ?? -1) >= 0,
    can_SysDept_Delete: (currentUser?.accessList.indexOf('can_SysDept_Delete') ?? -1) >= 0,

    can_SysDictType_GetPage:
      (currentUser?.accessList.indexOf('can_SysDictType_GetPage') ?? -1) >= 0,
    can_SysDictType_Get: (currentUser?.accessList.indexOf('can_SysDictType_Get') ?? -1) >= 0,
    can_SysDictType_New: (currentUser?.accessList.indexOf('can_SysDictType_New') ?? -1) >= 0,
    can_SysDictType_Edit: (currentUser?.accessList.indexOf('can_SysDictType_Edit') ?? -1) >= 0,

    can_SysDictData_GetPage:
      (currentUser?.accessList.indexOf('can_SysDictData_GetPage') ?? -1) >= 0,
    can_SysDictData_Get: (currentUser?.accessList.indexOf('can_SysDictData_Get') ?? -1) >= 0,
    can_SysDictData_New: (currentUser?.accessList.indexOf('can_SysDictData_New') ?? -1) >= 0,
    can_SysDictData_Edit: (currentUser?.accessList.indexOf('can_SysDictData_Edit') ?? -1) >= 0,
    can_SysDictData_Delete: (currentUser?.accessList.indexOf('can_SysDictData_Delete') ?? -1) >= 0,

    can_SysConfig_GetPage: (currentUser?.accessList.indexOf('can_SysConfig_GetPage') ?? -1) >= 0,
    can_SysConfig_Get: (currentUser?.accessList.indexOf('can_SysConfig_Get') ?? -1) >= 0,
    can_SysConfig_New: (currentUser?.accessList.indexOf('can_SysConfig_New') ?? -1) >= 0,
    can_SysConfig_Edit: (currentUser?.accessList.indexOf('can_SysConfig_Edit') ?? -1) >= 0,

    can_SysJob_GetPage: (currentUser?.accessList.indexOf('can_SysJob_GetPage') ?? -1) >= 0,
    can_SysJob_Get: (currentUser?.accessList.indexOf('can_SysJob_Get') ?? -1) >= 0,
    can_SysJob_New: (currentUser?.accessList.indexOf('can_SysJob_New') ?? -1) >= 0,
    can_SysJob_Edit: (currentUser?.accessList.indexOf('can_SysJob_Edit') ?? -1) >= 0,
    can_SysJob_Delete: (currentUser?.accessList.indexOf('can_SysJob_Delete') ?? -1) >= 0,
    can_SysJob_Start: (currentUser?.accessList.indexOf('can_SysJob_Start') ?? -1) >= 0,
    can_SysJob_Stop: (currentUser?.accessList.indexOf('can_SysJob_Stop') ?? -1) >= 0,

    can_SysAbnormalLog_GetPage:
      (currentUser?.accessList.indexOf('can_SysAbnormalLog_GetPage') ?? -1) >= 0,
    can_SysAbnormalLog_Get: (currentUser?.accessList.indexOf('can_SysAbnormalLog_Get') ?? -1) >= 0,

    can_SysOperateLog_GetPage:
      (currentUser?.accessList.indexOf('can_SysOperateLog_GetPage') ?? -1) >= 0,
    can_SysOperateLog_Get: (currentUser?.accessList.indexOf('can_SysOperateLog_Get') ?? -1) >= 0,

    can_SysRequestLog_GetPage:
      (currentUser?.accessList.indexOf('can_SysRequestLog_GetPage') ?? -1) >= 0,
    can_SysRequestLog_Get: (currentUser?.accessList.indexOf('can_SysRequestLog_Get') ?? -1) >= 0,

    can_SysApi_GetPage: (currentUser?.accessList.indexOf('can_SysApi_GetPage') ?? -1) >= 0,
    can_SysApi_Get: (currentUser?.accessList.indexOf('can_SysApi_Get') ?? -1) >= 0,
    can_SysApi_Update: (currentUser?.accessList.indexOf('can_SysApi_Update') ?? -1) >= 0,
    can_SysApi_Delete: (currentUser?.accessList.indexOf('can_SysApi_Delete') ?? -1) >= 0,

    can_TbTodo_GetPage: (currentUser?.accessList.indexOf('can_TbTodo_GetPage') ?? -1) >= 0,
    can_TbTodo_Get: (currentUser?.accessList.indexOf('can_TbTodo_Get') ?? -1) >= 0,
    can_TbTodo_New: (currentUser?.accessList.indexOf('can_TbTodo_New') ?? -1) >= 0,
    can_TbTodo_Edit: (currentUser?.accessList.indexOf('can_TbTodo_Edit') ?? -1) >= 0,
    can_TbTodo_Delete: (currentUser?.accessList.indexOf('can_TbTodo_Delete') ?? -1) >= 0,
  };
}

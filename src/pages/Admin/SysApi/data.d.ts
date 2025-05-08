/**
 * SysApi
 * 接口
 */
type SysApiItem = {
  id: number; // 编码
  handle: text; // handle
  name: text; // 名称
  path: text; // 地址
  method: text; // 请求类型
  type: text; // 接口类型
  bus: text; // 业务模块
  project: text; // 项目名称
  isHistory: number; // 是否历史接口
  func: text; // func
  createBy: number; // 创建人
  updateBy: number; // 修改人
  createdAt: Date; // 创建时间
  updatedAt: Date; // 修改时间
  deletedAt: Date; // 删除时间
};

type SysApiPage = RespPage<SysApiItem>;

type SysApiList = RespList<SysApiItem>;

type SysApiGet = RespGet<SysApiItem>;

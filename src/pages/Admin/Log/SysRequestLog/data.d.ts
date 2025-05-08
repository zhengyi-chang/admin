/**
 * SysRequestLog
 * 请求日志
 */
type SysRequestLogItem = {
  id: number; //
  requestMethod: text; // 请求方式
  operName: text; // 操作者
  deptName: text; // 部门名称
  operUrl: text; // 访问地址
  operIp: text; // 客户端ip
  operLocation: text; // 访问位置
  operParam: any; // 请求参数
  operHeaders: any; // 请求Headers
  operTime: any; // 操作时间
  jsonResult: any; // 返回数据
  latencyTime: text; // 耗时
  userAgent: text; // ua
  createdAt: Date; //
  updatedAt: Date; //
  deletedAt: Date; //
  createBy: number; // 创建者
  updateBy: number; // 最后更新者
};

type SysRequestLogList = RespPage<SysRequestLogItem>;

type SysRequestLogGet = RespGet<SysRequestLogItem>;

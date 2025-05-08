/**
 * SysAbnormalLog
 * 异常日志
 */
type SysAbnormalLogItem = {
  abId: number; // 编码
  method: text; // 请求方式
  url: text; // 请求地址
  ip: text; // ip
  abInfo: text; // 异常信息
  abSource: text; // 异常来源
  abFunc: text; // 异常方法
  userId: number; // 用户id
  userName: text; // 操作人
  headers: any; // 请求头
  body: any; // 请求数据
  resp: any; // 回调数据
  stackTrace: text; // 堆栈追踪
  createBy: number; // 创建人
  updateBy: number; // 最后修改人
  createdAt: Date; // 创建时间
  updatedAt: Date; // 最后修改时间
};

type SysAbnormalLogList = RespPage<SysAbnormalLogItem>;

type SysAbnormalLogGet = RespGet<SysAbnormalLogItem>;

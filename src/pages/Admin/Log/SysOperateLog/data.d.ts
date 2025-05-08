/**
 * SysOperateLog
 * 操作日志
 */
type SysOperateLogItem = {
  logId: number; // 编码
  type: text; // 操作类型
  description: text; // 操作说明
  userName: text; // 用户
  userId: number; // 用户id
  updateBefore: any; // 更新前
  updateAfter: any; // 更新后
  createdAt: Date; // 创建时间
};

type SysOperateLogList = RespPage<SysOperateLogItem>;

type SysOperateLogGet = RespGet<SysOperateLogItem>;

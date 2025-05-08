/**
 * SysConfig
 *
 */
type SysConfigItem = {
  id: number; // 主键编码
  configName: text; // 名称
  configKey: text; // 关键字
  configValue: text; // 值
  configType: text; // 类型
  remark: text; // 备注
  createBy: number; // 创建者
  updateBy: number; // 最后更新者
  createdAt: Date; // 创建时间
  updatedAt: Date; // 最后更新时间
  deletedAt: Date; // 删除时间
};

type SysConfigList = RespPage<SysConfigItem>;

type SysConfigGet = RespGet<SysConfigItem>;

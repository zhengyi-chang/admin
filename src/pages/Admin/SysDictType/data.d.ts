/**
 * SysDictType
 *
 */
type SysDictTypeItem = {
  dictId: number; //
  dictName: text; //
  dictType: text; //
  status: text; //
  createBy: number; // 创建者
  updateBy: number; // 最后更新者
  remark: text; //
  createdAt: Date; //
  updatedAt: Date; //
  deletedAt: Date; //
};

type SysDictTypeList = RespList<SysDictTypeItem>;

type SysDictTypeGet = RespGet<SysDictTypeItem>;

/**
 * SysDictData
 *
 */
type SysDictDataItem = {
  dictCode: number; //
  dictSort: number; //
  dictLabel: text; //
  dictValue: text; //
  dictType: text; //
  cssClass: text; //
  listClass: text; //
  isDefault: text; //
  status: text; //
  default: text; //
  createBy: number; // 创建者
  updateBy: number; // 最后更新者
  remark: text; //
  createdAt: Date; //
  updatedAt: Date; //
  deletedAt: Date; //
};

type SysDictDataList = RespList<SysDictDataItem>;

type SysDictDataGet = RespGet<SysDictDataItem>;

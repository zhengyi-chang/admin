type RespPage<T> = {
  data?: T[];
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RespList<T> = {
  data?: { list?: T[] };
  /** 列表的内容总数 */
  total?: number;
  success?: boolean;
};

type RespGet<T> = {
  data?: T;
  success?: boolean;
};

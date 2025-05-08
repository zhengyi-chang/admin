/**
 * SysJob
 *
 */
type SysJobItem = {
  jobId: number; //
  jobName: text; //
  jobGroup: text; //
  jobType: any; //
  cronExpression: text; //
  invokeTarget: text; //
  args: text; //
  misfirePolicy: number; //
  concurrent: any; //
  status: any; //
  entryId: number; //
  createBy: number; //
  updateBy: number; //
  createdAt: Date; //
  updatedAt: Date; //
  deletedAt: Date; //
};

type SysJobList = RespList<SysJobItem>;

type SysJobGet = RespGet<SysJobItem>;

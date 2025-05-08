import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import ProList from '@ant-design/pro-list';
import { Button, Col, message, Row, Tag } from 'antd';
import { FormattedMessage, useIntl, useModel } from 'umi';

import {
  ApiOutlined,
  createFromIconfontCN,
  DeleteOutlined,
  FunctionOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SettingOutlined,
  StopOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import UpdateForm from './componets/UpdateForm';
import {
  sysJob,
  getSysJob,
  addSysJob,
  updateSysJob,
  startSysJob,
  removeSysJob,
  stopSysJob,
} from './service';

import './list.less';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2713835_daepmvl8rp4.js',
    // '//at.alicdn.com/t/font_3418336_n2fh4bof259.js',
    '//at.alicdn.com/t/c/font_2713835_x7ngtq8folo.js',
  ],
});

/**
 *  Select SysJob
 * @zh-CN 查询流程
 *
 * @param id
 */
const handleSysJobGet = async (id: number) => {
  try {
    const resData = await getSysJob(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 *  Start SysJob
 * @zh-CN 开始Job
 *
 * @param id
 */
const handleStartSysJob = async (id: number) => {
  try {
    const resData = await startSysJob(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 *  Stop SysJob
 * @zh-CN 停止Job
 *
 * @param id
 */
const handleStopSysJob = async (id: number) => {
  try {
    const resData = await stopSysJob(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add SysJob
 * @zh-CN 添加Jobs
 * @param fields
 */
const handleSysJobAdd = async (fields: SysJobItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addSysJob({ ...fields });
    if (result.success) {
      hide();
      message.success('添加成功！');
      return true;
    } else {
      hide();
      return false;
    }
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update SysJob
 * @zh-CN 更新Jobs
 *
 * @param fields
 */
const handleSysJobUpdate = async (fields: SysJobItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateSysJob({ ...fields });
    if (result.success) {
      hide();
      message.success('update completed!');
      return true;
    } else {
      hide();
      return false;
    }
  } catch (error) {
    hide();
    message.error('Update failed, please try again!');
    return false;
  }
};

/**
 * @en-US Delete SysJob
 * @zh-CN 删除Jobs
 *
 * @param id
 */
const handleSysJobRemove = async (id: number) => {
  const hide = message.loading('Configuring');
  try {
    const resp = await removeSysJob(id);
    hide();
    if (resp.code === 500) {
      message.error(resp.msg);
    } else {
      message.success('Deleted successfully and will refresh soon');
    }
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const FlowEditer: React.FC = () => {
  const intl = useIntl();

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysJobItem>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer>
      <ProList<SysJobItem, API.PageParams>
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        actionRef={actionRef}
        search={{}}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined />
            <FormattedMessage id="pages.new" defaultMessage="New" />
          </Button>,
        ]}
        rowSelection={{}}
        showActions="hover"
        grid={{ gutter: 24, column: 4, xs: 1, sm: 2, md: 2, lg: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        request={sysJob}
        metas={{
          title: {
            dataIndex: 'jobName',
            title: 'Jobs名称',
            render: (text, row) => [
              <>
                <IconFont style={{ fontSize: '20px', float: 'left' }} type={'jihuarenwu'} />
                <span
                  style={{
                    fontSize: '16px',
                    lineHeight: '30px',
                    height: '30px',
                    paddingLeft: '10px',
                  }}
                >
                  {text}
                </span>
              </>,
            ],
          },
          content: {
            dataIndex: 'remarks',
            search: false,
            render: (text, row) => [
              <>
                <Row>
                  <Col span={24} style={{ fontSize: '12px', fontWeight: '400', color: '#999' }}>
                    执行目标
                  </Col>
                  <Col span={24} style={{ marginTop: '5px' }}>
                    {row.jobType === 1 ? (
                      <Tag icon={<ApiOutlined />} color="purple">
                        接口
                      </Tag>
                    ) : (
                      <Tag icon={<FunctionOutlined />} color="green">
                        函数
                      </Tag>
                    )}
                    {row.invokeTarget}
                  </Col>
                  <Col
                    span={24}
                    style={{ marginTop: '5px', fontSize: '12px', fontWeight: '400', color: '#999' }}
                  >
                    定时规则
                  </Col>
                  <Col span={24} style={{ marginTop: '5px' }}>
                    {row.cronExpression}
                  </Col>
                  <Col span={24} style={{ marginTop: '5px' }}>
                    {row.status === 1 ? <Tag>停用</Tag> : <Tag color="success">可用</Tag>}
                    {row.entryId > 0 ? (
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        运行中
                      </Tag>
                    ) : (
                      <Tag icon={<StopOutlined />}>停止</Tag>
                    )}
                  </Col>
                </Row>
              </>,
            ],
          },
          actions: {
            cardActionProps: 'actions',
            dataIndex: 'jobId',
            render: (text, row) => [
              <>
                {row.entryId === 0 && (
                  <SettingOutlined
                    key={`update` + row.jobId}
                    onClick={() => {
                      handleSysJobGet(row.jobId).then((resp) => {
                        setCurrentRow(resp?.data);
                        handleUpdateModalVisible(true);
                        if (actionRef.current) {
                          actionRef.current.reload();
                        }
                      });
                    }}
                  />
                )}
              </>,
              <>
                {row.entryId === 0 && row.status != 1 && (
                  <>
                    <PlayCircleOutlined
                      key={`start` + row.jobId}
                      onClick={() => {
                        handleStartSysJob(row.jobId).then((resp) => {
                          if (resp?.success) {
                            if (resp?.data?.entryId ?? 0 > 0) {
                              message.success('启动成功');
                            }
                            if (actionRef.current) {
                              actionRef.current.reload();
                            }
                          }
                        });
                      }}
                    />
                  </>
                )}
                {row.entryId > 0 && row.status != 1 && (
                  <StopOutlined
                    key={`stop` + row.jobId}
                    title="停止"
                    onClick={() => {
                      handleStopSysJob(row.jobId).then((resp) => {
                        if (resp?.success) {
                          if (resp?.data?.entryId ?? 0 > 0) {
                            message.success('停止成功');
                          }
                          if (actionRef.current) {
                            actionRef.current.reload();
                          }
                        } else {
                          message.error('停止失败，' + resp.errMsg);
                        }
                      });
                    }}
                  />
                )}
              </>,
              <DeleteOutlined
                key={`delete` + row.jobId}
                onClick={() => {
                  handleSysJobRemove(row.jobId).then((resp) => {
                    if (resp) {
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    }
                  });
                }}
              />,
            ],
            search: false,
          },
        }}
        itemCardProps={{
          bodyStyle: { marginTop: '-12px' },
        }}
        headerTitle="Jobs管理"
      />
      <UpdateForm
        onSubmit={async (value) => {
          if (value.jobId > 0) {
            handleSysJobUpdate(value).then((resp) => {
              if (resp) {
                handleUpdateModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          } else {
            handleSysJobAdd(value).then((resp) => {
              if (resp) {
                handleUpdateModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow?.jobId ? currentRow : { status: 1, jobType: 1 }}
        title={intl.formatMessage({
          id: 'pages.update',
          defaultMessage: 'Update',
        })}
      />
    </PageContainer>
  );
};

export default FlowEditer;

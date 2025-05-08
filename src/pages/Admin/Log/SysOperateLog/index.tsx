import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Select, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { listSysOperateLog, getSysOperateLog, removeSysOperateLog } from './service';

/**
 *  Select SysOperateLog
 * @zh-CN 查询操作日志
 *
 * @param id
 */
const handleSysOperateLogGet = async (id: number) => {
  try {
    const resData = await getSysOperateLog(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Delete SysOperateLog
 * @zh-CN 删除操作日志
 *
 * @param selectedRows
 */
const handleSysOperateLogRemove = async (selectedRows: SysOperateLogItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysOperateLog({
      ids: selectedRows.map((row) => row.logId),
    });
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

const SysOperateLogList: React.FC = () => {
  /**
   * @en-US The pop-up window of update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysOperateLogItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysOperateLogItem[]>([]);
  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SysOperateLogItem>[] = [
    {
      title: <FormattedMessage id="pages.sysOperateLogManage.logId" defaultMessage="logId" />,
      dataIndex: 'logId',
      sorter: true,
      search: false,
      width: 100,
      fixed: 'left',
    },
    {
      title: <FormattedMessage id="pages.sysOperateLogManage.type" defaultMessage="type" />,
      dataIndex: 'type',
      sorter: true,
      search: false,
      width: 140,
      render: (text, record, index) => {
        if (record.type == '新增') {
          return <Tag color="purple">{text}</Tag>;
        }
        if (record.type == '修改') {
          return <Tag color="orange">{text}</Tag>;
        }
        if (record.type == '删除') {
          return <Tag color="red">{text}</Tag>;
        }
        return <Tag color="blue">{text}</Tag>;
      },
    },
    {
      title: (
        <FormattedMessage id="pages.sysOperateLogManage.description" defaultMessage="description" />
      ),
      dataIndex: 'description',
      sorter: true,
      search: false,
      width: 460,
    },
    {
      title: <FormattedMessage id="pages.sysOperateLogManage.userName" defaultMessage="userName" />,
      dataIndex: 'userName',
      sorter: true,
      search: false,
      width: 140,
    },
    {
      title: (
        <FormattedMessage id="pages.sysOperateLogManage.createdAt" defaultMessage="createdAt" />
      ),
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id="pages.sysOperateLogManage.createdAt" defaultMessage="createdAt" />
      ),
      dataIndex: 'createdAt',
      valueType: 'dateRange',
      hideInTable: true,
      width: 80,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: <FormattedMessage id="pages.titleOption" defaultMessage="Operating" />,
      valueType: 'option',
      width: 80,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="view"
          onClick={() => {
            handleSysOperateLogGet(record.logId).then((resData) => {
              if (resData?.success) {
                console.log(resData.data);
                setCurrentRow(resData.data);
                handleUpdateModalVisible(true);
              }
            });
          }}
        >
          <FormattedMessage id="pages.view" defaultMessage="view" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SysOperateLogItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.sysOperateLogManage.title',
          defaultMessage: 'sysOperateLog Manage',
        })}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey={(record) => {
          return record.logId; // 在这里加上一个时间戳就可以了
        }}
        toolBarRender={() => [<></>]}
        request={listSysOperateLog}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleSysOperateLogRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch deletion" />
          </Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value) => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
        title={intl.formatMessage({
          id: 'pages.sysOperateLogManage.updateForm.viewSysOperateLog',
          defaultMessage: 'View SysOperateLog',
        })}
      />
    </PageContainer>
  );
};

export default SysOperateLogList;

import { Button, message, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import UpdateForm from './components/UpdateForm';
import { listSysRequestLog, getSysRequestLog, removeSysRequestLog } from './service';

/**
 *  Select SysRequestLog
 * @zh-CN 查询
 *
 * @param id
 */
const handleSysRequestLogGet = async (id: number) => {
  try {
    const resData = await getSysRequestLog(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Delete SysRequestLog
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleSysRequestLogRemove = async (selectedRows: SysRequestLogItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysRequestLog({
      ids: selectedRows.map((row) => row.id),
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

const RequestLogList: React.FC = () => {
  /**
   * @en-US The pop-up window of update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysRequestLogItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysRequestLogItem[]>([]);

  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SysRequestLogItem>[] = [
    {
      title: <FormattedMessage id="pages.sysRequestLogManage.id" defaultMessage="id" />,
      dataIndex: 'id',
      sorter: true,
      search: false,
      fixed: 'left',
      width: 80,
    },
    {
      title: (
        <FormattedMessage
          id="pages.sysRequestLogManage.requestMethod"
          defaultMessage="requestMethod"
        />
      ),
      dataIndex: 'requestMethod',
      sorter: true,
      search: false,
      width: 100,
      render: (text, record, index) => {
        if (record.requestMethod == 'POST') {
          return <Tag color="purple">{text}</Tag>;
        }
        if (record.requestMethod == 'GET') {
          return <Tag color="blue">{text}</Tag>;
        }
        if (record.requestMethod == 'PUT') {
          return <Tag color="warning">{text}</Tag>;
        }
        return <Tag color="red">{text}</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.sysRequestLogManage.operUrl" defaultMessage="operUrl" />,
      dataIndex: 'operUrl',
      sorter: true,
      search: false,
      width: 450,
    },
    {
      title: (
        <FormattedMessage
          id="pages.sysRequestLogManage.operLocation"
          defaultMessage="operLocation"
        />
      ),
      dataIndex: 'operLocation',
      sorter: true,
      search: false,
      width: 160,
      ellipsis: true,
    },
    {
      title: (
        <FormattedMessage id="pages.sysRequestLogManage.latencyTime" defaultMessage="latencyTime" />
      ),
      dataIndex: 'latencyTime',
      sorter: true,
      search: false,
      width: 140,
      render: (text, record, index) => {
        const t = parseInt(record.latencyTime);
        if (t > 1000) {
          return <Tag color="red">{text}ms</Tag>;
        }
        if (t >= 500 && t < 1000) {
          return <Tag color="orange">{text}ms</Tag>;
        }
        if (t < 500) {
          return <Tag color="green">{text}ms</Tag>;
        }
        return <Tag color="blue">{text}ms</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.sysRequestLogManage.operName" defaultMessage="operName" />,
      dataIndex: 'operName',
      sorter: true,
      search: false,
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.sysRequestLogManage.operTime" defaultMessage="operTime" />,
      dataIndex: 'operTime',
      sorter: true,
      search: false,
      valueType: 'dateTime',
      width: 180,
    },
    {
      title: <FormattedMessage id="pages.sysRequestLogManage.operTime" defaultMessage="operTime" />,
      dataIndex: 'operTime',
      valueType: 'dateRange',
      hideInTable: true,
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
            handleSysRequestLogGet(record.id).then((resData) => {
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
      <ProTable<SysRequestLogItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.sysRequestLogManage.title',
          defaultMessage: 'sysRequestLog Manage',
        })}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey={(record) => {
          return String(record.id) + record.updatedAt; // 在这里加上一个时间戳就可以了
        }}
        toolBarRender={() => [<></>]}
        request={listSysRequestLog}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar>
          <Button
            onClick={async () => {
              await handleSysRequestLogRemove(selectedRowsState);
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
          id: 'pages.sysRequestLogManage.updateForm.viewSysRequestLog',
          defaultMessage: 'View SysRequestLog',
        })}
      />
    </PageContainer>
  );
};

export default RequestLogList;

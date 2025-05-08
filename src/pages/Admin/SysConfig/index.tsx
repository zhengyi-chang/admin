import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  listSysConfig,
  getSysConfig,
  addSysConfig,
  updateSysConfig,
  removeSysConfig,
} from './service';

/**
 *  Select SysConfig
 * @zh-CN 查询
 *
 * @param id
 */
const handleSysConfigGet = async (id: number) => {
  try {
    const resData = await getSysConfig(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add SysConfig
 * @zh-CN 添加
 * @param fields
 */
const handleSysConfigAdd = async (fields: SysConfigItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addSysConfig({ ...fields });
    if (result.success) {
      hide();
      message.success('Adding success!');
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
 * @en-US Update SysConfig
 * @zh-CN 更新
 *
 * @param fields
 */
const handleSysConfigUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateSysConfig({ ...fields });
    if (result.success) {
      hide();
      message.success('Update success!');
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
 * @en-US Delete SysConfig
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleSysConfigRemove = async (selectedRows: SysConfigItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysConfig({
      ids: selectedRows.map((row) => row.id),
    });
    if (resp.success) {
      hide();
      message.success('Delete success!');
      return true;
    } else {
      hide();
      return false;
    }
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const SysConfigList: React.FC = () => {
  /**
   * @en-US Pop-up window of new/update window
   * @zh-CN 新建/更新窗口的弹窗
   *  */
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysConfigItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysConfigItem[]>([]);
  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SysConfigItem>[] = [
    {
      title: <FormattedMessage id="pages.sysConfigManage.configName" defaultMessage="configName" />,
      dataIndex: 'configName',
      sorter: true,
      search: false,
      ellipsis: true,
      width: 140,
      fixed: 'left',
    },
    {
      title: <FormattedMessage id="pages.sysConfigManage.configKey" defaultMessage="configKey" />,
      dataIndex: 'configKey',
      sorter: true,
      search: false,
      ellipsis: true,
      copyable: true,
      fixed: 'left',
    },
    {
      title: (
        <FormattedMessage id="pages.sysConfigManage.configValue" defaultMessage="configValue" />
      ),
      dataIndex: 'configValue',
      sorter: true,
      search: false,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.sysConfigManage.configType" defaultMessage="configType" />,
      dataIndex: 'configType',
      sorter: true,
      search: false,
      width: 140,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.sysConfigManage.remark" defaultMessage="remark" />,
      dataIndex: 'remark',
      sorter: true,
      search: false,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.createdAt" defaultMessage="createdAt" />,
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.createdAt" defaultMessage="createdAt" />,
      dataIndex: 'createdAt',
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
          key="update"
          onClick={() => {
            handleSysConfigGet(record.id).then((resData) => {
              if (resData?.success) {
                console.log(resData.data);
                setCurrentRow(resData.data);
                handleModalVisible(true);
              }
            });
          }}
        >
          <FormattedMessage id="pages.update" defaultMessage="update" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SysConfigItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.sysConfigManage.title',
          defaultMessage: 'sysConfig Manage',
        })}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey={(record) => {
          return String(record.id) + record.updatedAt; // 在这里加上一个时间戳就可以了
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />
            <FormattedMessage id="pages.new" defaultMessage="New" />
          </Button>,
        ]}
        request={listSysConfig}
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
              await handleSysConfigRemove(selectedRowsState);
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
          console.log(value);
          if (value.id != undefined && value.id != 0) {
            handleSysConfigUpdate(value).then((resp) => {
              if (resp) {
                handleModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          } else {
            const success = await handleSysConfigAdd(value as SysConfigItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={modalVisible}
        values={currentRow || {}}
        title={
          currentRow
            ? intl.formatMessage({
                id: 'pages.update',
                defaultMessage: 'Update SysConfig',
              })
            : intl.formatMessage({
                id: 'pages.new',
                defaultMessage: 'New SysConfig',
              })
        }
      />
    </PageContainer>
  );
};

export default SysConfigList;

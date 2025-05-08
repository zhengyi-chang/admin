import { Alert, Button, message, Popover, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { listSysApi, getSysApi, addSysApi, updateSysApi, removeSysApi } from './service';

/**
 *  Select SysApi
 * @zh-CN 查询接口
 *
 * @param id
 */
const handleSysApiGet = async (id: number) => {
  try {
    const resData = await getSysApi(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add SysApi
 * @zh-CN 添加接口
 * @param fields
 */
const handleSysApiAdd = async (fields: SysApiItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addSysApi({ ...fields });
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
 * @en-US Update SysApi
 * @zh-CN 更新接口
 *
 * @param fields
 */
const handleSysApiUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateSysApi({ ...fields });
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
    message.error('Update User failed, please try again!');
    return false;
  }
};

/**
 * @en-US Delete SysApi
 * @zh-CN 删除接口
 *
 * @param selectedRows
 */
const handleSysApiRemove = async (selectedRows: SysApiItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysApi({
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

const SysApiList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysApiItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysApiItem[]>([]);

  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SysApiItem>[] = [
    {
      title: <FormattedMessage id="pages.sysApiManage.name" defaultMessage="name" />,
      dataIndex: 'name',
      sorter: true,
      search: false,
      width: 320,
      fixed: 'left',
      render: (text, record, index) => {
        if (record.type == 'SYS') {
          return (
            <>
              <Tag color="purple">{record.type}</Tag>
              {text}
            </>
          );
        } else if (record.type == 'BUS') {
          return (
            <>
              <Tag color="blue">{record.type}</Tag>
              {text}
            </>
          );
        } else {
          return (
            <>
              <Tag color="gold">暂无</Tag>
              {text}
            </>
          );
        }
      },
    },
    {
      title: <FormattedMessage id="pages.sysApiManage.project" defaultMessage="project" />,
      dataIndex: 'project',
      sorter: true,
      search: false,
      width: 100,
    },
    {
      title: <FormattedMessage id="pages.sysApiManage.bus" defaultMessage="bus" />,
      dataIndex: 'bus',
      sorter: true,
      search: false,
      width: 120,
    },
    {
      title: <FormattedMessage id="pages.sysApiManage.func" defaultMessage="func" />,
      dataIndex: 'func',
      sorter: true,
      search: false,
      width: 180,
    },
    {
      title: <FormattedMessage id="pages.sysApiManage.isHistory" defaultMessage="isHistory" />,
      dataIndex: 'isHistory',
      sorter: true,
      valueType: 'select',
      request: async () => {
        return [
          { label: '历史', value: 1 },
          { label: '正常', value: 0 },
        ];
      },
      width: 100,
      render: (text, record, index) => {
        if (record.isHistory == 1) {
          return <Tag color="red">历史</Tag>;
        } else return <Tag color="blue">正常</Tag>;
      },
      tooltip: '历史接口是指本次项目启动如果使用了`-a`指令被标记的没有加载的接口',
    },
    {
      title: <FormattedMessage id="pages.sysApiManage.path" defaultMessage="path" />,
      dataIndex: 'path',
      sorter: true,
      render: (text, record, index) => {
        let typeX = <Tag color="purple">{record.type}</Tag>;
        if (record.type == 'SYS') {
          typeX = (
            <>
              <Tag color="purple">{record.type}</Tag>
            </>
          );
        } else if (record.type == 'BUS') {
          typeX = (
            <>
              <Tag color="blue">{record.type}</Tag>
            </>
          );
        } else {
          typeX = (
            <>
              <Tag color="gold">暂无</Tag>
            </>
          );
        }

        let isHistoryX = (
          <>
            <Tag color="purple">历史接口</Tag>
            <Tag color="red">历史</Tag>
          </>
        );
        if (record.isHistory) {
          isHistoryX = (
            <>
              <Tag color="purple">历史接口</Tag>
              <Tag color="red">历史</Tag>
            </>
          );
        } else
          isHistoryX = (
            <>
              <Tag color="purple">历史接口</Tag>
              <Tag color="blue">正常</Tag>
            </>
          );
        let pathX = (
          <div>
            <Tag color="purple">{record.method}</Tag>
            {record.path}
          </div>
        );
        if (record.method == 'POST') {
          pathX = (
            <div>
              <Tag color="purple">{record.method}</Tag>
              {record.path}
            </div>
          );
        }
        if (record.method == 'GET') {
          pathX = (
            <div>
              <Tag color="blue">{record.method}</Tag>
              {record.path}
            </div>
          );
        }
        if (record.method == 'PUT') {
          pathX = (
            <div>
              <Tag color="warning">{record.method}</Tag>
              {record.path}
            </div>
          );
        }
        if (record.method == 'DELETE') {
          pathX = (
            <div>
              <Tag color="red">{record.method}</Tag>
              {record.path}
            </div>
          );
        }
        const content = (
          <div>
            <p>
              {typeX}
              {record.name == '' ? '-' : record.name}
            </p>
            <p>
              <Tag color="geekblue">{record.project == '' ? '暂无' : record.project}</Tag>
              <Tag color="lime">{record.bus == '' ? '暂无' : record.bus}</Tag>
              <Tag color="cyan">{record.func == '' ? '暂无' : record.func}</Tag>
            </p>
            <p>{pathX}</p>
            <p>{isHistoryX}</p>
            <p>
              <Tag color="green">Handle</Tag>
              {record.handle}
            </p>
          </div>
        );
        const ret = (
          <Popover content={content} title="详情" trigger="hover">
            {pathX}
          </Popover>
        );
        return <>{ret}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.createdAt" defaultMessage="createdAt" />,
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
      width: 120,
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
            handleSysApiGet(record.id).then((resData) => {
              if (resData?.success) {
                console.log(resData.data);
                setCurrentRow(resData.data);
                handleUpdateModalVisible(true);
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
    <PageContainer
      content={
        <Alert
          message="接口管理中的数据，需要在启动时使用`-a`指令，系统会自动添加到该列表中。"
          type="info"
          showIcon
        />
      }
    >
      <ProTable<SysApiItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.sysApiManage.title',
          defaultMessage: 'sysApi Manage',
        })}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey={(record) => {
          return record.id; // 在这里加上一个时间戳就可以了
        }}
        toolBarRender={() => []}
        request={listSysApi}
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
              await handleSysApiRemove(selectedRowsState);
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
          const success = await handleSysApiAdd(value as SysApiItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={createModalVisible}
        values={{}}
        title={intl.formatMessage({
          id: 'pages.sysApiManage.createForm.newSysApi',
          defaultMessage: 'New SysApi',
        })}
      />
      <UpdateForm
        onSubmit={async (value) => {
          handleSysApiUpdate(value).then((resp) => {
            if (resp) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          });
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
        title={intl.formatMessage({
          id: 'pages.update',
          defaultMessage: 'Update',
        })}
      />
    </PageContainer>
  );
};

export default SysApiList;

import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Select, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { dept, getDept, addDept, updateDept, removeDept } from '@/services/ant-design-pro/dept';

/**
 *  Select Dept
 * @zh-CN 查询岗位
 *
 * @param id
 */
const handleDeptGet = async (id: number) => {
  try {
    const resData = await getDept(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add Dept
 * @zh-CN 添加岗位
 * @param fields
 */
const handleDeptAdd = async (fields: API.Dept) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addDept({ ...fields });
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
 * @en-US Update Dept
 * @zh-CN 更新岗位
 *
 * @param fields
 */
const handleDeptUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateDept({ ...fields });
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
 * @en-US Delete Dept
 * @zh-CN 删除岗位
 *
 * @param selectedRows
 */
const handleDeptRemove = async (selectedRows: API.DeptListItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeDept({
      ids: selectedRows.map((row) => row.deptId),
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

const fetchDeptSelect = async (e: {
  (value: React.SetStateAction<{}[] | undefined>): void;
  (arg0: {}[]): void;
}) => {
  const res: {}[] = [];
  try {
    const deptSelectOption = await dept({});
    deptSelectOption.data?.map((item) => {
      const temp = {};
      temp.label = item.deptName;
      temp.value = item.deptId;
      temp.children = deptCall(item.children);
      res.push(temp);
    });
  } catch (error) {
    console.log('UpdateForm.tsx:75', error);
  }
  const all: {}[] = [];
  const temp = {
    label: '',
    value: 0,
    children: [],
  };
  temp.label = '根节点';
  temp.value = 0;
  temp.children = res;
  all.push(temp);
  e(all);
};

const deptCall = (list?: API.DeptListItem[]) => {
  const res: {}[] = [];
  list?.map((item) => {
    const temp = {
      label: '',
      value: 0,
      children: [],
    };
    temp.label = item.deptName;
    temp.value = item.deptId;
    temp.children = deptCall(item.children);
    res.push(temp);
  });
  return res;
};

const DeptList: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.DeptListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.DeptListItem[]>([]);
  const [treeOptionData, setTreeOptionData] = useState<{}[] | undefined>([]);

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    fetchDeptSelect(setTreeOptionData);
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.DeptListItem>[] = [
    {
      title: <FormattedMessage id="pages.deptManage.deptId" defaultMessage="Id" />,
      dataIndex: 'deptId',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.deptManage.deptName" defaultMessage="deptName" />,
      dataIndex: 'deptName',
      valueType: 'text',
      tooltip: 'deptName',
    },
    {
      title: <FormattedMessage id="pages.deptManage.sort" defaultMessage="sort" />,
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.deptManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInSearch: true,
      render: (text, record, index) => {
        if (text == '2') return <Tag color="success">正常</Tag>;
        return <Tag color="red">停用</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.deptManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInTable: true,
      // valueType: 'select',
      // options: {{ initialState?.normalDisableSelectOption }},
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        return (
          <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            options={initialState?.normalDisableSelectOption}
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.deptManage.createdAt" defaultMessage="createdAt" />,
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.deptManage.createdAt" defaultMessage="createdAt" />,
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
      width: 'md',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleDeptGet(record.deptId).then((resData) => {
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
    <PageContainer>
      <ProTable<API.DeptListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.deptManage.title',
          defaultMessage: 'dept Manage',
        })}
        actionRef={actionRef}
        rowKey={(record) => {
          return String(record.deptId) + record.updatedAt; // 在这里加上一个时间戳就可以了
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
        request={dept}
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
              await handleDeptRemove(selectedRowsState);
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
          const success = await handleDeptAdd(value as API.Dept);
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
        values={{ status: '2', sort: 999 }}
        treeData={treeOptionData}
        title={intl.formatMessage({
          id: 'pages.deptManage.createForm.newDept',
          defaultMessage: 'New Dept',
        })}
      />
      <UpdateForm
        onSubmit={async (value) => {
          handleDeptUpdate(value).then((resp) => {
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
        treeData={treeOptionData}
        title={intl.formatMessage({
          id: 'pages.deptManage.updateForm.updateDept',
          defaultMessage: 'Update Dept',
        })}
      />
    </PageContainer>
  );
};

export default DeptList;

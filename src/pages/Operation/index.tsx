import {
  addMenu,
  getMenu,
  menu,
  removeMenu,
  updateMenu,
} from '@/services/ant-design-pro/operation';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl, useModel } from 'umi';
import GiftBoxForm from './components/GiftBoxForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 *  Select Menu
 * @zh-CN 查询菜单
 *
 * @param id
 */
const handleMenuGet = async (id: number) => {
  try {
    const resData = await getMenu(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add Menu
 * @zh-CN 添加菜单
 * @param fields
 */
const handleMenuAdd = async (fields: API.OperationListItem) => {
  const hide = message.loading('Configuring');
  try {
    await addMenu({ ...fields });
    message.success('Added successfully');
    return true;
  } catch (error) {
    message.error('Adding failed, please try again!');
    return false;
  } finally {
    hide();
  }
};

/**
 * @en-US Update Menu
 * @zh-CN 更新菜单
 *
 * @param fields
 */
const handleMenuUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateMenu({ ...fields });
    if (result) {
      message.success('update completed!');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    message.error('更新失败,请重试!');
    return false;
  } finally {
    hide();
  }
};

/**
 * @en-US Delete Menu
 * @zh-CN 删除岗位
 *
 * @param selectedRows
 */
const handleMenuRemove = async (selectedRows: API.OperationListItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeMenu({
      ids: selectedRows.map((row) => row.menuId),
    });
    if (resp.code === 500) {
      message.error(resp.msg);
    } else {
      message.success('Deleted successfully and will refresh soon');
    }
    return true;
  } catch (error) {
    message.error('Delete failed, please try again');
    return false;
  } finally {
    hide();
  }
};

interface TreeOption {
  label: string;
  value: number;
  children?: TreeOption[];
}

const menuCall = (list?: API.OperationListItem[]) => {
  const res: TreeOption[] = [];
  list?.map((item) => {
    const temp: TreeOption = {
      label: item.title,
      value: item.menuId,
      children: menuCall(item.children),
    };
    res.push(temp);
  });
  return res;
};

const fetchMenuSelect = async (
  setStateCallback: React.Dispatch<React.SetStateAction<TreeOption[] | undefined>>,
) => {
  const res: TreeOption[] = [];
  try {
    const deptSelectOption = await menu({});
    deptSelectOption.data?.map((item) => {
      const temp: TreeOption = {
        label: item.title,
        value: item.menuId,
        children: menuCall(item.children),
      };
      res.push(temp);
    });
  } catch (error) {
    console.log('UpdateForm.tsx:75', error);
  }
  const all: TreeOption[] = [];
  const temp: TreeOption = {
    label: '根目录',
    value: 0,
    children: res,
  };
  all.push(temp);
  setStateCallback(all);
};

const MenuList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [giftBoxModalVisible, handleGiftBoxModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.OperationListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.OperationListItem[]>([]);
  const [treeOptionData, setTreeOptionData] = useState<TreeOption[] | undefined>([]);
  const [giftBoxData, setGiftBoxData] = useState<API.OperationListItem[]>([]);

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    fetchMenuSelect(setTreeOptionData);
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.OperationListItem>[] = [
    {
      title: <FormattedMessage id="pages.operationManage.id" defaultMessage="id" />,
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.operationManage.name" defaultMessage="name" />,
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.operationManage.type" defaultMessage="type" />,
      dataIndex: 'type',
      valueType: 'select',
      renderFormItem: (_item, { type: _type, defaultRender: _defaultRender, ..._rest }, _form) => {
        return (
          <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            options={initialState?.showHideSelectOption}
          />
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.operationManage.description" defaultMessage="description" />
      ),
      dataIndex: 'description',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.operationManage.link" defaultMessage="link" />,
      dataIndex: 'link',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.operationManage.point" defaultMessage="point" />,
      dataIndex: 'point',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.operationManage.sort" defaultMessage="sort" />,
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.operationManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      // hideInTable: true,
      valueType: 'select',
      renderFormItem: (_item, { type: _type, defaultRender: _defaultRender, ..._rest }, _form) => {
        return (
          <Select
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            options={initialState?.showHideSelectOption}
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.titleOption" defaultMessage="Operating" />,
      dataIndex: 'menuId',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        // <a
        //   key="copy"
        //   onClick={() => {
        //     record.menuId = 0;
        //     setCurrentRow(record);
        //     handleUpdateModalVisible(true);
        //   }}
        // >
        //   <FormattedMessage id="pages.copy" defaultMessage="Copy" />
        // </a>,
        <a
          key="status"
          onClick={() => {
            record.status = !record.status;
            setCurrentRow(record);
            // handleUpdateModalVisible(true);
          }}
        >
          <FormattedMessage id="pages.status" defaultMessage={record.status ? 'start' : 'stop'} />
        </a>,
        <a
          key="update"
          onClick={() => {
            handleMenuGet(record.menuId).then((resData) => {
              if (resData?.success) {
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
      <ProTable<API.OperationListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.operationManage.table.title',
          defaultMessage: 'Operation Manage',
        })}
        actionRef={actionRef}
        rowKey={(record) => {
          return String(record.menuId); // 在这里加上一个时间戳就可以了
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
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleGiftBoxModalVisible(true);
            }}
          >
            <PlusOutlined />
            gift box settings
          </Button>,
        ]}
        request={menu}
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
              await handleMenuRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
              fetchMenuSelect(setTreeOptionData);
            }}
          >
            <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch deletion" />
          </Button>
        </FooterToolbar>
      )}

      <GiftBoxForm
        treeData={giftBoxData}
        onSubmit={async (value) => {
          // const success = await handleMenuAdd(value as API.OperationListItem);
          // if (success) {
          handleGiftBoxModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          //   fetchMenuSelect(setTreeOptionData);
          // }
        }}
        onCancel={() => {
          handleGiftBoxModalVisible(false);
          // setCurrentRow(undefined);
        }}
        updateModalVisible={giftBoxModalVisible}
        values={{}}
        title={intl.formatMessage({
          id: 'pages.operationManage.createForm.new',
          defaultMessage: 'New',
        })}
      />
      <UpdateForm
        treeData={treeOptionData}
        onSubmit={async (value) => {
          const success = await handleMenuAdd(value as API.OperationListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            fetchMenuSelect(setTreeOptionData);
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={createModalVisible}
        values={{}}
        title={intl.formatMessage({
          id: 'pages.operationManage.createForm.new',
          defaultMessage: 'New',
        })}
      />
      <UpdateForm
        treeData={treeOptionData}
        onSubmit={async (value) => {
          const model = value as API.OperationListItem;
          if (model.menuId == undefined) {
            const success = await handleMenuAdd(model);
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
              fetchMenuSelect(setTreeOptionData);
            }
          } else {
            handleMenuUpdate(value).then((resp) => {
              if (resp) {
                handleUpdateModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
                fetchMenuSelect(setTreeOptionData);
              }
            });
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
        title={intl.formatMessage({
          id: 'pages.operationManage.updateForm.update',
          defaultMessage: 'Update',
        })}
      />
    </PageContainer>
  );
};

export default MenuList;

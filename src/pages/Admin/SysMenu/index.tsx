import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Select, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { menu, getMenu, addMenu, updateMenu, removeMenu } from '@/services/ant-design-pro/menu';

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
const handleMenuAdd = async (fields: API.Menu) => {
  const hide = message.loading('Configuring');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
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
    message.error('更新失败,请重试!');
    return false;
  }
};

/**
 * @en-US Delete Menu
 * @zh-CN 删除岗位
 *
 * @param selectedRows
 */
const handleMenuRemove = async (selectedRows: API.MenuListItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeMenu({
      ids: selectedRows.map((row) => row.menuId),
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

const fetchMenuSelect = async (e: {
  (value: React.SetStateAction<{}[] | undefined>): void;
  (arg0: {}[]): void;
}) => {
  const res: {}[] = [];
  try {
    const deptSelectOption = await menu({});
    deptSelectOption.data?.map((item) => {
      const temp = {};
      temp.label = item.title;
      temp.value = item.menuId;
      temp.children = menuCall(item.children);
      res.push(temp);
    });
  } catch (error) {
    console.log('UpdateForm.tsx:75', error);
  }
  const all: {}[] = [];
  const temp = {};
  temp.label = '根目录';
  temp.value = 0;
  temp.children = res;
  all.push(temp);
  e(all);
};

const menuCall = (list?: API.MenuListItem[]) => {
  const res: {}[] = [];
  list?.map((item) => {
    const temp = {};
    temp.label = item.title;
    temp.value = item.menuId;
    temp.children = menuCall(item.children);
    res.push(temp);
  });
  return res;
};

const MenuList: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.MenuListItem[]>([]);
  const [treeOptionData, setTreeOptionData] = useState<{}[] | undefined>([]);

  const { initialState } = useModel('@@initialState');

  useEffect(() => {
    fetchMenuSelect(setTreeOptionData);
  }, []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: <FormattedMessage id="pages.menuManage.menuName" defaultMessage="title" />,
      dataIndex: 'menuName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.menuManage.title" defaultMessage="title" />,
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.menuManage.permission" defaultMessage="permission" />,
      dataIndex: 'permission',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.menuManage.sort" defaultMessage="sort" />,
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.menuManage.visible" defaultMessage="visible" />,
      dataIndex: 'visible',
      hideInSearch: true,
      render: (text, record, index) => {
        if (text == '0') return <Tag color="success">显示</Tag>;
        return <Tag color="red">隐藏</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.menuManage.visible" defaultMessage="visible" />,
      dataIndex: 'visible',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
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
      title: <FormattedMessage id="pages.menuManage.menuType" defaultMessage="menuType" />,
      dataIndex: 'menuType',
      hideInSearch: true,
      valueType: 'select',
      render: (text, record, index) => {
        if (record.menuType == 'M') {
          return <Tag color="purple">目录</Tag>;
        }
        if (record.menuType == 'C') {
          return <Tag color="warning">菜单</Tag>;
        }
        return <Tag color="blue">按钮</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.menuManage.createdAt" defaultMessage="createdAt" />,
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.menuManage.createdAt" defaultMessage="createdAt" />,
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
      dataIndex: 'menuId',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <a
          key="new children"
          onClick={() => {
            const item: API.MenuListItem = {
              children: [],
              component: '',
              createdAt: undefined,
              dataScope: '',
              icon: '',
              isFrame: '',
              visible: false,
              menuId: 0,
              menuName: '',
              menuType: '',
              parentId: record.menuId,
              path: '',
              paths: '',
              permission: '',
              sort: 999,
              sysApi: [],
              title: '',
            };
            setCurrentRow(item);
            handleUpdateModalVisible(true);
          }}
        >
          <FormattedMessage id="pages.menuManage.newChildren" defaultMessage="New Children" />
        </a>,
        <a
          key="copy"
          onClick={() => {
            record.menuId = 0;
            setCurrentRow(record);
            handleUpdateModalVisible(true);
          }}
        >
          <FormattedMessage id="pages.copy" defaultMessage="Copy" />
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
      <ProTable<API.MenuListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.menuManage.table.title',
          defaultMessage: 'Menu Manage',
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
      <UpdateForm
        treeData={treeOptionData}
        onSubmit={async (value) => {
          const success = await handleMenuAdd(value as API.MenuListItem);
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
          id: 'pages.menuManage.createForm.newMenu',
          defaultMessage: 'New Menu',
        })}
      />
      <UpdateForm
        treeData={treeOptionData}
        onSubmit={async (value) => {
          const model = value as API.MenuListItem;
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
          id: 'pages.menuManage.updateForm.updateMenu',
          defaultMessage: 'Update Menu',
        })}
      />
    </PageContainer>
  );
};

export default MenuList;

import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Switch, TreeSelect, Select, Tree, Row, Col, Spin } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel, useAccess, Access, useRequest } from 'umi';
import { ProTable, PageContainer, FooterToolbar, GridContent } from '@ant-design/pro-components';
import type { ProColumns, ActionType, ProFormInstance } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import {
  user,
  getUser,
  addUser,
  updateUser,
  resetPasswordUser,
  updateStatusUser,
  removeUser,
} from '@/services/ant-design-pro/user';
import {
  optionRoleSelect,
  optionDeptSelect,
  optionPostSelect,
} from '@/services/ant-design-pro/api';
import e from 'express';

/**
 *  Select User
 * @zh-CN 查询用户
 *
 * @param id
 */
const handleUserGet = async (id: number) => {
  try {
    const resData = await getUser(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add User
 * @zh-CN 添加用户
 * @param fields
 */
const handleUserAdd = async (fields: API.User) => {
  const hide = message.loading('Configuring...');
  try {
    const result = await addUser({ ...fields });
    if (result.success) {
      hide();
      message.success('添加成功!');
      return true;
    } else {
      hide();
      return false;
    }
  } catch (error) {
    hide();
    message.error('创建失败, 请重新尝试!');
    return false;
  }
};

/**
 * @en-US Update User
 * @zh-CN 更新用户
 *
 * @param fields
 */
const handleUserUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在修改...');
  try {
    const result = await updateUser({ ...fields });
    hide();
    if (result.success) {
      message.success('修改成功!');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('更新失败, 请重新尝试!');
    return false;
  }
};

/**
 * @en-US Update User Status
 * @zh-CN 更新用户状态
 *
 * @param fields
 */
const handleUserStatusUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新...');
  try {
    const result = await updateStatusUser({ ...fields });
    hide();
    if (result.success) {
      message.success('用户状态更新成功!');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('用户状态更新失败, 请重新尝试!');
    return false;
  }
};

/**
 * @en-US Update Reset User Password
 * @zh-CN 更新重置用户密码
 *
 * @param fields
 */
const handleResetPasswordUser = async (fields: FormValueType) => {
  const hide = message.loading('正在更新...');
  try {
    const result = await resetPasswordUser({ ...fields });
    hide();
    if (result.success) {
      message.success('密码重置成功!');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('密码重置失败, 请重新尝试!');
    return false;
  }
};

/**
 * @en-US Delete User
 * @zh-CN 删除用户
 *
 * @param selectedRows
 */
const handleUserRemove = async (selectedRows: API.UserListItem[]) => {
  const hide = message.loading('Configuring...');
  if (!selectedRows) return true;
  try {
    const resp = await removeUser({
      ids: selectedRows.map((row) => row.userId),
    });
    hide();
    if (resp.code === 500) {
      message.error(resp.msg);
    } else {
      message.success('删除成功,请刷新页面!');
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败, 请重新尝试!');
    return false;
  }
};

const fetchDeptSelect = async (e: {
  (value: React.SetStateAction<{}[] | undefined>): void;
  (arg0: {}[]): void;
}) => {
  const res: {}[] = [];
  try {
    const deptSelectOption = await optionDeptSelect();
    deptSelectOption.data?.map((item) => {
      const temp = { label: '', value: '', children: [{}] };
      temp.label = item.label;
      temp.value = item.value;
      temp.children = deptCall(item.children);
      res.push(temp);
    });
  } catch (error) {
    console.log('UpdateForm.tsx:75', error);
  }
  e(res);
};

const deptCall = (list?: API.TreeItem[]) => {
  const res: {}[] = [];
  list?.map((item) => {
    const temp = { label: '', value: '', children: [{}] };
    temp.label = item.label;
    temp.value = item.value;
    temp.children = deptCall(item.children);
    res.push(temp);
  });
  return res;
};

const fetchPostSelect = async (e: {
  (value: React.SetStateAction<{}[] | undefined>): void;
  (arg0: {}[]): void;
}) => {
  let res: {}[] = [];
  try {
    const postSelectOption = await optionPostSelect();
    res = postSelectOption.data;
  } catch (error) {
    console.log('UpdateForm.tsx:65', error);
  }
  e(res);
};

const fetchRoleSelect = async (e: {
  (value: React.SetStateAction<{}[] | undefined>): void;
  (arg0: {}[]): void;
}) => {
  let res: {}[] = [];

  try {
    const roleSelectOption = await optionRoleSelect();
    res = roleSelectOption.data;
  } catch (error) {
    console.log('UpdateForm.tsx:65', error);
  }
  e(res);
};

const UserList: React.FC = () => {
  /**
   * @en-US Pop-up window of new/update window
   * @zh-CN 新建/更新窗口的弹窗
   *  */
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  /**
   * @en-US The pop-up window of reset password window
   * @zh-CN 重置密码窗口的弹窗
   * */
  const [resetPasswordVisible, handleResetPasswordVisible] = useState<boolean>(false);

  const ref = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();

  const [readonly, setReadonly] = useState<boolean>(false);
  const [selectedRowsState, setSelectedRows] = useState<API.UserListItem[]>([]);
  const [treeOptionData, setTreeOptionData] = useState<{}[] | undefined>([]);
  const [roleSelectOption, setRoleSelectOption] = useState<{}[] | undefined>([]);
  const [postSelectOption, setPostSelectOption] = useState<{}[] | undefined>([]);

  const { initialState } = useModel('@@initialState');
  const access = useAccess();

  useEffect(() => {
    fetchDeptSelect(setTreeOptionData);
    fetchRoleSelect(setRoleSelectOption);
    fetchPostSelect(setPostSelectOption);
  }, []);

  const onSelect = (selectedKeys: any[]) => {
    if (ref.current) {
      ref.current.setFieldsValue({
        deptId: selectedKeys[0],
      });
      ref.current.submit();
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchUser.userId" defaultMessage="Id" />,
      dataIndex: 'userId',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.searchUser.username" defaultMessage="Username" />,
      dataIndex: 'username',
      valueType: 'text',
      tooltip: '账号登录名',
    },
    {
      title: <FormattedMessage id="pages.searchUser.nickName" defaultMessage="nickName" />,
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchUser.phone" defaultMessage="Phone" />,
      dataIndex: 'phone',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchUser.deptName" defaultMessage="deptName" />,
      dataIndex: 'deptName',
      hideInSearch: true,
      render: (text, record) => {
        return record.dept?.deptName;
      },
    },
    {
      title: <FormattedMessage id="pages.searchUser.deptName" defaultMessage="deptName" />,
      dataIndex: 'deptId',
      hideInTable: true,
      renderFormItem: () => {
        return (
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeOptionData}
            treeDefaultExpandAll
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchUser.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInSearch: true,
      sorter: true,
      render: (text, record) => {
        let bl = false;
        if (text == '2') bl = true;
        return (
          <Switch
            checkedChildren="正常"
            unCheckedChildren="停用"
            defaultChecked={bl}
            disabled={record.username !== 'admin' ? false : true}
            onChange={(checked: boolean, event: Event) => {
              if (checked) record.status = '2';
              else record.status = '1';
              handleUserStatusUpdate(record).then((resData) => {
                if (resData && actionRef.current) {
                  actionRef.current.reload();
                }
              });
            }}
          />
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchUser.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: () => {
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
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
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
      title: <FormattedMessage id="pages.searchUser.titleOption" defaultMessage="Operating" />,
      valueType: 'option',
      // width: 150,
      render: (_, record) => [
        <Access
          key={'view'}
          accessible={access.can_SysUser_Get}
          fallback={<div key="can_SysUser_Get" />}
        >
          <a
            key="view"
            onClick={() => {
              handleUserGet(record.userId).then((resData) => {
                if (resData?.success) {
                  setCurrentRow(resData.data);
                  setReadonly(true);
                  handleModalVisible(true);
                }
              });
            }}
          >
            <FormattedMessage id="pages.view" defaultMessage="view" />
          </a>
        </Access>,
        record.username !== 'admin' && (
          <Access
            accessible={access.can_SysUser_Update}
            fallback={<div key="can_SysUser_Update" />}
          >
            <a
              key="update"
              onClick={() => {
                handleUserGet(record.userId).then((resData) => {
                  if (resData?.success) {
                    setCurrentRow(resData.data);
                    handleModalVisible(true);
                  }
                });
              }}
            >
              <FormattedMessage id="pages.searchUser.update" defaultMessage="update" />
            </a>
          </Access>
        ),
        record.username !== 'admin' && (
          <Access
            accessible={access.can_SysUser_ResetPwd}
            fallback={<div key={'can_SysUser_ResetPwd'} />}
          >
            <a
              key="reset"
              onClick={() => {
                setCurrentRow(record);
                handleResetPasswordVisible(true);
              }}
            >
              <FormattedMessage id="pages.searchUser.resetPassword" defaultMessage="reset" />
            </a>
          </Access>
        ),
      ],
    },
  ];

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col lg={5} md={6} xs={24} sm={24} style={{ backgroundColor: '#fff' }}>
            {treeOptionData.length > 0 ? (
              <Tree
                showLine
                key={'deeptTree'}
                switcherIcon={<DownOutlined />}
                defaultExpandAll={true}
                style={{ padding: '24px 12px', height: '100%' }}
                onSelect={onSelect}
                treeData={treeOptionData}
                fieldNames={{ title: 'label', key: 'value', children: 'children' }}
              />
            ) : (
              <div style={{ padding: '80px 80px', height: '100%' }}>
                <Spin />
              </div>
            )}
          </Col>
          <Col lg={19} md={18} xs={24} sm={24}>
            <ProTable<API.UserListItem, API.PageParams>
              headerTitle={intl.formatMessage({
                id: 'pages.searchUser.title',
                defaultMessage: 'SysUser List',
              })}
              scroll={{ x: 'max-content' }}
              actionRef={actionRef}
              rowKey={(record) => {
                return record.userId; // 在这里加上一个时间戳就可以了
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
              formRef={ref}
              request={user}
              onRequestError={(error) => {
                console.log(error);
              }}
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
                    <FormattedMessage id="pages.searchUser.chosen" defaultMessage="Chosen" />{' '}
                    <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
                    <FormattedMessage id="pages.searchUser.item" defaultMessage="项" />
                  </div>
                }
              >
                <Button
                  onClick={async () => {
                    await handleUserRemove(selectedRowsState);
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }}
                >
                  <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch deletion" />
                </Button>
              </FooterToolbar>
            )}
          </Col>
        </Row>
      </GridContent>

      <ResetPasswordForm
        title={intl.formatMessage({
          id: 'pages.searchUser.resetPasswordForm.resetPassword',
          defaultMessage: 'Reset Password',
        })}
        onSubmit={async (value) => {
          if (value.userId == undefined || value.userId == 0) {
            value.userId = currentRow?.userId;
          }
          const success = await handleResetPasswordUser(value as API.UserListItem);
          if (success) {
            handleResetPasswordVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleResetPasswordVisible(false);
        }}
        resetPasswordVisible={resetPasswordVisible}
        values={currentRow || {}}
      />

      <UpdateForm
        onSubmit={async (value) => {
          if (value.userId == undefined || value.userId == 0) {
            const success = await handleUserAdd(value as API.UserListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } else {
              return false;
            }
          } else {
            handleUserUpdate(value).then((resp) => {
              if (resp) {
                handleModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          }
          setReadonly(false);
        }}
        readonly={readonly}
        onCancel={() => {
          setReadonly(false);
          handleModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={modalVisible}
        values={currentRow || { status: '2' }}
        deptData={treeOptionData}
        roleSelectOption={roleSelectOption}
        postSelectOption={postSelectOption}
        title={
          currentRow?.userId
            ? readonly
              ? intl.formatMessage({
                  id: 'pages.view',
                  defaultMessage: 'View',
                })
              : intl.formatMessage({
                  id: 'pages.update',
                  defaultMessage: 'Update',
                })
            : intl.formatMessage({
                id: 'pages.new',
                defaultMessage: 'Update',
              })
        }
      />
    </PageContainer>
  );
};

export default UserList;

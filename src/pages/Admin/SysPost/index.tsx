import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Select, Space, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { post, getPost, addPost, updatePost, removePost } from '@/services/ant-design-pro/post';

/**
 *  Select Post
 * @zh-CN 查询岗位
 *
 * @param id
 */
const handlePostGet = async (id: number) => {
  try {
    let resData = await getPost(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add Post
 * @zh-CN 添加岗位
 * @param fields
 */
const handlePostAdd = async (fields: API.Post) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addPost({ ...fields });
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
 * @en-US Update Post
 * @zh-CN 更新岗位
 *
 * @param fields
 */
const handlePostUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring...');
  try {
    const result = await updatePost({ ...fields });
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
 * @en-US Delete Post
 * @zh-CN 删除岗位
 *
 * @param selectedRows
 */
const handlePostRemove = async (selectedRows: API.PostListItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removePost({
      ids: selectedRows.map((row) => row.postId),
    });

    if (resp.success) {
      hide();
      message.success('删除成功！');
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

const PostList: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.PostListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.PostListItem[]>([]);

  const { initialState } = useModel('@@initialState');

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.PostListItem>[] = [
    {
      title: <FormattedMessage id="pages.postManage.postId" defaultMessage="Id" />,
      dataIndex: 'postId',
      sorter: true,
      search: false,
    },
    {
      title: <FormattedMessage id="pages.postManage.postName" defaultMessage="postName" />,
      dataIndex: 'postName',
      valueType: 'text',
      tooltip: '部门名称',
    },
    {
      title: <FormattedMessage id="pages.postManage.postCode" defaultMessage="postCode" />,
      dataIndex: 'postCode',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.postManage.sort" defaultMessage="sort" />,
      dataIndex: 'sort',
      valueType: 'text',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: <FormattedMessage id="pages.postManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInSearch: true,
      sorter: true,
      render: (text, record, index) => {
        if (text == '2') return <Tag color="success">正常</Tag>;
        else return <Tag color="red">停用</Tag>;
      },
    },
    {
      title: <FormattedMessage id="pages.postManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      hideInTable: true,
      valueType: 'select',
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
      title: <FormattedMessage id="pages.postManage.createdAt" defaultMessage="createdAt" />,
      key: 'showTime',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.postManage.createdAt" defaultMessage="createdAt" />,
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
      title: <FormattedMessage id="pages.postManage.titleOption" defaultMessage="Operating" />,
      dataIndex: 'menuId',
      valueType: 'option',
      width: 'md',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handlePostGet(record.postId).then((resData) => {
              if (resData?.success) {
                console.log(resData.data);
                setCurrentRow(resData.data);
                handleUpdateModalVisible(true);
              }
            });
          }}
        >
          <FormattedMessage id="pages.postManage.update" defaultMessage="update" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PostListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.postManage.title',
          defaultMessage: 'Post Manage',
        })}
        actionRef={actionRef}
        rowKey={(record) => {
          return record.postCode + record.updatedAt; //在这里加上一个时间戳就可以了
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
        request={post}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              <FormattedMessage id="pages.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.item" defaultMessage="项" />
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a
                onClick={async () => {
                  await handlePostRemove(selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }}
              >
                <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch deletion" />
              </a>
              <a
                onClick={() => {
                  alert('导出数据');
                }}
              >
                导出数据
              </a>
            </Space>
          );
        }}
      />
      <UpdateForm
        onSubmit={async (value) => {
          console.log(value);
          const success = await handlePostAdd(value as API.PostListItem);
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
          id: 'pages.postManage.createForm.newPost',
          defaultMessage: 'New Post',
        })}
      />
      <UpdateForm
        onSubmit={async (value) => {
          handlePostUpdate(value).then((resp) => {
            console.log(resp);
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
          id: 'pages.postManage.updateForm.update',
          defaultMessage: 'Update',
        })}
      />
    </PageContainer>
  );
};

export default PostList;

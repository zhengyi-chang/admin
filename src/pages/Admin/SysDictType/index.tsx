import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Space, Tag, Layout } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage, useModel } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  listSysDictType,
  getSysDictType,
  addSysDictType,
  updateSysDictType,
  removeSysDictType,
} from './service';
import DictInfoForm from './components/DictInfoForm';
import { GridContent } from '@ant-design/pro-components';
import ProList from '@ant-design/pro-list';

import './style.less';
import DictInfoFormBody from './components/DictInfoFormBody';

/**
 *  Select SysDictType
 * @zh-CN 查询
 *
 * @param id
 */
const handleSysDictTypeGet = async (id: number) => {
  try {
    const resData = await getSysDictType(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add SysDictType
 * @zh-CN 添加
 * @param fields
 */
const handleSysDictTypeAdd = async (fields: SysDictTypeItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addSysDictType({ ...fields });
    if (result.success) {
      hide();
      message.success('Add success !');
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
 * @en-US Update SysDictType
 * @zh-CN 更新
 *
 * @param fields
 */
const handleSysDictTypeUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateSysDictType({ ...fields });
    if (result.success) {
      hide();
      message.success('Update success !');
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
 * @en-US Delete SysDictType
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleSysDictTypeRemove = async (selectedRows: SysDictTypeItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysDictType({
      ids: selectedRows.map((row) => row.dictId),
    });
    if (resp.success) {
      hide();
      message.success('Delete success !');
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

const SysDictTypeList: React.FC = () => {
  const [settingsModalVisible, handleSettingsModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of update window
   * @zh-CN 更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SysDictTypeItem>();
  const [currentDataRow, setCurrentDataRow] = useState<SysDictDataItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysDictTypeItem[]>([]);
  const { initialState } = useModel('@@initialState');

  // useEffect(() => {
  //   handleSysDictTypeGet(1).then((resData) => {
  //     if (resData?.success) {
  //       setCurrentRow(resData.data);
  //     }
  //   });
  // })[0];

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SysDictTypeItem>[] = [
    {
      title: <FormattedMessage id="pages.sysDictTypeManage.dictName" defaultMessage="dictName" />,
      dataIndex: 'dictName',
      sorter: true,
      width: 140,
    },
    {
      title: <FormattedMessage id="pages.sysDictTypeManage.dictType" defaultMessage="dictType" />,
      dataIndex: 'dictType',
      sorter: true,
      search: false,
      width: 140,
    },
    {
      title: <FormattedMessage id="pages.sysDictTypeManage.status" defaultMessage="status" />,
      dataIndex: 'status',
      sorter: true,
      search: false,
      width: 140,
    },
    {
      title: <FormattedMessage id="pages.sysDictTypeManage.remark" defaultMessage="remark" />,
      dataIndex: 'remark',
      sorter: true,
      search: false,
      width: 140,
    },
    {
      title: <FormattedMessage id="pages.titleOption" defaultMessage="Operating" />,
      dataIndex: 'dictId',
      valueType: 'option',
      width: 100,
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleSysDictTypeGet(record.dictId).then((resData) => {
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
        <a
          key="settings"
          onClick={() => {
            handleSysDictTypeGet(record.dictId).then((resData) => {
              if (resData?.success) {
                console.log(resData.data);
                setCurrentRow(resData.data);
                handleSettingsModalVisible(true);
              }
            });
          }}
        >
          <FormattedMessage id="pages.settings" defaultMessage="settings" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <GridContent>
        <Row gutter={24}>
          <Col
            id="dictType"
            lg={6}
            md={6}
            xs={24}
            sm={24}
            style={{ backgroundColor: '#fff', borderRight: 'solid 1px rgb(232 230 230)' }}
          >
            <ProList<SysDictTypeItem, API.PageParams>
              toolBarRender={() => {
                return [
                  <Button
                    key="3"
                    type="primary"
                    onClick={() => {
                      setCurrentRow({});
                      handleUpdateModalVisible(true);
                    }}
                  >
                    新建
                  </Button>,
                ];
              }}
              search={{
                filterType: 'light',
              }}
              actionRef={actionRef}
              className="list"
              style={{ padding: 0 }}
              rowKey="dictType"
              headerTitle="字典类型"
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    handleSysDictTypeGet(record.dictId).then((resData) => {
                      if (resData?.success) {
                        setCurrentRow(resData.data);
                      }
                    });
                  },
                };
              }}
              request={listSysDictType}
              pagination={{
                pageSize: 6,
                size: 'small',
              }}
              postData={(data) => {
                handleSysDictTypeGet(data[0].dictId).then((resData) => {
                  if (resData?.success) {
                    setCurrentRow(resData.data);
                  }
                });
                return data;
              }}
              showActions="hover"
              metas={{
                title: {
                  dataIndex: 'dictName',
                  title: '名称',
                },
                description: {
                  dataIndex: 'dictType',
                  search: false,
                },
                subTitle: {
                  dataIndex: 'status',
                  render: (_, row) => {
                    return (
                      <Space size={0}>
                        <Tag color={row.status === 2 ? 'green' : 'red'}>
                          {row.status === 2 ? '正常' : '停用'}
                        </Tag>
                      </Space>
                    );
                  },
                  search: false,
                },
                actions: {
                  render: (text, row) => [
                    <a
                      key="update"
                      onClick={() => {
                        handleSysDictTypeGet(row.dictId).then((resData) => {
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
                  search: false,
                },
              }}
            />
          </Col>
          <Col lg={18} md={18} xs={24} sm={24} style={{ backgroundColor: '#fff' }}>
            <DictInfoFormBody
              onSubmit={async (value) => {}}
              onCancel={() => {
                setCurrentRow(undefined);
              }}
              values={currentRow || {}}
              title={intl.formatMessage({
                id: 'pages.settings',
                defaultMessage: 'Settings',
              })}
            />
          </Col>
        </Row>
      </GridContent>

      <UpdateForm
        onSubmit={async (value) => {
          if (value.dictId == undefined || value.dictId == 0) {
            const success = await handleSysDictTypeAdd(value as SysDictTypeItem);
            if (success) {
              handleUpdateModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          } else {
            handleSysDictTypeUpdate(value).then((resp) => {
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
        values={currentRow || {}}
        title={
          currentRow?.dictId
            ? intl.formatMessage({
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

export default SysDictTypeList;

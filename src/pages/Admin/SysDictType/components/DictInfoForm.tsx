import React, { useEffect, useRef, useState } from 'react';
import { message, Form, Button } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDigit,
} from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { useIntl, useModel, FormattedMessage } from 'umi';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import {
  listSysDictData,
  getSysDictData,
  addSysDictData,
  updateSysDictData,
  removeSysDictData,
} from '../service';
import DictDataForm from './DictDataForm';

import '../style.less';

export type FormValueType = {} & Partial<SysDictTypeItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysDictTypeItem>;
  title: string;
};

/**
 *  Select SysDictData
 * @zh-CN 查询
 *
 * @param id
 */
const handleSysDictDataGet = async (id: number) => {
  try {
    const resData = await getSysDictData(id);
    return resData;
  } catch (error) {
    return undefined;
  }
};

/**
 * @en-US Add SysDictData
 * @zh-CN 添加
 * @param fields
 */
const handleSysDictDataAdd = async (fields: SysDictDataItem) => {
  const hide = message.loading('Configuring');
  try {
    const result = await addSysDictData({ ...fields });
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
 * @en-US Update SysDictData
 * @zh-CN 更新
 *
 * @param fields
 */
const handleSysDictDataUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    const result = await updateSysDictData({ ...fields });
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
 * @en-US Delete SysDictData
 * @zh-CN 删除
 *
 * @param selectedRows
 */
const handleSysDictDataRemove = async (selectedRows: SysDictDataItem[]) => {
  const hide = message.loading('Configuring');
  if (!selectedRows) return true;
  try {
    const resp = await removeSysDictData({
      ids: selectedRows.map((row) => row.dictCode),
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

const DictInfoForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
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
  const [currentRow, setCurrentRow] = useState<SysDictDataItem>();
  const [selectedRowsState, setSelectedRows] = useState<SysDictDataItem[]>([]);

  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });

  const columns: ProColumns<SysDictDataItem>[] = [
    {
      title: <FormattedMessage id="pages.sysDictDataManage.dictLabel" defaultMessage="dictLabel" />,
      dataIndex: 'dictLabel',
    },
    {
      title: <FormattedMessage id="pages.sysDictDataManage.dictValue" defaultMessage="dictValue" />,
      dataIndex: 'dictValue',
      search: false,
    },
    {
      title: <FormattedMessage id="pages.titleOption" defaultMessage="Operating" />,
      dataIndex: 'dictCode',
      valueType: 'option',
      width: 60,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleSysDictDataGet(record.dictCode).then((resData) => {
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
    <>
      <DrawerForm<SysDictTypeItem>
        title={props.title}
        form={form}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          onClose: () => props.onCancel(),
          style: { padding: '0 24', zIndex: 1000 },
        }}
        id={'data'}
        width={600}
        visible={props.updateModalVisible}
        onFinishFailed={(error) => {
          error.errorFields.forEach((s) => {
            s.errors?.forEach((err) => {
              message.error(err);
            });
          });
        }}
        onFinish={async (values) => {
          if (props.values.dictId) {
            values.dictId = props.values.dictId;
          }
          // 如果有number的在这里做一下转换
          // values.status=parseInt(values.status)
          await props.onSubmit(values);
          message.success('提交成功');
          return true;
        }}
      >
        <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
          <ProTable<SysDictDataItem, API.PageParams>
            headerTitle={intl.formatMessage({
              id: 'pages.sysDictDataManage.title',
              defaultMessage: 'sysDictData Manage',
            })}
            actionRef={actionRef}
            rowKey={(record) => {
              return record.dictCode;
            }}
            style={{ padding: 0 }}
            tableStyle={{ padding: 0 }}
            search={false}
            toolBarRender={() => [
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  handleUpdateModalVisible(true);
                }}
              >
                <PlusOutlined />
                <FormattedMessage id="pages.new" defaultMessage="New" />
              </Button>,
            ]}
            params={{ dictType: props.values.dictType ?? '' }}
            request={listSysDictData}
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
                  await handleSysDictDataRemove(selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }}
              >
                <FormattedMessage id="pages.batchDeletion" defaultMessage="Batch deletion" />
              </Button>
            </FooterToolbar>
          )}
          <DictDataForm
            onSubmit={async (value) => {
              if (value.dictCode == undefined || value.dictCode == 0) {
                const success = await handleSysDictDataAdd(value as SysDictDataItem);
                if (success) {
                  handleUpdateModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                }
              } else {
                handleSysDictDataUpdate(value).then((resp) => {
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
            values={currentRow || { dictType: props.values.dictType ?? '' }}
            title={
              currentRow?.dictCode
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
        </WaterMark>
      </DrawerForm>
    </>
  );
};

export default DictInfoForm;

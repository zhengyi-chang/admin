import { EditableProTable, ProColumns, ProForm, ProFormInstance } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from 'umi';
import { getSysConfig, updateSysConfig } from '../service';
import styles from './BaseView.less';

const CustomView: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<SysConfigItem>>();

  const [dataSource, setDataSource] = useState<any[]>([]);
  // const editorFormRef = useRef<EditableFormInstance<SysConfigItem>>();
  const columns: ProColumns<SysConfigItem>[] = [
    {
      title: '名称',
      dataIndex: 'configName',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '前台显示',
      key: 'isFrontend',
      dataIndex: 'isFrontend',
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      },
    },
    {
      title: '键名',
      dataIndex: 'configKey',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '键值',
      dataIndex: 'configValue',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const { data: currentConfig, loading } = useRequest(() => {
    return getSysConfig();
  });

  useEffect(() => {
    if (currentConfig && currentConfig.custom) {
      setDataSource(currentConfig.custom);
    }
  }, [currentConfig]);

  /**
   * @en-US Update SysConfig
   * @zh-CN 更新系统参数配置
   *
   * @param fields
   */
  const handleFinish = async (values: any) => {
    const tableDataSource = formRef.current?.getFieldValue('table') as SysConfigItem[];
    values.custom = dataSource;
    const hide = message.loading('Configuring');
    try {
      const result = await updateSysConfig({ ...values });
      hide();
      if (result.success) {
        message.success('Update SysConfig is successful');
        return true;
      }
      return false;
    } catch (error) {
      hide();
      message.error('Update SysConfig failed, please try again!');
      return false;
    }
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{
              ...currentConfig,
            }}
            hideRequiredMark
          >
            <EditableProTable<SysConfigItem>
              rowKey="id"
              className={styles.table}
              recordCreatorProps={{
                record: (index) => {
                  return { id: index + 1, isInsert: true };
                },
              }}
              cardProps={{
                className: styles.tableCard,
              }}
              loading={false}
              columns={columns}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                type: 'single',
                editableKeys,
                onSave: async (rowKey, data, row) => {},
                onCancel: async (rowKey, data, row) => {},
                onDelete: async (rowKey, row) => {},
                onChange: setEditableRowKeys,
              }}
            />
          </ProForm>
        </>
      )}
    </div>
  );
};
export default CustomView;

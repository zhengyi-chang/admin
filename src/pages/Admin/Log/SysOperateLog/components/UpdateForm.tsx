import React, { useEffect } from 'react';
import { Form, Card, Descriptions, Tag } from 'antd';
import { DrawerForm, WaterMark } from '@ant-design/pro-components';
import { DiffEditor } from '@monaco-editor/react';
import { useIntl, useModel } from 'umi';
import moment from 'moment';

export type FormValueType = {} & Partial<SysOperateLogItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysOperateLogItem>;
  title: string;
};

export function formatJSON(val = {}) {
  try {
    return JSON.stringify(val, null, 2);
  } catch {
    const errorJson = {
      error: `非法返回${val}`,
    };
    return JSON.stringify(errorJson, null, 2);
  }
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });
  return (
    <DrawerForm<SysOperateLogItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      width={860}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        props.onCancel();
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <Card title="日志信息" bordered={false}>
          <Descriptions column={2}>
            <Descriptions.Item label="操作类型">
              {props.values.type == '新增' && <Tag color="purple">{props.values.type}</Tag>}
              {props.values.type == '修改' && <Tag color="orange">{props.values.type}</Tag>}
              {props.values.type == '删除' && <Tag color="red">{props.values.type}</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="操作说明">{props.values.description}</Descriptions.Item>
            <Descriptions.Item label="操作人"> {props.values.userName} </Descriptions.Item>
            <Descriptions.Item label="操作时间">
              {' '}
              {moment(props.values.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="详情" bordered={false}>
          <Descriptions column={1} layout="vertical">
            <Descriptions.Item label="数据对比">
              <DiffEditor
                height={300}
                language="json"
                theme="vs-dark"
                original={formatJSON(props.values.updateBefore)}
                modified={formatJSON(props.values.updateAfter)}
                options={{
                  selectOnLineNumbers: true,
                  matchBrackets: 'near',
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

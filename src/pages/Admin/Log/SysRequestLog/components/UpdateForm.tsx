import React, { useEffect, useRef } from 'react';
import { Form, Card, Descriptions, Tag, Empty } from 'antd';
import { DrawerForm, WaterMark } from '@ant-design/pro-components';
import Editor from '@monaco-editor/react';
import { useIntl, useModel } from 'umi';
import moment from 'moment';

export type FormValueType = {} & Partial<SysRequestLogItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysRequestLogItem>;
  title: string;
};

export function formatJSON(val) {
  try {
    const res = JSON.parse(val);
    return JSON.stringify(res, null, 2);
  } catch {
    const errorJson = {
      error: `非法返回${val}`,
    };
    return JSON.stringify(errorJson, null, 2);
  }
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const monacoRef = useRef(null);
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });
  function onChangeJsonResultHandle(value: any) {
    props.values.jsonResult = value;
    form.setFieldsValue(props.values);
  }

  function onChangeOperParamHandle(value: any) {
    props.values.operParam = value;
    form.setFieldsValue(props.values);
  }

  function onChangeOperHeadersHandle(value: any) {
    props.values.operHeaders = value;
    form.setFieldsValue(props.values);
  }

  return (
    <DrawerForm<SysRequestLogItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
        // open: props.updateModalVisible,
      }}
      width={'md'}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        props.onCancel();
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <Card title="日志信息" bordered={false}>
          <Descriptions column={1}>
            <Descriptions.Item label="请求地址">{props.values.operUrl}</Descriptions.Item>
            <Descriptions.Item label="请求类型">
              {props.values.requestMethod == 'POST' && (
                <Tag color="purple">{props.values.requestMethod}</Tag>
              )}
              {props.values.requestMethod == 'GET' && (
                <Tag color="warning">{props.values.requestMethod}</Tag>
              )}
              {props.values.requestMethod == 'PUT' && (
                <Tag color="warning">{props.values.requestMethod}</Tag>
              )}
              {props.values.requestMethod == 'DELETE' && (
                <Tag color="blue">{props.values.requestMethod}</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="请求IP">{props.values.operIp}</Descriptions.Item>
            <Descriptions.Item label="归属地">{props.values.operLocation}</Descriptions.Item>
            <Descriptions.Item label="相应时长">
              {parseInt(props.values.latencyTime) > 1000 && (
                <Tag color="red"> {props.values.latencyTime}ms</Tag>
              )}
              {parseInt(props.values.latencyTime) >= 500 &&
                parseInt(props.values.latencyTime) < 1000 && (
                  <Tag color="orange">{props.values.latencyTime}ms</Tag>
                )}
              {parseInt(props.values.latencyTime) < 500 && (
                <Tag color="green">{props.values.latencyTime}ms</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="操作人">{props.values.operName}</Descriptions.Item>
            <Descriptions.Item label="操作时间">
              {moment(props.values.operTime).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="详情" bordered={false}>
          <Descriptions column={1} layout="vertical">
            <Descriptions.Item label="请求Headers">
              <Editor
                height={300}
                defaultLanguage="json"
                theme="vs-dark"
                value={formatJSON(props.values.operHeaders)}
                onChange={onChangeOperHeadersHandle}
                options={{
                  selectOnLineNumbers: true,
                  matchBrackets: 'near',
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="请求Body">
              {(props.values.operParam == '' || props.values.operParam == '{}') && (
                <Empty
                  style={{ width: '100%', height: 80, margin: 0 }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
              {props.values.operParam != '' && props.values.operParam != '{}' && (
                <Editor
                  height={300}
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={formatJSON(props.values.operParam)}
                  onChange={onChangeOperParamHandle}
                  options={{
                    selectOnLineNumbers: true,
                    matchBrackets: 'near',
                  }}
                />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="回调数据">
              <Editor
                height={300}
                defaultLanguage="json"
                theme="vs-dark"
                value={formatJSON(props.values.jsonResult)}
                onChange={onChangeJsonResultHandle}
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

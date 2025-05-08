import React, { useEffect, useState } from 'react';
import { message, Form, Descriptions, Card, Tag, Empty, Button } from 'antd';
import { DrawerForm, WaterMark } from '@ant-design/pro-components';
import Editor from '@monaco-editor/react';
import { useIntl, useModel } from 'umi';
import StackTraceForm from './StackTraceForm';
import { BugOutlined } from '@ant-design/icons';
import moment from 'moment';

export type FormValueType = {} & Partial<SysAbnormalLogItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysAbnormalLogItem>;
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
  const [stackTraceFormVisible, setStackTraceFormVisible] = useState<boolean>(false);

  const [form] = Form.useForm();
  // useEffect(() => {
  //     form.resetFields();
  //     form.setFieldsValue(props.values);
  // })
  return (
    <DrawerForm<SysAbnormalLogItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      width={660}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        console.log(values);
        if (props.values.abId) {
          values.abId = props.values.abId;
        }
        // 如果有number的在这里做一下转换
        // values.status=parseInt(values.status)
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <Card title="日志信息" bordered={false}>
          <Descriptions column={1}>
            <Descriptions.Item label="请求地址">{props.values.url}</Descriptions.Item>
            <Descriptions.Item label="请求类型">
              {props.values.method == 'POST' && <Tag color="purple">{props.values.method}</Tag>}
              {props.values.method == 'GET' && <Tag color="warning">{props.values.method}</Tag>}
              {props.values.method == 'PUT' && <Tag color="warning">{props.values.method}</Tag>}
              {props.values.method == 'DELETE' && <Tag color="blue">{props.values.method}</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="异常信息">{props.values.abInfo}</Descriptions.Item>
            <Descriptions.Item label="异常来源">{props.values.abSource}</Descriptions.Item>
            <Descriptions.Item label="异常方法">{props.values.abFunc}</Descriptions.Item>
            <Descriptions.Item label="请求IP">{props.values.ip}</Descriptions.Item>
            <Descriptions.Item label="操作人"> {props.values.userName} </Descriptions.Item>
            <Descriptions.Item label="操作时间">
              {' '}
              {moment(props.values.createdAt).format('YYYY-MM-DD HH:mm:ss')}{' '}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card
          title="详情"
          bordered={false}
          extra={
            <BugOutlined
              onClick={() => {
                setStackTraceFormVisible(true);
              }}
            />
          }
        >
          <Descriptions column={1} layout="vertical">
            <Descriptions.Item label="堆栈追踪">
              <Editor
                height={300}
                defaultLanguage="json"
                theme="vs-dark"
                value={props.values.stackTrace}
                options={{
                  selectOnLineNumbers: true,
                  matchBrackets: 'near',
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="请求Headers">
              <Editor
                height={300}
                defaultLanguage="json"
                theme="vs-dark"
                value={formatJSON(props.values.headers)}
                options={{
                  selectOnLineNumbers: true,
                  matchBrackets: 'near',
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="请求Body">
              {(formatJSON(props.values.body) == '' || formatJSON(props.values.body) == '{}') && (
                <Empty
                  style={{ width: '100%', height: 80, margin: 0 }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
              {formatJSON(props.values.body) != '' && formatJSON(props.values.body) != '{}' && (
                <Editor
                  height={300}
                  defaultLanguage="json"
                  theme="vs-dark"
                  value={formatJSON(props.values.body)}
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
                value={formatJSON(props.values.resp)}
                options={{
                  selectOnLineNumbers: true,
                  matchBrackets: 'near',
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </WaterMark>
      <StackTraceForm
        onSubmit={async (value) => {
          setStackTraceFormVisible(false);
        }}
        onCancel={() => {
          setStackTraceFormVisible(false);
        }}
        updateModalVisible={stackTraceFormVisible}
        values={{}}
        title={intl.formatMessage({
          id: 'pages.sysAbnormalLogManage.updateForm.viewSysAbnormalLog',
          defaultMessage: 'View SysAbnormalLog',
        })}
      />
    </DrawerForm>
  );
};

export default UpdateForm;

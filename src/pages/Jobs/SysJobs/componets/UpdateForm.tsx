import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { useIntl, useModel, FormattedMessage } from 'umi';
import { ProFormSelect } from '@ant-design/pro-components';

export type FormValueType = {} & Partial<SysJobItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysJobItem>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  }, [props.values]);

  return (
    <DrawerForm<SysJobItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      initialValues={props.values}
      width={360}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        console.log(values);
        if (props.values.jobId) {
          values.jobId = props.values.jobId;
        }
        // 如果有number的在这里做一下转换
        // values.status=parseInt(values.status)
        await props.onSubmit(values);
        message.success('提交成功');
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="jobName"
          initialValue={props.values.jobName}
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.jobName.nameLabel',
            defaultMessage: 'jobName',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysJobManage.updateForm.jobName.nameRules"
                  defaultMessage="Please enter jobName！"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          name="jobType"
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.jobType.nameLabel',
            defaultMessage: 'jobType',
          })}
          request={async () => [
            { label: '接口', value: 1 },
            { label: '函数', value: 2 },
          ]}
          placeholder="Please select a country"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysJobManage.updateForm.jobType.nameRules"
                  defaultMessage="Please enter jobType！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="cronExpression"
          initialValue={props.values.cronExpression}
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.cronExpression.nameLabel',
            defaultMessage: 'cronExpression',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysJobManage.updateForm.cronExpression.nameRules"
                  defaultMessage="Please enter cronExpression！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="invokeTarget"
          initialValue={props.values.invokeTarget}
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.invokeTarget.nameLabel',
            defaultMessage: 'invokeTarget',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysJobManage.updateForm.invokeTarget.nameRules"
                  defaultMessage="Please enter invokeTarget！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="args"
          initialValue={props.values.args}
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.args.nameLabel',
            defaultMessage: 'args',
          })}
          width="md"
        />
        <ProFormSelect
          name="status"
          label={intl.formatMessage({
            id: 'pages.sysJobManage.updateForm.status.nameLabel',
            defaultMessage: 'status',
          })}
          request={async () => [
            { label: '停用', value: 1 },
            { label: '可用', value: 2 },
          ]}
          placeholder="Please select a status"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysJobManage.updateForm.status.nameRules"
                  defaultMessage="Please enter status"
                />
              ),
            },
          ]}
        />
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

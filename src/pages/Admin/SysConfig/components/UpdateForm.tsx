import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { useIntl, useModel, FormattedMessage } from 'umi';
import { ProFormSelect } from '@ant-design/pro-components';

export type FormValueType = {} & Partial<SysConfigItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysConfigItem>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });
  return (
    <DrawerForm<SysConfigItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      width={360}
      visible={props.updateModalVisible}
      onFinishFailed={(error) => {
        error.errorFields.forEach((s) => {
          s.errors?.forEach((err) => {
            message.error(err);
          });
        });
      }}
      onFinish={async (value) => {
        console.log(value);
        if (props.values.id) {
          value.id = props.values.id;
        }
        // 如果有number的在这里做一下转换
        // values.status=parseInt(values.status)
        await props.onSubmit(value);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="configName"
          initialValue={props.values.configName}
          label={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.configName.nameLabel',
            defaultMessage: 'configName',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysConfigManage.updateForm.configName.nameRules"
                  defaultMessage="Please enter configName！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="configKey"
          initialValue={props.values.configKey}
          label={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.configKey.nameLabel',
            defaultMessage: 'configKey',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysConfigManage.updateForm.configKey.nameRules"
                  defaultMessage="Please enter configKey！"
                />
              ),
            },
          ]}
        />
        {/* <ProFormSelect
          name="formField"
          label={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.formField.nameLabel',
            defaultMessage: 'formField',
          })}
          request={async () => [
            { label: '密码输入框', value: 'password' },
            { label: '金额输入框', value: 'money' },
            { label: '日期', value: 'date' },
            { label: '日期时间', value: 'dateTime' },
            { label: '文本框', value: 'text' },
            { label: '下拉框', value: 'select' },
            { label: '多选框', value: 'checkbox' },
            { label: '数字输入框', value: 'digit' },
            { label: '日期时间', value: 'dateTime' },
          ]}
          placeholder={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.formField.nameRules',
            defaultMessage: 'formField',
          })}
          rules={[{
            required: true,
            message: (< FormattedMessage
              id="pages.sysConfigManage.updateForm.formField.nameRules"
              defaultMessage="Please enter formField"
            />)
          }]}
        /> */}
        <ProFormSelect
          name="isSecret"
          label="是否机密"
          request={async () => [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
          disabled={props.values?.id == 0 || props.values?.id == undefined ? false : true}
          placeholder="请选择是否在前台展示!"
          rules={[{ required: true, message: '请选择是否在前台展示!' }]}
        />
        <ProFormSelect
          name="isFrontend"
          label="前台展示"
          request={async () => [
            { label: '是', value: 1 },
            { label: '否', value: 0 },
          ]}
          placeholder="请选择是否在前台展示!"
          rules={[{ required: true, message: '请选择是否在前台展示!' }]}
        />

        <ProFormText
          name="configType"
          initialValue={props.values.configType}
          label={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.configType.nameLabel',
            defaultMessage: 'configType',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysConfigManage.updateForm.configType.nameRules"
                  defaultMessage="Please enter configType！"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="remark"
          initialValue={props.values.remark}
          label={intl.formatMessage({
            id: 'pages.sysConfigManage.updateForm.remark.nameLabel',
            defaultMessage: 'remark',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysConfigManage.updateForm.remark.nameRules"
                  defaultMessage="Please enter remark！"
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

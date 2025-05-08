import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import {
  DrawerForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  WaterMark,
} from '@ant-design/pro-components';
import { useIntl, useModel, FormattedMessage } from 'umi';

export type FormValueType = {} & Partial<SysApiItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysApiItem>;
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
    <DrawerForm<SysApiItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      width={600}
      {...{
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      }}
      layout="horizontal"
      labelAlign="right"
      visible={props.updateModalVisible}
      onFinishFailed={(error) => {
        error.errorFields.forEach((s) => {
          s.errors?.forEach((err) => {
            message.error(err);
          });
        });
      }}
      onFinish={async (values) => {
        console.log(values);
        if (props.values.id) {
          values.id = props.values.id;
        }
        // 如果有number的在这里做一下转换
        // values.status=parseInt(values.status)
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="name"
          initialValue={props.values.name}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.name.nameLabel',
            defaultMessage: 'name',
          })}
          tooltip="接口名称，格式：1、{模块名}{字段}{动作}； eg: 用户密码重置 2、{模块名}{动作}； eg: 用户修改"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysApiManage.updateForm.name.nameRules"
                  defaultMessage="Please enter name"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          name="type"
          initialValue={props.values.type}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.type.nameLabel',
            defaultMessage: 'type',
          })}
          request={async () => [
            { label: 'BUS', value: 'BUS' },
            { label: 'SYS', value: 'SYS' },
          ]}
          width="sm"
          placeholder="Please select a type"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysApiManage.updateForm.type.nameRules"
                  defaultMessage="Please enter type!"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="handle"
          initialValue={props.values.handle}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.handle.nameLabel',
            defaultMessage: 'handle',
          })}
          disabled
        />
        <ProFormText
          name="path"
          initialValue={props.values.path}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.path.nameLabel',
            defaultMessage: 'path',
          })}
          disabled
        />
        <ProFormSelect
          name="method"
          initialValue={props.values.method}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.method.nameLabel',
            defaultMessage: 'method',
          })}
          disabled
          width="sm"
          request={async () => [
            { label: 'GET', value: 'GET' },
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'DELETE', value: 'DELETE' },
          ]}
          placeholder="Please select a method"
        />
        <ProFormSelect
          name="isHistory"
          initialValue={props.values.isHistory}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.isHistory.nameLabel',
            defaultMessage: 'isHistory',
          })}
          disabled
          width="sm"
          request={async () => [
            { label: '历史', value: 1 },
            { label: '正常', value: 0 },
          ]}
          placeholder="Please select a method"
        />
        <ProFormText
          name="project"
          initialValue={props.values.project}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.project.nameLabel',
            defaultMessage: 'project',
          })}
          disabled
        />
        <ProFormText
          name="bus"
          initialValue={props.values.bus}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.bus.nameLabel',
            defaultMessage: 'bus',
          })}
          disabled
        />
        <ProFormText
          name="func"
          initialValue={props.values.bus}
          label={intl.formatMessage({
            id: 'pages.sysApiManage.updateForm.func.nameLabel',
            defaultMessage: 'func',
          })}
          disabled
        />
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

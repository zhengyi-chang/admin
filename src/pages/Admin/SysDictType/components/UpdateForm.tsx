import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDigit,
} from '@ant-design/pro-form';
import { WaterMark } from '@ant-design/pro-layout';
import { useIntl, useModel, FormattedMessage } from 'umi';
import { ModalForm, ProForm } from '@ant-design/pro-components';

export type FormValueType = {} & Partial<SysDictTypeItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysDictTypeItem>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    props.values.status = props.values.status?.toString();
    form.setFieldsValue(props.values);
  });
  return (
    <ModalForm<SysDictTypeItem>
      title={props.title}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
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
      onFinish={async (values) => {
        console.log(values);
        if (props.values.dictId) {
          values.dictId = props.values.dictId;
        }
        // 如果有number的在这里做一下转换
        values.status = parseInt(values.status);
        await props.onSubmit(values);
        message.success('提交成功');
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="dictName"
          initialValue={props.values.dictName}
          label={intl.formatMessage({
            id: 'pages.sysDictTypeManage.updateForm.dictName.nameLabel',
            defaultMessage: 'dictName',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictTypeManage.updateForm.dictName.nameRules"
                  defaultMessage="Please enter dictName!"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="dictType"
          initialValue={props.values.dictType}
          label={intl.formatMessage({
            id: 'pages.sysDictTypeManage.updateForm.dictType.nameLabel',
            defaultMessage: 'dictType',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictTypeManage.updateForm.dictType.nameRules"
                  defaultMessage="Please enter dictType!"
                />
              ),
            },
          ]}
        />
        <ProForm.Group>
          <ProFormRadio.Group
            name="status"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.status.nameLabel',
              defaultMessage: '状态',
            })}
            width="md"
            options={initialState?.normalDisableSelectOption}
          />
        </ProForm.Group>
        {/* <ProFormText
          name="status"
          initialValue={props.values.status}
          label={intl.formatMessage({
            id: 'pages.sysDictTypeManage.updateForm.status.nameLabel',
            defaultMessage: 'status',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictTypeManage.updateForm.status.nameRules"
                  defaultMessage="Please enter status!"
                />
              ),
            },
          ]}
        /> */}
        <ProFormText
          name="remark"
          initialValue={props.values.remark}
          label={intl.formatMessage({
            id: 'pages.sysDictTypeManage.updateForm.remark.nameLabel',
            defaultMessage: 'remark',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictTypeManage.updateForm.remark.nameRules"
                  defaultMessage="Please enter remark!"
                />
              ),
            },
          ]}
        />
      </WaterMark>
    </ModalForm>
  );
};

export default UpdateForm;

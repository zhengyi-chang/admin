import React, { useEffect } from 'react';
import { message, Form } from 'antd';
import { ModalForm, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { WaterMark } from '@ant-design/pro-components';
import { useIntl, useModel, FormattedMessage } from 'umi';
import type { UpdatePwd } from '../data';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FormValueType = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
} & Partial<UpdatePwd>;

export type UpdatePwdFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<UpdatePwd>;
  title: string;
};

const UpdatePwdForm: React.FC<UpdatePwdFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });
  return (
    <ModalForm<UpdatePwd>
      title={props.title}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => props.onCancel(),
      }}
      form={form}
      width={360}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText.Password
          name="oldPassword"
          initialValue={props.values.oldPassword}
          label={intl.formatMessage({
            id: 'app.settings.security.password',
            defaultMessage: 'password',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="app.settings.security.password.nameRules"
                  defaultMessage="Please enter password!"
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          name="newPassword"
          initialValue={props.values.newPassword}
          label={intl.formatMessage({
            id: 'app.settings.security.new-password',
            defaultMessage: 'new password',
          })}
          hasFeedback
          dependencies={['newPasswordSec']}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="app.settings.security.new-password.nameRules"
                  defaultMessage="Please enter new password!"
                />
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  !getFieldValue('newPasswordSec') ||
                  getFieldValue('newPasswordSec') === value
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致，请重新输入!'));
              },
            }),
          ]}
        />

        <ProFormText.Password
          name="newPasswordSec"
          initialValue={props.values.newPassword}
          label={intl.formatMessage({
            id: 'app.settings.security.new-password-sec',
            defaultMessage: 'new password',
          })}
          dependencies={['newPassword']}
          hasFeedback
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="app.settings.security.new-password-sec.nameRules"
                  defaultMessage="Please enter new password!"
                />
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码输入不一致，请重新输入!'));
              },
            }),
          ]}
        />
      </WaterMark>
    </ModalForm>
  );
};

export default UpdatePwdForm;

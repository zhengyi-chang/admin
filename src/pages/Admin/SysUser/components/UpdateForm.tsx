import React, { useEffect } from 'react';
import { Form, message, Row, Col } from 'antd';
import {
  DrawerForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  WaterMark,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useIntl, useModel, FormattedMessage } from 'umi';

export type FormValueType = {} & Partial<API.UserListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.UserListItem>;
  deptData: {}[] | undefined;
  roleSelectOption: {}[] | undefined;
  postSelectOption: {}[] | undefined;
  title: string;
  readonly: boolean;
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
    <DrawerForm<API.UserListItem>
      title={props.title}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      readonly={props.readonly}
      form={form}
      width={740}
      initialValues={props.values}
      visible={props.updateModalVisible}
      onFinishFailed={(error) => {
        error.errorFields.forEach((s) => {
          s.errors?.forEach((err) => {
            message.error(err);
          });
        });
      }}
      onFinish={async (values) => {
        if (!props.readonly) {
          console.log(values);
          if (props.values.userId) {
            values.userId = props.values.userId;
          }
          values.avatar =
            'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
          await props.onSubmit(values);
        } else {
          props.onCancel();
        }
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="nickName"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.nickName.nameLabel',
                defaultMessage: '用户昵称',
              })}
              width="md"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.nickName.nameRules"
                      defaultMessage="请输入用户昵称！"
                    />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormTreeSelect
              name="deptId"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.deptId.nameLabel',
                defaultMessage: '归属部门',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.deptId.nameRules"
                      defaultMessage="请输入归属部门！"
                    />
                  ),
                },
              ]}
              style={{ width: '100%' }}
              fieldProps={{
                dropdownStyle: { maxHeight: 400, overflow: 'auto' },
                treeData: props.deptData,
                treeDefaultExpandAll: true,
              }}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="username"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.username.nameLabel',
                defaultMessage: '登录名',
              })}
              width="md"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.username.nameRules"
                      defaultMessage="请输入登录名！"
                    />
                  ),
                },
              ]}
            />
            <ProFormSelect
              name="sex"
              key={'value'}
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.sexType.nameLabel',
                defaultMessage: '性别',
              })}
              width="md"
              options={initialState?.sexSelectOption}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="phone"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.phone.nameLabel',
                defaultMessage: '手机号码',
              })}
              fieldProps={{
                maxLength: 11,
              }}
              width="md"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.phone.nameRules"
                      defaultMessage="请输入手机号码！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="email"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.email.nameLabel',
                defaultMessage: '邮箱',
              })}
              width="md"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.email.nameRules"
                      defaultMessage="请输入邮箱！"
                    />
                  ),
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="postId"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.post.nameLabel',
                defaultMessage: '岗位',
              })}
              width="md"
              options={props.postSelectOption}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.searchTable.updateForm.post.nameRules"
                      defaultMessage="请输入岗位！"
                    />
                  ),
                },
              ]}
            />
          </Col>
          <>
            {props.values.roleId != 1 ? (
              <Col span={12}>
                <ProFormSelect
                  name="roleId"
                  label={intl.formatMessage({
                    id: 'pages.searchTable.updateForm.roleId.nameLabel',
                    defaultMessage: '角色',
                  })}
                  width="md"
                  options={props.roleSelectOption}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.searchTable.updateForm.roleId.nameRules"
                          defaultMessage="请选择角色！"
                        />
                      ),
                    },
                  ]}
                />
              </Col>
            ) : (
              ''
            )}
          </>
          <Col span={24}>
            <ProFormRadio.Group
              name="status"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.status.nameLabel',
                defaultMessage: '状态',
              })}
              width="md"
              options={initialState?.normalDisableSelectOption}
            />
          </Col>
          <Col span={24}>
            <ProFormTextArea
              name="remark"
              label={intl.formatMessage({
                id: 'pages.searchTable.updateForm.remark.nameLabel',
                defaultMessage: '备注',
              })}
              placeholder="请输入备注"
            />
          </Col>
        </Row>
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

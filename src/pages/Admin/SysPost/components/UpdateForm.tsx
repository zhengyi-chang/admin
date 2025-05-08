import React, { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormDigit,
  WaterMark,
} from '@ant-design/pro-components';
import { useIntl, useModel, FormattedMessage } from 'umi';

export type FormValueType = {} & Partial<API.PostListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.PostListItem>;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [posts, setPosts] = useState<Partial<API.PostListItem>>({});
  const [form] = Form.useForm();
  useEffect(() => {
    if (!props.values.status) {
      props.values.status = 2;
    }
    setPosts(props.values);
    form.setFieldsValue(posts);
  });
  return (
    <DrawerForm<API.PostListItem>
      title={props.title}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      initialValues={posts}
      form={form}
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
        if (props.values.postId) {
          values.postId = props.values.postId;
        }
        values.status = parseInt(values.status);
        await props.onSubmit(values);
        form.resetFields();
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="postName"
          // initialValue={props.values.postName}
          label={intl.formatMessage({
            id: 'pages.postManage.updateForm.postName.nameLabel',
            defaultMessage: 'postName',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.postManage.updateForm.postName.nameRules"
                  defaultMessage="Please enter postName！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="postCode"
          // initialValue={props.values.postCode}
          label={intl.formatMessage({
            id: 'pages.postManage.updateForm.postCode.nameLabel',
            defaultMessage: 'postCode',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.postManage.updateForm.postCode.nameRules"
                  defaultMessage="Please enter postCode"
                />
              ),
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          // initialValue={"1"}
          // initialValue={props.values.status}
          label={intl.formatMessage({
            id: 'pages.postManage.updateForm.status.nameLabel',
            defaultMessage: '状态',
          })}
          width="md"
          options={initialState?.normalDisableSelectOption}
        />
        <ProFormDigit
          name="sort"
          // initialValue={props.values.sort}
          label={intl.formatMessage({
            id: 'pages.postManage.updateForm.sort.nameLabel',
            defaultMessage: 'sort',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.postManage.updateForm.sort.nameRules"
                  defaultMessage="Please enter sort"
                />
              ),
            },
          ]}
        />
        <ProFormTextArea
          name="remark"
          label={intl.formatMessage({
            id: 'pages.postManage.updateForm.remark.nameLabel',
            defaultMessage: 'remark',
          })}
          placeholder="Please enter remark"
          // initialValue={props.values.remark}
        />
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

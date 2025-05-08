import React, { useEffect } from 'react';
import { message, TreeSelect, Form } from 'antd';
import { DrawerForm, ProFormText, ProFormRadio, ProFormDigit } from '@ant-design/pro-components';
import { WaterMark } from '@ant-design/pro-components';
import { useIntl, useModel, FormattedMessage } from 'umi';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FormValueType = {} & Partial<API.DeptListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.DeptListItem>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  treeData: {}[] | undefined;
  title: string;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    props.values.status = String(props.values.status);
    form.setFieldsValue(props.values);
  }, [props.values]);
  return (
    <DrawerForm<API.DeptListItem>
      title={props.title}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      form={form}
      width={360}
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
        console.log(values);
        if (props.values.deptId) {
          values.deptId = props.values.deptId;
        }
        values.status = parseInt(values.status);
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <Form.Item
          name="parentId"
          // initialValue={String(props.values.parentId)}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.parentId.nameLabel',
            defaultMessage: 'parentId',
          })}
          tooltip="指当前菜单停靠的菜单归属"
          className="pro-field-md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.parentId.nameRules"
                  defaultMessage="Please enter parentId"
                />
              ),
            },
          ]}
        >
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={props.treeData}
            treeDefaultExpandAll
          />
        </Form.Item>
        <ProFormText
          name="deptName"
          // initialValue={props.values.deptName}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.deptName.nameLabel',
            defaultMessage: 'deptName',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.postName.nameRules"
                  defaultMessage="Please enter postName!"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="leader"
          // initialValue={props.values.leader}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.leader.nameLabel',
            defaultMessage: 'leader',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.leader.nameRules"
                  defaultMessage="Please enter leader"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="phone"
          // initialValue={props.values.phone}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.phone.nameLabel',
            defaultMessage: 'phone',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.phone.nameRules"
                  defaultMessage="Please enter phone"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="email"
          // initialValue={props.values.email}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.email.nameLabel',
            defaultMessage: 'email',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.email.nameRules"
                  defaultMessage="Please enter email"
                />
              ),
            },
          ]}
        />
        <ProFormRadio.Group
          name="status"
          // initialValue={String(props.values.status || 2)}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.status.nameLabel',
            defaultMessage: '状态',
          })}
          width="md"
          request={async () => {
            return [
              { label: '正常', value: '2' },
              { label: '停用', value: '1' },
            ];
          }}
        />
        <ProFormDigit
          name="sort"
          // initialValue={props.values.sort}
          label={intl.formatMessage({
            id: 'pages.deptManage.updateForm.sort.nameLabel',
            defaultMessage: 'sort',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.deptManage.updateForm.postsortCode.nameRules"
                  defaultMessage="Please enter sort"
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

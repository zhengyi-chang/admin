import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  WaterMark,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl, useModel } from 'umi';

export type FormValueType = {} | Partial<API.OperationListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  // onChange:(allFields:any) => void;
  updateModalVisible: boolean;
  values: Partial<API.OperationListItem>;
  treeData: {}[] | undefined;
  title: string;
};

type State = {
  targetKeys: any;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const data = props.values;
  const { initialState } = useModel('@@initialState');
  const [menus, setMenus] = useState<Partial<API.OperationListItem>>({});

  const [form] = Form.useForm();
  const [state, setState] = useState<State>({ targetKeys: [] });

  useEffect(() => {
    setMenus(props.values);
    form.setFieldsValue(props.values);
    setState({ targetKeys: props.values.apis });
  }, [props.values]);

  return (
    <DrawerForm<API.OperationListItem>
      title={props.title}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
      }}
      width={900}
      form={form}
      initialValues={menus}
      visible={props.updateModalVisible}
      onFinishFailed={(error) => {
        error.errorFields.forEach((s) => {
          s.errors?.forEach((err) => {
            message.error(err);
          });
        });
      }}
      onFinish={async (values) => {
        if (props.values.menuId) {
          values.menuId = props.values.menuId;
        }
        values.apis = state.targetKeys;
        if (data.icon) {
          values.icon = data.icon;
        }
        values.component = props.values.component;
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProForm.Group>
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.name.nameLabel',
              defaultMessage: 'name',
            })}
            tooltip="名称"
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.operationManage.updateForm.name.nameRules"
                    defaultMessage="Please enter name"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="description"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.description.nameLabel',
              defaultMessage: 'description',
            })}
            tooltip="描述"
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.operationManage.updateForm.description.nameRules"
                    defaultMessage="Please enter description"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="link"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.link.nameLabel',
              defaultMessage: 'link',
            })}
            tooltip="链接"
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.operationManage.updateForm.link.nameRules"
                    defaultMessage="Please enter link"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="point"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.point.nameLabel',
              defaultMessage: 'point',
            })}
            tooltip="积分"
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.operationManage.updateForm.point.nameRules"
                    defaultMessage="Please enter point"
                  />
                ),
              },
            ]}
          />
          <ProFormDigit
            name="sort"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.sort.nameLabel',
              defaultMessage: 'sort',
            })}
            tooltip="根据序号升序排列"
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.operationManage.updateForm.sort.nameRules"
                    defaultMessage="Please enter sort"
                  />
                ),
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            name="type"
            radioType="radio"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.type.nameLabel',
              defaultMessage: 'type',
            })}
            tooltip="类型"
            width="md"
            options={initialState?.menuTypeSelectOption}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            name="status"
            radioType="radio"
            label={intl.formatMessage({
              id: 'pages.operationManage.updateForm.status.nameLabel',
              defaultMessage: 'status',
            })}
            tooltip="状态"
            width="md"
            options={initialState?.showHideSelectOption}
          />
        </ProForm.Group>
      </WaterMark>
    </DrawerForm>
  );
};

export default UpdateForm;

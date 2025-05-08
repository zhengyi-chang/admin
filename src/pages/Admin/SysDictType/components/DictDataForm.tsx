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
import { ProForm } from '@ant-design/pro-components';

export type FormValueType = {} & Partial<SysDictDataItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysDictDataItem>;
  title: string;
};

const DictDataForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (props.values.status) {
      props.values.status = props.values.status?.toString();
    } else {
      props.values.status = '2';
    }
    form.setFieldsValue(props.values);
  });
  return (
    <DrawerForm<SysDictDataItem>
      title={props.title}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
        style: { padding: '0 24', zIndex: 1200 },
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
        if (props.values.dictCode) {
          values.dictCode = props.values.dictCode;
        }
        // 如果有number的在这里做一下转换
        values.status = parseInt(values.status);
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        <ProFormText
          name="dictLabel"
          initialValue={props.values.dictLabel}
          label={intl.formatMessage({
            id: 'pages.sysDictDataManage.updateForm.dictLabel.nameLabel',
            defaultMessage: 'dictLabel',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictDataManage.updateForm.dictLabel.nameRules"
                  defaultMessage="Please enter dictLabel!"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="dictValue"
          initialValue={props.values.dictValue}
          label={intl.formatMessage({
            id: 'pages.sysDictDataManage.updateForm.dictValue.nameLabel',
            defaultMessage: 'dictValue',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictDataManage.updateForm.dictValue.nameRules"
                  defaultMessage="Please enter dictValue!"
                />
              ),
            },
          ]}
        />
        <ProFormDigit
          name="dictSort"
          initialValue={props.values.dictSort ?? 999}
          label={intl.formatMessage({
            id: 'pages.sysDictDataManage.updateForm.dictSort.nameLabel',
            defaultMessage: 'dictSort',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.sysDictDataManage.updateForm.dictSort.nameRules"
                  defaultMessage="Please enter dictSort!"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="dictType"
          initialValue={props.values.dictType}
          label={intl.formatMessage({
            id: 'pages.sysDictDataManage.updateForm.dictType.nameLabel',
            defaultMessage: 'dictType',
          })}
          width="md"
          disabled={true}
        />
        <ProForm.Group>
          <ProFormRadio.Group
            name="status"
            label={intl.formatMessage({
              id: 'pages.sysDictDataManage.updateForm.status.nameLabel',
              defaultMessage: '状态',
            })}
            width="md"
            options={initialState?.normalDisableSelectOption}
          />
        </ProForm.Group>
        <ProFormTextArea
          name="remark"
          initialValue={props.values.remark}
          label={intl.formatMessage({
            id: 'pages.sysDictDataManage.updateForm.remark.nameLabel',
            defaultMessage: 'remark',
          })}
          width="md"
          rules={[]}
        />
      </WaterMark>
    </DrawerForm>
  );
};

export default DictDataForm;

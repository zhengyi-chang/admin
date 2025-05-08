import React, { useState, useRef, useEffect } from 'react';
import { message, Modal, Tree } from 'antd';
import type { FormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDependency,
  ProFormDigit,
} from '@ant-design/pro-components';
import { useIntl, FormattedMessage, useModel } from 'umi';

export type FormValueType = {} & Partial<API.RoleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<boolean>;
  updateModalVisible: boolean;
  values: Partial<API.RoleListItem>;
  title: string;
  menuTreeData: any[] | undefined;
  deptTreeData: any[] | undefined;
  formRef: any;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [roleMenuData, setRoleMenuData] = useState<any[]>([]);
  const [roleDeptData, setRoleDeptData] = useState<any[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const onCheck = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheck', checkedKeys, info);
    setRoleMenuData(checkedKeys);
  };
  const onCheckDept = (checkedKeys: React.Key[], info: any) => {
    console.log('onCheckDept', checkedKeys, info);
    setRoleDeptData(checkedKeys);
  };

  props.formRef.current = {
    resetStep: () => {
      setCurrent(0);
    },
  };

  const formMapRef = useRef<React.MutableRefObject<FormInstance<any> | undefined>[]>([]);
  useEffect(() => {
    formMapRef.current.forEach((formInstanceRef) => {
      formInstanceRef.current?.setFieldsValue(props.values);
    });
  }, []);

  const onChange = (current: number) => {
    setCurrent(current);
  };

  return (
    <StepsForm
      formMapRef={formMapRef}
      stepsProps={{
        size: 'small',
      }}
      current={current}
      onCurrentChange={onChange}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={580}
            bodyStyle={{ padding: '32px 40px 48px' }}
            // forceRender={true}
            destroyOnClose={true}
            title={props.title}
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
              setCurrent(0);
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={async (values) => {
        if (props.values.roleId) {
          values.roleId = props.values.roleId;
        }
        values.menuIds = roleMenuData.length == 0 ? props.values.menuIds : roleMenuData;
        values.deptIds = roleDeptData.length == 0 ? props.values.deptIds : roleDeptData;
        props.onSubmit(values);
      }}
    >
      <StepsForm.StepForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.roleManage.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
        onFinishFailed={(error) => {
          error.errorFields.forEach((s) => {
            s.errors?.forEach((err) => {
              message.error(err);
            });
          });
        }}
      >
        <ProForm.Group>
          <ProFormText
            name="roleName"
            label={intl.formatMessage({
              id: 'pages.roleManage.updateForm.roleName.nameLabel',
              defaultMessage: '名称',
            })}
            width="sm"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.roleManage.updateForm.roleName.nameRules"
                    defaultMessage="请输入名称！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="roleKey"
            label={intl.formatMessage({
              id: 'pages.roleManage.updateForm.roleKey.nameLabel',
              defaultMessage: '代码',
            })}
            width="sm"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.roleManage.updateForm.roleKey.nameRules"
                    defaultMessage="请输入代码！"
                  />
                ),
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            name="roleSort"
            initialValue={props.values.roleSort}
            label={intl.formatMessage({
              id: 'pages.roleManage.updateForm.roleSort.nameLabel',
              defaultMessage: 'roleSort',
            })}
            width="sm"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.roleManage.updateForm.roleSort.nameRules"
                    defaultMessage="Please enter sort"
                  />
                ),
              },
            ]}
          />
          <ProFormRadio.Group
            name="status"
            initialValue={String(props.values.status || 2)}
            label={intl.formatMessage({
              id: 'pages.roleManage.updateForm.status.nameLabel',
              defaultMessage: '状态',
            })}
            width="sm"
            options={initialState?.normalDisableSelectOption}
          />
        </ProForm.Group>
        <ProFormTextArea
          name="remark"
          width="lg"
          label={intl.formatMessage({
            id: 'pages.roleManage.updateForm.remark.nameLabel',
            defaultMessage: '备注',
          })}
          placeholder={intl.formatMessage({
            id: 'pages.roleManage.updateForm.remark.Placeholder',
            defaultMessage: '请输入备注',
          })}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.roleManage.updateForm.menuStep.title',
          defaultMessage: '角色权限',
        })}
        onFinishFailed={(error) => {
          error.errorFields.forEach((s) => {
            s.errors?.forEach((err) => {
              message.error(err);
            });
          });
        }}
      >
        <Tree
          key="roleKey"
          checkable
          defaultCheckedKeys={props.values.menuIds}
          defaultSelectedKeys={props.values.menuIds}
          onCheck={onCheck}
          treeData={props.menuTreeData}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={props.values}
        title={intl.formatMessage({
          id: 'pages.roleManage.updateForm.dataStep.title',
          defaultMessage: '数据权限',
        })}
      >
        <ProFormSelect
          name="dataScope"
          label={intl.formatMessage({
            id: 'pages.roleManage.updateForm.dataScope',
            defaultMessage: '范围',
          })}
          width="md"
          options={initialState?.scopeTypeSelectOption}
        />
        <ProFormDependency name={['dataScope']}>
          {({ dataScope }) => {
            if (dataScope === '2') {
              return (
                <Tree
                  key="deptKey"
                  checkable
                  defaultCheckedKeys={props.values.deptIds}
                  defaultSelectedKeys={props.values.deptIds}
                  onCheck={onCheckDept}
                  treeData={props.deptTreeData}
                />
              );
            }
            return;
          }}
        </ProFormDependency>
      </StepsForm.StepForm>
    </StepsForm>
    // </ModalForm>
  );
};

export default UpdateForm;

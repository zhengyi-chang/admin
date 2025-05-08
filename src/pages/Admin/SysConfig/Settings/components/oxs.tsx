import { optionDictDataSelect } from '@/services/ant-design-pro/api';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, message, Row } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
import { getSysConfig, updateSysConfig } from '../service';
import styles from './BaseView.less';

const OxsView: React.FC = () => {
  const { data: currentConfig, loading } = useRequest(() => {
    return getSysConfig();
  });

  /**
   * @en-US Update SysConfig
   * @zh-CN 更新系统参数配置
   *
   * @param fields
   */
  const handleFinish = async (values: any) => {
    const hide = message.loading('Configuring');
    values.oxs_enable = String(values.oxs_enable);
    values.oxs_provisional_auth = String(values.oxs_provisional_auth);

    try {
      const result = await updateSysConfig({ ...values });
      hide();
      if (result.success) {
        message.success('Update SysConfig is successful');
        return true;
      }
      return false;
    } catch (error) {
      hide();
      message.error('Update SysConfig failed, please try again!');
      return false;
    }
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <ProForm
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{
              ...currentConfig,
            }}
            hideRequiredMark
          >
            <Row gutter={24}>
              <ProFormDependency name={['oxs_enable']}>
                {({ oxs_enable }) => {
                  if (oxs_enable != '是' && !oxs_enable) {
                    return <></>;
                  }
                  return (
                    <>
                      <Col md={16}>
                        <ProFormSelect
                          name="oxs_type"
                          label="云存储"
                          fieldProps={{ defaultValue: 'oss' }}
                          request={async () => [
                            { label: '阿里云OSS', value: 'oss' },
                            { label: '华为云OBS', value: 'obs' },
                            { label: '腾讯云COS', value: 'cos' },
                            { label: '七牛Kodo', value: 'kodo' },
                          ]}
                          placeholder="请选择云存储!"
                          rules={[{ required: true, message: '请选择云存储!' }]}
                        />
                      </Col>
                      <ProFormDependency name={['oxs_type']}>
                        {({ oxs_type }) => {
                          if (oxs_type === 'oss' || oxs_type === 'obs' || oxs_type === 'cos') {
                            return (
                              <Col md={8}>
                                <ProFormSwitch
                                  name="oxs_provisional_auth"
                                  label="上传方式"
                                  fieldProps={{
                                    unCheckedChildren: 'ak/sk',
                                    checkedChildren: '临时授权',
                                  }}
                                />
                              </Col>
                            );
                          } else {
                            return <></>;
                          }
                        }}
                      </ProFormDependency>
                      <ProFormDependency name={['oxs_type']}>
                        {({ oxs_type }) => {
                          if (oxs_type === 'obs') {
                            return (
                              <Col md={12}>
                                <ProFormText
                                  name="oxs_access_domain"
                                  label="访问域名"
                                  tooltip="回调使用"
                                  rules={[
                                    {
                                      required: true,
                                      message: '请输入访问域名!',
                                    },
                                  ]}
                                />
                              </Col>
                            );
                          } else {
                            return <></>;
                          }
                        }}
                      </ProFormDependency>
                      <ProFormDependency name={['oxs_provisional_auth', 'oxs_type']}>
                        {({ oxs_provisional_auth, oxs_type }) => {
                          if (
                            !oxs_provisional_auth ||
                            oxs_type == 'oss' ||
                            oxs_type == 'cos' ||
                            oxs_type == 'kodo'
                          ) {
                            return (
                              <>
                                <Col md={12}>
                                  <ProFormText
                                    name="oxs_access_key"
                                    label="AK"
                                    tooltip="AccessKeyId"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入AK!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormText
                                    name="oxs_secret_key"
                                    label="SK"
                                    tooltip="accessKeySecret"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入Secret!',
                                      },
                                    ]}
                                  />
                                </Col>
                              </>
                            );
                          }
                        }}
                      </ProFormDependency>
                      <ProFormDependency name={['oxs_provisional_auth', 'oxs_type']}>
                        {({ oxs_provisional_auth, oxs_type }) => {
                          if (oxs_provisional_auth && oxs_type == 'oss') {
                            return (
                              <>
                                <Col md={12}>
                                  <ProFormText
                                    name="obx_oss_role_arn"
                                    label="⻆⾊ARN"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入⻆⾊ARN!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormText
                                    name="obx_oss_role_session_name"
                                    label="RAM⻆⾊名称"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入IAM密码!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormDigit
                                    name="oxs_duration_seconds"
                                    label="持续时间(单位:秒)"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入持续时间!',
                                      },
                                    ]}
                                  />
                                </Col>
                              </>
                            );
                          } else if (oxs_provisional_auth && oxs_type == 'obs') {
                            return (
                              <>
                                <Col md={12}>
                                  <ProFormText
                                    name="oxs_obs_username"
                                    label="用户账号"
                                    tooltip="⽤于临时授权账号"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入IAM账号!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormText
                                    name="oxs_obs_password"
                                    label="用户密码"
                                    tooltip="⽤于临时授权密码"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入IAM密码!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormText
                                    name="oxs_obs_endpoint"
                                    label="对象端点"
                                    tooltip="这是个域名"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入端点!',
                                      },
                                    ]}
                                  />
                                </Col>
                                <Col md={12}>
                                  <ProFormDigit
                                    name="oxs_duration_seconds"
                                    label="持续时间(单位:秒)"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入持续时间!',
                                      },
                                    ]}
                                  />
                                </Col>
                              </>
                            );
                          } else if (oxs_provisional_auth && oxs_type == 'cos') {
                            return (
                              <>
                                <Col md={12}>
                                  <ProFormDigit
                                    name="oxs_duration_seconds"
                                    label="持续时间(单位:秒)"
                                    rules={[
                                      {
                                        required: true,
                                        message: '请输入持续时间!',
                                      },
                                    ]}
                                  />
                                </Col>
                              </>
                            );
                          }
                        }}
                      </ProFormDependency>

                      <Col md={12}>
                        <ProFormSelect
                          name="oxs_region"
                          label="地区"
                          rules={[
                            {
                              required: true,
                              message: '请输入Secret!',
                            },
                          ]}
                          dependencies={['oxs_type']}
                          request={(params) => {
                            var dictTypeStr = 'oxs_oss_region';
                            if (params.oxs_type === 'oss') {
                              dictTypeStr = 'oxs_oss_region';
                            } else if (params.oxs_type === 'obs') {
                              dictTypeStr = 'oxs_obs_region';
                            } else if (params.oxs_type === 'kodo') {
                              dictTypeStr = 'oxs_kodo_region';
                            }
                            return optionDictDataSelect({ dictType: dictTypeStr }).then(
                              ({ data }) => {
                                if (!data) {
                                  return [];
                                }
                                return data?.map((item) => {
                                  return {
                                    label: item.label,
                                    value: item.value,
                                  };
                                });
                              },
                            );
                          }}
                        />
                      </Col>
                      <Col md={12}>
                        <ProFormText
                          name="oxs_bucket"
                          label="桶"
                          tooltip="Bucket"
                          rules={[
                            {
                              required: true,
                              message: '请输入桶!',
                            },
                          ]}
                        />
                      </Col>
                      <ProFormDependency name={['oxs_type']}>
                        {({ image_oxs_type }) => {
                          if (image_oxs_type === 'kodo') {
                            return (
                              <Col md={12}>
                                <ProFormTextArea
                                  name="oxs_parameter"
                                  label="Parameter"
                                  tooltip="参数:json"
                                />
                              </Col>
                            );
                          } else {
                            return null;
                          }
                        }}
                      </ProFormDependency>
                    </>
                  );
                }}
              </ProFormDependency>
              <Col md={24} lg={24}>
                <ProFormSwitch
                  name="oxs_enable"
                  label="启用对象存储"
                  fieldProps={{
                    checkedChildren: '启用',
                    unCheckedChildren: '停用',
                    defaultChecked: currentConfig.oxs_enable == '是' ? true : false,
                  }}
                />
              </Col>
            </Row>
          </ProForm>
        </>
      )}
    </div>
  );
};
export default OxsView;

import React from 'react';
import { message, Alert } from 'antd';
import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import { getSysConfig, updateSysConfig } from '../service';

import styles from './BaseView.less';

const NotificationView: React.FC = () => {
  const { data: currentConfig, loading } = useRequest(() => {
    return getSysConfig();
  });

  const handleFinish = async (values: any) => {
    const hide = message.loading('Configuring');
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
            <ProFormSelect
              name="sys_notification_type"
              label="通知类型"
              fieldProps={{ defaultValue: 'wechartWork' }}
              request={async () => [
                { label: '企业微信', value: 'wechartWork' },
                { label: '钉钉', value: 'dingding' },
              ]}
              width="md"
              placeholder="请选择通知媒体类型"
              rules={[{ required: true, message: '请选择通知媒体类型!' }]}
            />

            <ProFormText
              width="md"
              name="sys_wechat_webhook"
              label="webhook"
              tooltip="错误提醒机器人Webhook地址。"
              rules={[
                {
                  required: true,
                  message: '请输入webhook!',
                },
              ]}
            />

            <ProFormDependency name={['sys_notification_type']}>
              {({ sys_notification_type }) => {
                if (sys_notification_type === 'dingding') {
                  return (
                    <Alert
                      message="如何创建钉钉机器人，请访问：https://open.dingtalk.com/document/robots/custom-robot-access "
                      type="info"
                      showIcon
                      style={{ marginBottom: '20px' }}
                    />
                  );
                } else if (sys_notification_type === 'wechartWork') {
                  return (
                    <Alert
                      message="如何创建企业微信群机器人，请访问：https://developer.work.weixin.qq.com/tutorial/robot/2 "
                      type="info"
                      showIcon
                      style={{ marginBottom: '20px' }}
                    />
                  );
                } else {
                  return (
                    <Alert
                      message="如何创建企业微信群机器人，请访问：https://developer.work.weixin.qq.com/tutorial/robot/2 "
                      type="info"
                      showIcon
                      style={{ marginBottom: '20px' }}
                    />
                  );
                }
              }}
            </ProFormDependency>
          </ProForm>
        </>
      )}
    </div>
  );
};
export default NotificationView;

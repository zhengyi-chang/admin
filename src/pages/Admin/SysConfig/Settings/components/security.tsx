import React from 'react';
import { message } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import { getSysConfig, updateSysConfig } from '../service';

import styles from './BaseView.less';

const SecurityView: React.FC = () => {
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
          <div className={styles.left}>
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
              <ProFormText.Password
                width="md"
                name="sys_user_initPassword"
                label="初始化密码"
                tooltip="用户注册时默认的密码。"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
            </ProForm>
          </div>
        </>
      )}
    </div>
  );
};
export default SecurityView;

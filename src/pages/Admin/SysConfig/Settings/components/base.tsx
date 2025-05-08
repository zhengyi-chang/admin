import React from 'react';
import { message } from 'antd';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import { getSysConfig, updateSysConfig } from '../service';

import styles from './BaseView.less';

const BaseView: React.FC = () => {
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
              <ProFormText
                width="md"
                name="sys_app_name"
                label="app名称"
                rules={[
                  {
                    required: true,
                    message: '请输入app名称!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="sys_site_logo"
                label="站点标志"
                rules={[
                  {
                    required: true,
                    message: '请输入站点标志!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="sys_site_favicon"
                label="站点徽标"
                tooltip="一般显示在浏览器tab标签位置"
                rules={[
                  {
                    required: true,
                    message: '请输入站点徽标!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="sys_user_avatar"
                label="用户头像"
                rules={[
                  {
                    required: true,
                    message: '请输入用户头像!',
                  },
                ]}
              />
              <ProFormText width="md" name="sys_site_desc" label="站点描述" />

              <ProFormText
                width="md"
                name="sys_index_sideTheme"
                label="边栏样式"
                rules={[
                  {
                    required: true,
                    message: '请输入边栏样式!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="sys_index_skinName"
                label="皮肤样式"
                rules={[
                  {
                    required: true,
                    message: '请输入皮肤样式!',
                  },
                ]}
              />
              <ProFormTextArea name="sys_app_desc" label="应用说明" placeholder="应用说明" />
            </ProForm>
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;

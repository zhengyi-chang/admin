import React, { useState } from 'react';
import { List, message } from 'antd';
import type { FormValueType } from './UpdatePwd';
import UpdatePwdForm from './UpdatePwd';
import { useIntl } from 'umi';
import { updateUserPassword } from '../service';
import { UpdatePwd } from '../data';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

/**
 * @en-US Update User Password
 * @zh-CN 更新用户密码
 *
 * @param fields
 */
const handleUpdateUserPassword = async (fields: FormValueType) => {
  const hide = message.loading('Reset User Password...');
  try {
    const result = await updateUserPassword({ ...fields });
    hide();
    if (result.success) {
      message.success('Reset User Password is successful');
      return true;
    }
    return false;
  } catch (error) {
    hide();
    message.error('Reset User Password failed, please try again!');
    return false;
  }
};

const SecurityView: React.FC = () => {
  const intl = useIntl();
  const [updatePwdModalVisible, setUpdatePwdModalVisible] = useState<boolean>(false);

  const getData = () => [
    {
      title: '账户密码',
      description: (
        <>
          当前密码强度：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a
          key="Modify"
          onClick={() => {
            setUpdatePwdModalVisible(true);
          }}
        >
          修改
        </a>,
      ],
    },
    //
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <UpdatePwdForm
        onSubmit={async (value) => {
          const success = await handleUpdateUserPassword(value as UpdatePwd);
          if (success) {
            setUpdatePwdModalVisible(false);
          }
        }}
        onCancel={() => {
          setUpdatePwdModalVisible(false);
        }}
        updateModalVisible={updatePwdModalVisible}
        values={{}}
        title={intl.formatMessage({
          id: 'app.settings.security.update-password',
          defaultMessage: 'Update Password',
        })}
      />
    </>
  );
};

export default SecurityView;

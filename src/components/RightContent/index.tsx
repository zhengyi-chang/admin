import { Space } from 'antd';
import React from 'react';
import { SelectLang, useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      {/* <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="go-admin"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="go-admin.dev">Go-admin</a>,
            value: 'go-admin',
          },
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
      /> */}
      {/* <span
        className={styles.action}
        onClick={() => {
          window.open('https://doc.go-admin.dev');
        }}
      >
        <QuestionCircleOutlined />
      </span> */}
      {/* <NoticeIcon /> */}
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;

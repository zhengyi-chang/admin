import type { FC } from 'react';
import { Avatar, Skeleton } from 'antd';
import { useModel } from 'umi';
import { PageContainer } from '@ant-design/pro-components';
import styles from './style.less';
import type { CurrentUser } from './data';

const PageHeaderContent: FC<{ currentUser: Partial<CurrentUser> }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>欢迎使用go-admin-pro开启您的解放双手之旅！</div>
      </div>
    </div>
  );
};

const Workplace: FC = () => {
  const { initialState } = useModel('@@initialState');

  return (
    <PageContainer content={<PageHeaderContent currentUser={initialState?.currentUser ?? {}} />} />
  );
};

export default Workplace;

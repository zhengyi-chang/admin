import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'go-admin 出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Go-admin Pro',
          title: 'Go-admin Pro',
          href: 'https://github.com/go-admin-team/go-admin',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/go-admin-team/go-admin',
          blankTarget: true,
        },
        {
          key: 'Go-admin',
          title: 'Go-admin',
          href: 'https://preview.go-admin.dev/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

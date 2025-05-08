import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Input, message } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { getImgCode } from '@/services/ant-design-pro/api';
import { useIntl } from 'umi';
import styles from '../index.less';
import { isEmpty } from '@/utils/string';

interface CaptchaInputValue {
  captchaCode?: string;
  captchaKey?: string;
}

interface CaptchaInputProps {
  value?: CaptchaInputValue;
  onChange?: (value: CaptchaInputValue) => void;
  cRef?: any;
}

/**
 * 获取验证码
 */
const getCaptcha = async () => {
  try {
    const data = await getImgCode();
    if (data.success) {
      return data;
    }
  } catch (error) {
    message.error('获取验证码失败,请重试');
    return [];
  }
  message.error('获取验证码失败,请重试');
  return [];
};

const CaptchaInput: React.FC<CaptchaInputProps> = (props) => {
  const intl = useIntl();
  const [captchaCode, setCaptchaCode] = useState<string>('');
  const [captchaKey, setCaptchaKey] = useState<string>('');
  const [imageData, setImageData] = useState<string>('');

  // 触发改变
  const triggerChange = (changedValue: { captchaCode?: string; captchaKey?: string }) => {
    if (props.onChange) {
      props.onChange({ captchaCode, captchaKey, ...props.value, ...changedValue });
    }
  };
  useImperativeHandle(props.cRef, () => ({
    refresh: () => {
      onClickImage();
    },
  }));

  useEffect(() => {
    getCaptcha().then((data: any) => {
      setCaptchaKey(data.id);
      setImageData(data.data);
      triggerChange({ captchaKey: data.id });
    });
  }, []);

  // 输入框变化
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value || '';
    if (!isEmpty(code)) {
      setCaptchaCode(code);
    }
    triggerChange({ captchaCode: code });
  };

  // 时间类型变化
  const onClickImage = () => {
    getCaptcha().then((data: any) => {
      setCaptchaKey(data.id);
      setImageData(data.data);
      triggerChange({ captchaKey: data.id });
    });
  };

  return (
    <span>
      <Input.Group compact>
        <Input
          prefix={<SafetyCertificateOutlined className={styles.prefixIcon} />}
          size={'large'}
          placeholder={intl.formatMessage({
            id: 'pages.login.captcha.placeholder',
            defaultMessage: '请输入验证码',
          })}
          onChange={onChangeInput}
          style={{
            width: '75%',
            marginRight: 5,
            padding: '6.5px 11px 6.5px 11px',
            verticalAlign: 'middle',
          }}
        />
        <img
          style={{
            width: '23%',
            height: '39px',
            verticalAlign: 'middle',
            padding: '0px 0px 0px 0px',
          }}
          src={imageData}
          onClick={onClickImage}
        />
      </Input.Group>
    </span>
  );
};
export default CaptchaInput;

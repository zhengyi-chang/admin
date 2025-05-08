import { uploadOSS } from './AliOss';
import { uploadOBS } from './HuaweiObs';
import { uploadCOS } from './TencentCos';
import { uploadKODO } from './qiniuKodo';
import { getOXS } from './service';
import { message } from 'antd';

export default function useOxs() {
  async function uploadOXS() {
    const { data } = await getOXS();
    // 判断是否开启对象存储
    if (data.enable === true) {
      // 临时秘钥需要判断状态，防止因为配置错误傻乎乎找前端或后端问题
      // 当临时秘钥为 true 时则下一步
      // 当上传方式为 通过 ak/sk 上传时则 false
      if (data.status == true || data.provisionalAuth == false) {
        // 判断存储类型
        switch (data.oxsType) {
          case 'obs':
            return uploadOBS(data);
          case 'oss':
            return uploadOSS(data);
          case 'kodo':
            return uploadKODO(data);
          case 'cos':
            return uploadCOS(data);
          default:
            return false;
        }
      } else {
        message.error('对象存储配置错误 \n' + data.message);
        return false;
      }
    } else {
      return false;
    }
  }
  return {
    uploadOXS,
  };
}

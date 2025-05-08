import OSS from 'ali-oss';
import { random_name } from './tools';

/**
 * @desc 阿里云 OSS 封装
 * @param {Object} access_key
 * @returns { uploadFile }
 */
export function uploadOSS(oxs) {
  let clientOSS;
  // 判断临时认证方式还是AK/SK方式
  // true 临时秘钥认证 上传
  // false ak/ak 上传
  if (oxs.provisionalAuth == false) {
    clientOSS = new OSS({
      // Bucket所在地域
      region: oxs.region,
      // 填写Bucket名称。
      bucket: oxs.bucket,
      // RAM 用户 ak
      accessKeyId: oxs.accessKey,
      // RAM 用户 sk
      accessKeySecret: oxs.secretKey,
    });
  } else {
    clientOSS = new OSS({
      // Bucket所在地域
      region: oxs.region,
      // 填写Bucket名称。
      bucket: oxs.bucket,
      // 从STS服务获取的临时访问密钥 AccessKeyId
      accessKeyId: oxs.credential.AccessKeyId,
      // 从STS服务获取的临时访问密钥 AccessKeySecret
      accessKeySecret: oxs.credential.AccessKeySecret,
      // 从STS服务获取的安全令牌
      stsToken: oxs.credential.SecurityToken,
    });
  }

  /**
   * @desc 文件上传
   * @param {File} file
   * @param {String} [path = ''] - File upload path
   * @param {Function} [fileProgress = (transferredAmount, totalAmount, totalSeconds) => void] - File progress callback
   */
  function uploadFile(file, path = '', fileProgress = () => {}) {
    // 参考文档 https://blog.csdn.net/weixin_52921391/article/details/120515008
    return new Promise(async (resolve, reject) => {
      if (file instanceof File) {
        const fileSuffix = file.name.split('.');
        // const obj = {
        //   'image/jpeg': 'jpeg',
        //   'image/jpg': 'jpg',
        //   'image/png': 'png',
        //   'image/bmp': 'bmp',
        //   'application/vnd.android.package-archive': 'apk',
        // };
        const imgName = `${random_name()}.${fileSuffix[fileSuffix.length - 1]}`; // 这里需要注意obj[file.type，这里是动态
        // const imgName = `${random_name()}.${obj[file.type]}`; // 这里需要注意obj[file.type，这里是动态
        const options = {
          progress: (p, cpt, res) => {
            console.log(p);
          },
          partSize: 1024 * 1024,
        };
        try {
          const res = await clientOSS.put(`${path}/${imgName}`, file);
          resolve(res.url);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }

  return uploadFile;
}

import ObsClient from 'esdk-obs-browserjs';
import { random_name } from './tools';

interface OxsConfig {
  provisionalAuth: boolean;
  accessKey: string;
  secretKey: string;
  endpoint: string;
  bucket: string;
  accessDomain: string;
  credential?: {
    access: string;
    secret: string;
    securitytoken: string;
  };
}

/**
 * @desc 华为云 OBS 封装
 * @param {Object} access_key
 * @returns { uploadFile }
 */

export function uploadOBS(oxs: OxsConfig) {
  let clientOBS: ObsClient;
  // 判断临时认证方式还是AK/SK方式
  // true 临时秘钥认证 上传
  // false ak/ak 上传
  if (oxs.provisionalAuth == false) {
    clientOBS = new ObsClient({
      // 永久 AK
      access_key_id: oxs.accessKey,
      // 永久 SK
      secret_access_key: oxs.secretKey,
      // 端点地址
      server: oxs.endpoint,
    });
  } else {
    clientOBS = new ObsClient({
      // AK
      access_key_id: oxs.credential!.access,
      // 临时 SK
      secret_access_key: oxs.credential!.secret,
      // 临时访问 Token
      security_token: oxs.credential!.securitytoken,
      // 端点地址
      server: oxs.endpoint,
    });
  }

  /**
   * @desc 文件上传
   * @param {File} file
   * @param {String} [path = ''] - File upload path
   * @param {Function} [fileProgress = (progress: number) => void] - File progress callback
   */
  function uploadFile(file: File, path = '', fileProgress: (progress: number) => void = () => {}) {
    return new Promise<string>((resolve, reject) => {
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
        clientOBS.putObject(
          {
            Bucket: oxs.bucket,
            Key: `${path}/${imgName}`,
            SourceFile: file,
            ProgressCallback: (transferredAmount: number, totalAmount: number) => {
              fileProgress(transferredAmount / totalAmount);
            },
          },
          (err, result) => {
            if (err) {
              reject(new Error(err));
            } else {
              // 判断有没有路径
              let filePath;
              if (path == '') {
                // 没有路径
                filePath = oxs.accessDomain + `/${imgName}`;
              } else {
                // 有路径
                filePath = oxs.accessDomain + `/${path}/${imgName}`;
              }
              resolve(filePath);
            }
          },
        );
      } else {
        reject(new Error('file is not a File'));
      }
    });
  }

  return uploadFile;
}

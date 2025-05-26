import COS from 'cos-js-sdk-v5';
import { random_name } from './tools';

interface OxsConfig {
  provisionalAuth: boolean;
  accessKey?: string;
  secretKey?: string;
  credential?: {
    TmpSecretId: string;
    TmpSecretKey: string;
    Token: string;
  };
  ExpiredTime?: number;
  bucket: string;
  region: string;
}

interface ProgressData {
  loaded: number;
  total: number;
  speed: number;
  percent: number;
}

interface CosResult {
  statusCode: number;
  Location: string;
}

/**
 * @desc 腾讯云 COS 封装
 * @param {OxsConfig} oxs - 配置信息
 * @returns { uploadFile }
 */
export function uploadCOS(oxs: OxsConfig) {
  let clientCOS: any;
  // 判断临时认证方式还是AK/SK方式
  // true 临时秘钥认证 上传
  // false ak/ak 上传
  if (oxs.provisionalAuth == false) {
    clientCOS = new COS({
      SecretId: oxs.accessKey,
      SecretKey: oxs.secretKey,
    });
  } else {
    clientCOS = new COS({
      SecretId: oxs.credential?.TmpSecretId,
      SecretKey: oxs.credential?.TmpSecretKey,
      XCosSecurityToken: oxs.credential?.Token,
      ExpiredTime: oxs.ExpiredTime,
    });
  }

  /**
   * @desc 文件上传
   * @param {File} file
   * @param {String} [path = ''] - File upload path
   * @param {Function} [fileProgress = (percent: number) => void] - File progress callback
   */
  function uploadFile(file: File, path = '', fileProgress: (percent: number) => void = () => {}) {
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
        clientCOS.putObject(
          {
            Bucket: oxs.bucket, // 存储桶名称
            Region: oxs.region, // 地区
            Key: `${path}/${imgName}`, // 图片名称
            Body: file,
            onHashProgress: function (progressData: ProgressData) {
              console.log('校验中', JSON.stringify(progressData));
            },
            onProgress: function (progressData: ProgressData) {
              fileProgress(progressData.percent);
            },
          },
          function (err: Error | null, result: CosResult) {
            if (!err) {
              if (result.statusCode == 200) {
                resolve(`http://${result.Location}`);
              }
            }
          },
        );
      }
    });
  }

  return uploadFile;
}

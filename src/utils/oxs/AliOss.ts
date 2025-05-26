import OSS from 'ali-oss';
import { random_name } from './tools';

interface OxsConfig {
  provisionalAuth: boolean;
  region: string;
  bucket: string;
  accessKey?: string;
  secretKey?: string;
  credential?: {
    AccessKeyId: string;
    AccessKeySecret: string;
    SecurityToken: string;
  };
}

interface FileProgressCallback {
  (transferredAmount: number, totalAmount: number, totalSeconds: number): void;
}

type UploadFileFunction = (
  file: File,
  path?: string,
  fileProgress?: FileProgressCallback,
) => Promise<string>;

/**
 * @desc 阿里云 OSS 封装
 * @param {OxsConfig} oxs - OSS配置信息
 * @returns {UploadFileFunction} 文件上传函数
 */
export function uploadOSS(oxs: OxsConfig): UploadFileFunction {
  let clientOSS: OSS;
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
      accessKeyId: oxs.credential?.AccessKeyId,
      // 从STS服务获取的临时访问密钥 AccessKeySecret
      accessKeySecret: oxs.credential?.AccessKeySecret,
      // 从STS服务获取的安全令牌
      stsToken: oxs.credential?.SecurityToken,
    });
  }

  /**
   * @desc 文件上传
   * @param {File} file - 上传的文件对象
   * @param {string} [path = ''] - 文件上传路径
   * @param {FileProgressCallback} [fileProgress] - 文件上传进度回调
   * @returns {Promise<string>} 返回上传后的文件URL
   */
  function uploadFile(
    file: File,
    path = '',
    fileProgress: FileProgressCallback = () => {},
  ): Promise<string> {
    // 参考文档 https://blog.csdn.net/weixin_52921391/article/details/120515008
    return new Promise<string>((resolve, reject) => {
      if (!(file instanceof File)) {
        reject(new Error('上传的对象不是文件类型'));
        return;
      }

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
        progress: (p: number, cpt: any, res: any) => {
          console.log(p);
          fileProgress(p, file.size, 0);
        },
        partSize: 1024 * 1024,
      };

      clientOSS
        .put(`${path}/${imgName}`, file, options)
        .then((res) => {
          resolve(res.url);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  return uploadFile;
}

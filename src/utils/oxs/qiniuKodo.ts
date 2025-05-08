import { random_name } from './tools';
import * as qiniu from 'qiniu-js';

/**
 * @desc 七牛云 Kodo 封装
 * @param {Object} access_key
 * @returns { uploadFile }
 */

//  文档地址 https://developer.qiniu.com/kodo/1283/javascript
export function uploadKODO(oxs) {
  /**
   * @desc 文件上传
   * @param {File} file
   * @param {String} [path = ''] - File upload path
   * @param {Function} [fileProgress = (transferredAmount, totalAmount, totalSeconds) => void] - File progress callback
   */
  function uploadFile(file, path = '', fileProgress = () => {}) {
    return new Promise((resolve: string, reject) => {
      if (file instanceof File) {
        const obj = {
          'image/jpeg': 'jpeg',
          'image/jpg': 'jpg',
          'image/png': 'png',
          'image/bmp': 'bmp',
        };
        // 这里需要注意obj[file.type，这里是动态
        const imgName = `${random_name()}.${obj[file.type]}`;

        let putExtra = {
          // 文件原文件名
          fname: '',
          // 用来放置自定义变量
          params: {},
          //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
          mimeType: [],
        };
        // 构建配置类
        let config = {
          // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
          useCdnDomain: true,
          // 是否禁用日志报告，为布尔值，默认为 false。
          disableStatisticsReport: false,
          // 上传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）。
          retryCount: 3,
          // 选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域。
          // 华东	qiniu.zone.Zone_z0
          // 华北	qiniu.zone.Zone_z1
          // 华南	qiniu.zone.Zone_z2
          // 北美	qiniu.zone.Zone_na0
          // region: qiniu.region.z0
          region: null,
          // 是否开启 MD5 校验，为布尔值；在断点续传时，开启 MD5 校验会将已上传的分片与当前分片进行 MD5 值比对，若不一致，则重传该分片，避免使用错误的分片。读取分片内容并计算 MD5 需要花费一定的时间，因此会稍微增加断点续传时的耗时，默认为 false，不开启。
          checkByMD5: true,
          // 分片上传时每片的大小
          chunkSize: 4,
        };

        var observable = qiniu.upload(file, `${path}/${imgName}`, oxs.token, putExtra, config);
        observable.subscribe({
          next: (result) => {
            // 主要用来展示进度
            fileProgress(result.total.percent / 100);
          },
          error: (errResult) => {
            // 失败报错信息
            reject(errResult);
          },
          complete: (result) => {
            // 接收成功后返回的信息
            resolve(oxs.accessDomain + '/' + result.key);
          },
        });
      } else {
        reject(new Error('file is not a File'));
      }
    });
  }

  return uploadFile;
}

import { ProFormUploadDragger, ProFormUploadButton } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import useOxs from '../../utils/oxs/';

export default function OxsDemo() {
  const [uploadProgress, setUploadProgress] = useState<{}>({});
  const { uploadOXS } = useOxs();

  return (
    <>
      <ProFormUploadButton
        label="upload"
        name="upload"
        fieldProps={{
          progress: uploadProgress,
        }}
        action={async (file) => {
          const uploadFile = await uploadOXS();
          if (uploadFile) {
            uploadFile(file, 'temp', (res) => {
              setUploadProgress(res);
              console.log(res * 100);
              setUploadProgress({
                uid: file,
                percent: parseInt(res * 100),
                name: file,
                status: 'uploading',
              });
            }).then((res) => {
              console.log('then', res);
              setUploadProgress({
                uid: file,
                percent: 1,
                name: file,
                status: 'success',
              });
              return res;
            });
          } else {
            message.error('图片上传功能暂时无法使用');
          }

          return '';
        }}
        onChange={(file) => {
          console.log('onChange', file);
          const event = file.event;

          if (event) {
            // 一定要加判断，不然会报错
            this.setState({ percent: 30 });
            console.log(uploadProgress); // percent就是进度条的数值
          }
        }}
      />

      <ProFormUploadButton
        label="upload"
        name="upload"
        onSuccess={(res, file) => {
          console.log('onSuccess', res, file.name);
        }}
        onError={(err) => {
          console.log('onError', err);
        }}
        onProgress={({ percent }, file) => {
          console.log('onProgress', `${percent}%`, file.name);
        }}
        customRequest={async (uploadOption) => {
          uploadOption.action = async (option) => {
            const uploadFile = await uploadOXS();
            if (uploadFile) {
              uploadFile(option.file, 'temp', (res) => {
                setUploadProgress(res);
                console.log(res * 100);
                option.onProgress({ percent: parseInt(res * 100) }, option.file);
              }).then((res) => {
                console.log('then', res);
                option.onSuccess(res, option.file);
              });
            } else {
              message.error('图片上传功能暂时无法使用');
            }
          };
        }}
        onChange={(file) => {
          console.log('onChange', file);
          if (file.event) {
            file.event.percent = uploadProgress?.percent;
          }
          return file;
        }}
      />
    </>
  );
}

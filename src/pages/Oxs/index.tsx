import { ProFormUploadDragger, ProFormUploadButton } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import useOxs from '../../utils/oxs/';

export default function OxsDemo() {
  const [percent, setPercent] = useState<{}>({});
  const { uploadOXS } = useOxs();

  return (
    <>
      <ProFormUploadButton
        label="upload"
        name="upload"
        fieldProps={{
          progress: percent,
        }}
        action={async (file) => {
          var uploadFile = await uploadOXS();
          if (uploadFile) {
            uploadFile(file, 'temp', (res) => {
              setPercent(res);
              console.log(res * 100);
              setPercent({
                uid: file,
                percent: parseInt(res * 100),
                name: file,
                status: 'uploading',
              });
            }).then((res) => {
              console.log('then', res);
              setPercent({
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
            console.log(percent); // percent就是进度条的数值
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
        customRequest={async (option) => {
          option.action = async (option) => {
            var uploadFile = await uploadOXS();
            if (uploadFile) {
              uploadFile(option.file, 'temp', (res) => {
                setPercent(res);
                console.log(res * 100);
                // setPercent({
                //     uid: file,
                //     percent: parseInt(res * 100),
                //     name: file,
                //     status: 'uploading',
                // })
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
        // action={async (file) => {
        //     var uploadFile = await uploadOXS()
        //     if (uploadFile) {
        //         uploadFile(file, "temp", (res) => {
        //             setPercent(res)
        //             console.log(res * 100)
        //             setPercent({
        //                 uid: file,
        //                 percent: parseInt(res * 100),
        //                 name: file,
        //                 status: 'uploading',
        //             })
        //         }).then((res) => {
        //             console.log("then", res)
        //             setPercent({
        //                 uid: file,
        //                 percent: 1,
        //                 name: file,
        //                 status: 'success',
        //             })
        //             return res
        //         })
        //     } else {
        //         message.error('图片上传功能暂时无法使用')
        //     };

        //     return ""
        // }}
        onChange={(file) => {
          console.log('onChange', file);
          if (file.event) {
            file.event.percent = percent?.percent;
          }
          return file;
        }}
      />
    </>
  );
}

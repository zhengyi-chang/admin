import React, { useState } from 'react';
import { Upload, message, List, Button, Image, Tag, Spin, Typography, Modal, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
// 第三方上传sdk
import useOxs from '../../utils/oxs/';
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import copy from 'copy-to-clipboard';
import './index.less';

interface FileItem {
  uid: string;
  filename: string;
  status?: string;
  thumbUrl?: string;
  url?: string;
  percent?: number;
  lastModifiedTime?: string;
}

const handleCopy = (text?: string) => {
  if (text && copy(text)) return message.success('复制成功');
  message.error('复制失败, 请重试或者用自己动手吧');
};

function upload2Item(uploadFile: UploadFile): FileItem {
  return {
    uid: uploadFile.uid,
    filename: uploadFile.name,
    status: uploadFile.status,
    percent: uploadFile.percent,
    // 这里对应到 onSuccess 的回调参数
    url: uploadFile.response,
    thumbUrl: uploadFile.response,
    lastModifiedTime: uploadFile.lastModifiedDate?.toUTCString(),
  };
}

const UploadForm: React.FC<{}> = () => {
  const { uploadOXS } = useOxs();
  // 自定义文件列表数据，收集文件上传状态，用于List列表展示
  const [fileList, setFileList] = useState<FileItem[]>([]);

  const handleUpload = async (option: any) => {
    const file = option.file as File;
    try {
      // 使用第三方服务进行文件上传
      const uploadFile = await uploadOXS();
      if (uploadFile) {
        uploadFile(file, 'temp', (res) => {
          console.log(parseInt(res * 100).toFixed(0));
          option.onProgress({
            percent: parseInt(res * 100).toFixed(0),
          });
        }).then((res) => {
          console.log('then', res);
          option.onSuccess(res);
        });
      } else {
        message.error('图片上传功能暂时无法使用');
        option.onError('图片上传功能暂时无法使用');
      }
    } catch (error) {
      option.onError(error);
    }
  };

  const handleBeforeUpload = (file: RcFile, uploadFileList: RcFile[]) => {
    const SAFE_FILE_SUM = 20;

    if (uploadFileList.length <= SAFE_FILE_SUM) return Promise.resolve();

    return new Promise<void>((resolve, reject) =>
      Modal.confirm({
        title: 'Are U Sure ???',
        content: `文件个数大于${SAFE_FILE_SUM}(${uploadFileList.length}个)`,
        onOk() {
          resolve();
        },
        onCancel() {
          reject();
        },
      }),
    );
  };

  const handleUploadChange = (info: UploadChangeParam) =>
    setFileList(info.fileList.map(upload2Item));

  const renderStatus = (status?: string) => {
    if (status === 'done') return <Tag color="green">done</Tag>;
    if (status === 'error') return <Tag color="red">error</Tag>;
    if (status === 'uploading') return <Tag color="geekblue">uploading</Tag>;
    return <Tag color="blue">prepare</Tag>;
  };

  const renderPreviewImage = (item?: any) => (
    <div className="preview-image-wrapper">
      {item.thumbUrl ? (
        <Image
          style={{ height: 80, width: 'inherit', maxWidth: 120 }}
          alt="图片加载失败"
          src={item.thumbUrl}
        />
      ) : (
        // <Spin />
        <>
          {item.percent ? (
            <Progress percent={item.percent} type="circle" width={40} status="active" />
          ) : (
            <Spin />
          )}
        </>
      )}
    </div>
  );

  const renderFileItem = (item: FileItem) => (
    <List.Item
      actions={[
        <Button key="copy" type="link" onClick={() => handleCopy(item.url)}>
          复制链接
        </Button>,
      ]}
      extra={renderPreviewImage(item)}
    >
      <List.Item.Meta title={item.filename} description={item.url} />
      {renderStatus(item.status)}
      <Typography.Text type="secondary">{'At ' + item.lastModifiedTime}</Typography.Text>
      {/* <Progress percent={50} status="active" /> */}
    </List.Item>
  );

  return (
    <div className="doraemon-page">
      <div className="doraemon-upload-box">
        <Upload.Dragger
          // accept="image/png, image/jpeg"
          multiple
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
          customRequest={handleUpload}
          onChange={handleUploadChange}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">文件上传</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </div>

      <div className="doraemon-upload-list">
        <List bordered itemLayout="horizontal" dataSource={fileList} renderItem={renderFileItem} />
      </div>
    </div>
  );
};

export default UploadForm;

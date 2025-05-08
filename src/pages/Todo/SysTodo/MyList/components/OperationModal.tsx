import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import React, { useEffect, useState } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProForm,
  ProFormSlider,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-components';

import type { BasicListItemDataType } from '../data';
import styles from '../style.less';
import { uploadFile } from '@/services/ant-design-pro/api'
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {
  Button, Col, Form, message,
  Result, Row, Select, Tag
} from 'antd';

const { Option } = Select;
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2713835_daepmvl8rp4.js',
    // '//at.alicdn.com/t/font_3418336_n2fh4bof259.js',
    '//at.alicdn.com/t/c/font_2713835_x7ngtq8folo.js'],
});

const imageHandler = function () {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  // input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = () => {
    const file = input.files[0];
    const fd = new FormData();
    fd.append('file', input.files[0]);
    fd.append('enctype', 'multipart/form-data');
    const hide = message.loading('上传中...', 0);
    uploadFile(fd).then(resp => {
      if (resp.success) {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', "ProgramSettings.serverPath" + resp.data.full_path);
        hide();
      }
      hide();
    });
  };
}

export type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
};

const OperationModal: React.FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;

  if (!visible) {
    return null;
  }
  const [content, setContent] = useState<string>(current?.content ?? '');
  const [owner, setOwner] = useState<string>(current?.owner ?? '');
  const [form] = Form.useForm();
  const [editorStr, setEditorStr] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState(props.values?.content ?? "请输入内容..."); // 编辑器内容


  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.current);
    if (props.current?.content === undefined) {
      props.current.content = "请输入内容..."
    }
    if (String(props.current?.content).indexOf("<p") != 0) {
      setHtml("<p>" + props.current?.content + "</p>")
    } else {
      setHtml(props.current?.content)
    }
  }, [props.current])


  const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {},
    placeholder: '请输入内容...',

  };
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ["group-video"],
  }

  editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file: File, insertFn: InsertFnType) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('enctype', 'multipart/form-data');
      const hide = message.loading('上传中...', 0);
      uploadFile(fd).then(res => {
        if (res.success) {
          insertFn(res.data.full_path, "", res.data.full_path)
          hide();
        }
        hide();
      });
    }
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editorStr == null) return;
      editorStr.destroy();
      setEditorStr(null);
    };
  }, [editorStr]);



  const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };


  return (
    <ModalForm<BasicListItemDataType>
      visible={visible}
      form={form}
      style={{ padding: 0, marginTop: '-24px', marginBottom: '-24px' }}
      title={done ? null : `任务${current?.id ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={1100}
      onFinish={async (values) => {
        values.id = current?.id ?? 0
        values.endAt = moment(values.endAt).format('YYYY-MM-DD')
        values.content = html
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      {!done ? (
        <div
          key="content1"
          style={{
            display: 'flex',
            width: '100%',
          }}
        >
          <div
            key='1'
            style={{
              flex: 1,
              paddingTop: '20px'
            }}
          >
            <ProFormText
              name="title"
              label="标题"
              rules={[{ required: true, message: '请输入事项标题' }]}
              placeholder="请输入事项标题"
            />
            <ProForm.Item label="描述" style={{ paddingBottom: '20px' }}>
              <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                  editor={editorStr}
                  defaultConfig={toolbarConfig}
                  mode="default"
                  style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                  defaultConfig={editorConfig}
                  value={html}
                  onCreated={setEditorStr}
                  onChange={(editorStr) => setHtml(editorStr.getHtml())}
                  mode="default"
                  style={{ height: '500px', 'overflow-y': 'hidden' }}
                />
              </div>
            </ProForm.Item>

          </div>
          <div
            key='2'

            style={{
              width: '225px',
              marginRight: '10px',
              backgroundColor: 'white',
              paddingTop: '20px',
              paddingLeft: '20px',
              backgroundColor: 'white',
              marginLeft: '20px',
              borderLeft: '1px solid rgb(217, 217, 217)',
              background: '#fcfcfd'
            }}
          >
            {/* <ProForm.Item label="处理人" style={{ paddingBottom: '20px' }}>
              <Row>
                <Col>
                  <Avatar style={{ backgroundColor: '#f56a00' }}>{owner.substring(0, 2)}</Avatar>
                </Col>
                <Col style={{ 'marginLeft': '5px' }}>
                  <Dropdown overlay={menu} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Button type="primary" shape="circle" icon={<PlusOutlined />} />
                  </Dropdown>
                </Col>
              </Row>
            </ProForm.Item> */}
            <ProFormSelect
              name="owner"
              label="处理人"
              rules={[{ required: true, message: '请选择处理人' }]}
              options={[
                {
                  label: '张文健',
                  value: 'zhangwenjian',
                },
                {
                  label: '测试账号',
                  value: 'test',
                },
              ]}
              placeholder="请选择管理员"
            />
            <ProForm.Item
              name="priority"
              label="优先级"
            >
              <Select
                style={{ width: '100%', border: 0 }}
                defaultValue={['m']}
                optionLabelProp="label"
                bordered={false}
              >
                <Option value="l" label="低">
                  <div className="demo-option-label-item">
                    <IconFont type='icon-renwu-difengxian'></IconFont>&nbsp;低
                  </div>
                </Option>
                <Option value="m" label="中">
                  <div className="demo-option-label-item">
                    <IconFont type='icon-renwu-zhongfengxian'></IconFont>&nbsp;中
                  </div>
                </Option>
                <Option value="h" label="高">
                  <div className="demo-option-label-item">
                    <IconFont type='icon-renwu-gaofengxian'></IconFont>&nbsp;高
                  </div>
                </Option>
                <Option value="jj" label="紧急">
                  <div className="demo-option-label-item">
                    <IconFont type='icon-renwu-jinjifengxian'></IconFont>&nbsp;紧急
                  </div>
                </Option>
              </Select>
            </ProForm.Item>

            <ProForm.Item
              name="status"
              label="状态"
            >
              <Select
                style={{ width: '100%', border: 0 }}
                defaultValue={['normal']}
                optionLabelProp="label"
                bordered={false}
                showArrow={false}
                onChange={(value) => {
                  if (value == "success") {
                    let formData = form.getFieldsValue()
                    formData.percent = 100;
                    form.setFieldsValue(formData)
                  } else if (value == "active") {
                    let formData = form.getFieldsValue()
                    formData.percent = 50;
                    form.setFieldsValue(formData)
                  }
                }}
              >
                <Option value="normal" label="未开始">
                  <div className="demo-option-label-item">
                    <Row>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                        未开始
                      </Col>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                      ->
                      </Col>
                      <Col span={8}>
                        <Tag color={''} style={{ float: 'right' }}>未开始</Tag>
                      </Col>
                    </Row>
                  </div>
                </Option>
                <Option value="active" label="处理中">
                  <div className="demo-option-label-item">
                    <Row>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                        处理中
                      </Col>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                      ->
                      </Col>
                      <Col span={8}>
                        <Tag color={'warning'} style={{ float: 'right' }}>处理中</Tag>
                      </Col>
                    </Row>
                  </div>
                </Option>
                <Option value="success" label="已完成">
                  <div className="demo-option-label-item">
                    <Row>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                        已完成
                      </Col>
                      <Col span={8} style={{ 'textAlign': 'center', width: '100%', }}>
                      ->
                      </Col>
                      <Col span={8}>
                        <Tag color={'success'} style={{ float: 'right' }}>已完成</Tag>
                      </Col>
                    </Row>
                  </div>
                </Option>
              </Select>
            </ProForm.Item>
            <ProFormDatePicker
              name="endAt"
              label="截止时间"
              rules={[{ required: true, message: '请选择截止时间' }]}
              fieldProps={{
                style: {
                  width: '100%',
                },
                bordered: false
              }}

              placeholder="请选择"
            />
            <ProFormDependency name={['status']}>
              {({ status }) => {
                console.log(status)
                if (status == "active" || status == "success") {
                  return <ProFormSlider
                    name="percent"
                    label="进度"
                    marks={{
                      0: '0%',
                      25: '25%',
                      50: '50%',
                      75: '75%',
                      100: '100%',
                    }}
                  />
                } else {
                  return null
                }
              }}
            </ProFormDependency>
          </div>
        </div>
      ) : (
        <Result
          status="success"
          title="操作成功"
          subTitle="一系列的信息描述，很短同样也可以带标点。"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )
      }
    </ModalForm >
  );
};



export default OperationModal;

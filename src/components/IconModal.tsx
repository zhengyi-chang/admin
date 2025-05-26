import React from 'react';
import { Tabs, Tooltip } from 'antd';
import { DrawerForm } from '@ant-design/pro-components';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2713835_daepmvl8rp4.js',
    // '//at.alicdn.com/t/font_3418336_n2fh4bof259.js',
    '//at.alicdn.com/t/c/font_2713835_x7ngtq8folo.js',
  ],
});

const { TabPane } = Tabs;
const directionIcons = [
  'step-backward',
  'step-forward',
  'fast-backward',
  'fast-forward',
  'shrink',
  'arrows-alt',
  'down',
  'up',
  'left',
  'right',
  'caret-up',
  'caret-down',
  'caret-left',
  'caret-right',
  'up-circle',
  'down-circle',
  'left-circle',
  'right-circle',
  'double-right',
  'double-left',
  'vertical-left',
  'vertical-right',
  'forward',
  'backward',
  'rollback',
  'enter',
  'retweet',
  'swap',
  'swap-left',
  'swap-right',
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'play-circle',
  'up-square',
  'down-square',
  'left-square',
  'right-square',
  'login',
  'logout',
  'menu-fold',
  'menu-unfold',
  'border-bottom',
  'border-horizontal',
  'border-inner',
  'border-left',
  'border-right',
  'border-top',
  'border-verticle',
  'pic-center',
  'pic-left',
  'pic-right',
  'radius-bottomleft',
  'radius-bottomright',
  'radius-upleft',
  'radius-upright',
  'fullscreen',
  'fullscreen-exit',
];
const suggestionIcons = [
  'question',
  'question-circle',
  'plus',
  'plus-circle',
  'pause',
  'pause-circle',
  'minus',
  'minus-circle',
  'plus-square',
  'minus-square',
  'info',
  'info-circle',
  'exclamation',
  'exclamation-circle',
  'close',
  'close-circle',
  'close-square',
  'check',
  'check-circle',
  'check-square',
  'clock-circle',
  'warning',
  'issues-close',
  'stop',
];
const editIcons = [
  'edit',
  'form',
  'copy',
  'scissor',
  'delete',
  'snippets',
  'diff',
  'highlight',
  'align-center',
  'align-left',
  'align-right',
  'bg-colors',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'redo',
  'undo',
  'zoom-in',
  'zoom-out',
  'font-colors',
  'font-size',
  'line-height',
  'column-height',
  'dash',
  'small-dash',
  'sort-ascending',
  'sort-descending',
  'drag',
  'ordered-list',
  'radius-setting',
  'column-width',
  'column-height',
  'shenjiguanli',
];
const dataIcons = [
  'area-chart',
  'pie-chart',
  'bar-chart',
  'dot-chart',
  'line-chart',
  'radar-chart',
  'heat-map',
  'fall',
  'rise',
  'stock',
  'box-plot',
  'fund',
  'sliders',
];
const webIcons = [
  'lock',
  'unlock',
  'bars',
  'book',
  'calendar',
  'cloud',
  'cloud-download',
  'code',
  'copy',
  'credit-card',
  'delete',
  'desktop',
  'download',
  'ellipsis',
  'file',
  'file-text',
  'file-unknown',
  'file-pdf',
  'file-word',
  'file-excel',
  'file-jpg',
  'file-ppt',
  'file-markdown',
  'file-add',
  'folder',
  'folder-open',
  'folder-add',
  'hdd',
  'frown',
  'meh',
  'smile',
  'inbox',
  'laptop',
  'appstore',
  'link',
  'mail',
  'mobile',
  'notification',
  'paper-clip',
  'picture',
  'poweroff',
  'reload',
  'search',
  'setting',
  'share-alt',
  'shopping-cart',
  'tablet',
  'bug',
  'tag',
  'tags',
  'to-top',
  'upload',
  'user',
  'video-camera',
  'home',
  'loading',
  'loading-3-quarters',
  'cloud-upload',
  'star',
  'heart',
  'environment',
  'eye',
  'camera',
  'save',
  'team',
  'solution',
  'phone',
  'filter',
  'exception',
  'export',
  'customer-service',
  'qrcode',
  'scan',
  'like',
  'dislike',
  'message',
  'pay-circle',
  'calculator',
  'pushpin',
  'bulb',
  'select',
  'switcher',
  'rocket',
  'bell',
  'disconnect',
  'database',
  'compass',
  'barcode',
  'hourglass',
  'key',
  'flag',
  'layout',
  'printer',
  'sound',
  'usb',
  'skin',
  'tool',
  'sync',
  'wifi',
  'car',
  'schedule',
  'user-add',
  'user-delete',
  'usergroup-add',
  'usergroup-delete',
  'man',
  'woman',
  'shop',
  'gift',
  'idcard',
  'medicine-box',
  'red-envelope',
  'coffee',
  'copyright',
  'trademark',
  'safety-certificate',
  'wallet',
  'bank',
  'trophy',
  'contacts',
  'global',
  'shake',
  'api',
  'fork',
  'dashboard',
  'table',
  'profile',
  'alert',
  'audit',
  'branches',
  'build',
  'border',
  'crown',
  'experiment',
  'fire',
  'money-collect',
  'property-safety',
  'read',
  'reconciliation',
  'rest',
  'security-scan',
  'insurance',
  'interation',
  'safety-certificate',
  'project',
  'thunderbolt',
  'block',
  'cluster',
  'deployment-unit',
  'dollar',
  'euro',
  'pound',
  'file-done',
  'file-exclamation',
  'file-protect',
  'file-search',
  'file-sync',
  'gateway',
  'gold',
  'robot',
  'shopping',
  'menu',
];
const logoIcons = [
  'android',
  'apple',
  'windows',
  'ie',
  'chrome',
  'github',
  'aliwangwang',
  'dingding',
  'weibo-square',
  'weibo-circle',
  'taobao-circle',
  'html5',
  'weibo',
  'twitter',
  'wechat',
  'youtube',
  'alipay-circle',
  'taobao',
  'skype',
  'qq',
  'medium-workmark',
  'gitlab',
  'medium',
  'linkedin',
  'google-plus',
  'dropbox',
  'facebook',
  'codepen',
  'amazon',
  'google',
  'codepen-circle',
  'alipay',
  'ant-design',
  'aliyun',
  'zhihu',
  'slack',
  'slack-square',
  'behance',
  'behance-square',
  'dribbble',
  'dribbble-square',
  'instagram',
  'yuque',
  'alibaba',
  'yahoo',
];

const colorIcons = [
  'baogao',
  'gongzi',
  'chongzhi',
  'fuzhai',
  'fuxian',
  'rili',
  'shouru',
  'dianzan',
  'yue',
  'shubao',
  'huiyuanka',
  'gouwu',
  'yinhangka',
  'shuji',
  'shishang',
  'xinyongka',
  'lijie',
  'zhipiao',
  'hongbao',
  'licaitouzi',
  'zhangdan',
  'youxi',
  'yuanbao',
  'shoujichongzhi',
  'youhuiquan',
  'xunzhang',
  'dingwei',
  'piaowu',
  'icon-anquan',
  'icon-dianpu',
  'icon-gongzuo',
  'icon-kafei1',
  'icon-lvxing',
  'icon-wenjianchaxun',
  'icon-hongbao',
  'icon-qianbao',
  'icon-renzheng',
  'icon-shouji',
  'icon-guanjun',
  'icon-xunzhang',
  'icon-diannao',
  'icon-yue',
  'icon-lipin',
  'icon-luxiang',
  'icon-pinglun',
  'icon-xuexi',
  'icon-danganku',
  'icon-dianzan',
  'icon-tupian',
  'icon-yaoqing',
  'icon-yingshi',
  'icon-naozhong',
  'icon-shangpin',
  'icon-yinyue',
  'icon-kafei',
  'icon-rili',
  'icon-sousuo',
  'icon-tishi',
  'icon-wenjianjia',
  'icon-zixun',
];

export type IconFormValueType = {};

export type IconModalProps = {
  onCancel: (flag?: boolean, formVals?: IconFormValueType) => void;
  onSubmit: (values: IconFormValueType) => Promise<void>;
  onOk: (icon: string) => void;
  iconModalVisible: boolean;
  values: Partial<API.MenuListItem>;
  title: string;
};

const IconModal: React.FC<IconModalProps> = (props) => {
  //   const intl = useIntl();
  return (
    <DrawerForm
      title="图标选择"
      visible={props.iconModalVisible}
      width="800px"
      onFinish={async (values) => {
        console.log(values);

        await props.onSubmit(values);
        return true;
      }}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
        zIndex: 1200,
      }}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="方向性图标" key="1">
          {directionIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="指示性图标" key="2">
          {suggestionIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="编辑类图标" key="3">
          {editIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="数据类图标" key="4">
          {dataIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="网站通用图标" key="5">
          {webIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="品牌和标识" key="6">
          {logoIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
        <TabPane tab="多彩图标" key="7">
          {colorIcons.map((item) => {
            const name = item;
            return (
              <Tooltip title={item} key={item}>
                <IconFont
                  style={{ fontSize: '26px', margin: '10px 10px' }}
                  type={name}
                  onClick={() => {
                    props.onOk(item);
                    props.onCancel();
                  }}
                />
              </Tooltip>
            );
          })}
        </TabPane>
      </Tabs>
    </DrawerForm>
  );
};

export default IconModal;

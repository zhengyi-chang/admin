import type { FC } from 'react';
import React, { useState } from 'react';
import { createFromIconfontCN, DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Tag,
} from 'antd';

import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import {
  addFakeList,
  queryFakeList,
  removeFakeList,
  updateFakeList,
  queryFakeTodoTotal,
} from './service';
import type { BasicListItemDataType } from './data';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_2713835_daepmvl8rp4.js',
    // '//at.alicdn.com/t/font_3418336_n2fh4bof259.js',
    '//at.alicdn.com/t/c/font_2713835_x7ngtq8folo.js',
  ],
});
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListStatus = ({ data: { status } }: { data: { status: string } }) => {
  if (status === 'l') {
    return (
      <>
        <IconFont type="icon-renwu-difengxian"></IconFont>&nbsp;低
      </>
    );
  } else if (status === 'm') {
    return (
      <>
        <IconFont type="icon-renwu-zhongfengxian"></IconFont>&nbsp;中
      </>
    );
  } else if (status === 'h') {
    return (
      <>
        <IconFont type="icon-renwu-gaofengxian"></IconFont>&nbsp;高
      </>
    );
  } else if (status === 'jj') {
    return (
      <>
        <IconFont type="icon-renwu-jinjifengxian"></IconFont>&nbsp;紧急
      </>
    );
  } else {
    return <></>;
  }
};
const ListContent = ({
  data: { owner, endAt, percent, status },
}: {
  data: BasicListItemDataType;
}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem} style={{ width: 80 }}>
      <span>处理人</span>
      <p>
        {' '}
        <Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {owner.substring(0, 2)}
        </Avatar>
      </p>
      {/* <p>{owner}</p> */}
    </div>
    <div className={styles.listContentItem}>
      <span>截止时间</span>
      <p>
        {moment(endAt).format('YYYY-MM-DD')}&nbsp;
        {moment().diff(moment(endAt), 'days') === 0 && status != 'success' ? (
          <Tag color="magenta">到期</Tag>
        ) : (
          ''
        )}
        {moment().diff(moment(endAt), 'days') > 0 && status != 'success' ? (
          <Tag color="error">逾期</Tag>
        ) : (
          ''
        )}
        {moment().diff(moment(endAt), 'days') < -5 || status == 'success' ? (
          <Tag color="success">正常</Tag>
        ) : (
          ''
        )}
        {moment().diff(moment(endAt), 'days') > -5 &&
        status != 'success' &&
        moment().diff(moment(endAt), 'days') < 0 ? (
          <Tag color="warning">紧张</Tag>
        ) : (
          ''
        )}
      </p>
    </div>
    <div className={styles.listContentItem}>
      <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
    </div>
  </div>
);

export const BasicList: FC = () => {
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>({
    priority: 'm',
    status: 'normal',
  });

  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => {
    return queryFakeList({ pageSize: 10, current: 1 });
  });

  const { data: totalData } = useRequest(() => {
    return queryFakeTodoTotal({});
  });

  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }
      if (method === 'update') {
        return updateFakeList(params);
      }
      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );

  const list = listData?.list || [];
  let pageSize = listData?.pageSize || 10;
  const total = listData?.total || 0;

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: pageSize,
    total: total,
    onChange: async (page: number, pagesize: number) => {
      console.log(page, pagesize);
      pageSize = pagesize;
      const data = await queryFakeList({ pageSize: pagesize, current: page });
      mutate(data.data);
    },
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: number) => {
    postRun('remove', { id });
  };

  const editAndDelete = (key: string | number, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除任务',
        content: '确定删除该任务吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup
        defaultValue="all"
        onChange={async (e) => {
          console.log(e.target.value);
          if (e.target.value === 'all') {
            const data = await queryFakeList({ pageSize: 10, pageIndex: 1 });
            mutate(data.data);
          } else {
            const data = await queryFakeList({
              pageSize: 10,
              pageIndex: 1,
              status: e.target.value,
            });
            mutate(data.data);
          }
        }}
      >
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="normal">未开始</RadioButton>
        <RadioButton value="active">进行中</RadioButton>
        <RadioButton value="success">已完成</RadioButton>
      </RadioGroup>
      <Search
        className={styles.extraContentSearch}
        placeholder="请输入"
        onSearch={async (value) => {
          const data = await queryFakeList({ pageSize: 10, pageIndex: 1, title: value });
          mutate(data.data);
        }}
      />
    </div>
  );

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({ priority: 'm', status: 'normal' });
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={24}>
                <Info title="我的待办" value={totalData?.normal + '个任务'} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="进行中" value={totalData?.active + '个任务'} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="异常任务" value={totalData?.exception + '个任务'} bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="完成任务" value={totalData?.success + '个任务'} />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="基本列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <>
                        <Avatar style={{ backgroundColor: '#1890ff' }} shape="square" size="large">
                          {item.title.substring(0, 2)}
                        </Avatar>
                      </>
                    }
                    title={
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          showEditModal(item);
                        }}
                      >
                        {item.title}
                      </a>
                    }
                    description={ListStatus({ data: { status: item.priority } })}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{ width: '100%', marginBottom: 8 }}
      >
        <PlusOutlined />
        添加
      </Button>
      <OperationModal
        done={done}
        visible={visible}
        current={current ?? { priority: 'm', status: 'normal' }}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BasicList;

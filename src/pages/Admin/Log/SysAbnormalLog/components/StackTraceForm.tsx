import React from 'react';
import { Steps } from 'antd';
import { DrawerForm, WaterMark } from '@ant-design/pro-components';
import { useIntl, useModel } from 'umi';
const { Step } = Steps;

export type FormValueType = {} & Partial<SysAbnormalLogItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SysAbnormalLogItem>;
  title: string;
};

export function formatJSON(val = {}) {
  try {
    return JSON.stringify(val, null, 2);
  } catch {
    const errorJson = {
      error: `非法返回${val}`,
    };
    return JSON.stringify(errorJson, null, 2);
  }
}

const StackTraceForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');

  return (
    <DrawerForm
      title={props.title}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => props.onCancel(),
        zIndex: 1200,
      }}
      width={980}
      visible={props.updateModalVisible}
      onFinish={async (values) => {
        console.log(values);
        if (props.values.abId) {
          values.abId = props.values.abId;
        }
        await props.onSubmit(values);
        return true;
      }}
    >
      <WaterMark content={initialState?.currentUser?.name} gapY={150} gapX={100}>
        功能开发中敬请关注！
        {/* <Steps direction="vertical" current={2}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps> */}
      </WaterMark>
    </DrawerForm>
  );
};

export default StackTraceForm;

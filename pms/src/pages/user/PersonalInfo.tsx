/*
 * @Author: Semmy Wong
 * @Date: 2024-03-21 21:15:20
 * @LastEditors: Semmy Wong
 * @LastEditTime: 2024-09-29 11:03:21
 * @Description: Description
 */
import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import { PageContainer, ProForm, ProFormItem, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card, GetProp, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useRef, useState } from 'react';
import { useLogin } from '../login/useLogin';
import { useUser } from './useUser';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('你只能上传JPG/PNG文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('上传图片最大不能超过10MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ReadOnlyFormItem = ({ value, style }: { value?: any; style?: React.CSSProperties }) => {
  return <label style={style}>{value}</label>;
};
const ReadOnlyStatusFormItem = ({ value }: { value?: any }) => {
  return (
    <label>
      {value === 1 ? (
        <span style={{ color: 'rgb(40, 208, 148)' }}>启用</span>
      ) : (
        <span style={{ color: 'rgb(208, 48, 48)' }}>禁用</span>
      )}
    </label>
  );
};
const PersonalInfo = <T extends UserType>(): React.ReactNode => {
  const formRef = useRef<ProFormInstance<any>>();
  const tableActionRef = useRef<ActionType>();

  const { detailHandler, updateHandler } = useUser<T>({
    tableActionRef,
  });
  const { getLoginUser } = useLogin<T>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const avatarChangeHandler: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadActionHandler = async (file: RcFile) => {
    return '';
  };

  const onFinishHandler = async (values: any) => {
    return await updateHandler({ ...values, headPhoto: imageUrl });
  };

  return (
    <PageContainer title="个人信息">
      <Card>
        <ProForm
          layout="horizontal"
          formRef={formRef}
          onFinish={onFinishHandler}
          request={getLoginUser}
          submitter={{
            searchConfig: {
              submitText: '保存',
            },
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
            submitButtonProps: {
              type: 'primary',
            },
          }}
        >
          {/* <Form.Item name="headPhoto" label="头像">
            <Upload
              name="headPhoto"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={uploadActionHandler}
              beforeUpload={beforeUpload}
              onChange={avatarChangeHandler}
            >
              {imageUrl ? (
                <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <button style={{ border: 0, background: 'none' }} type="button">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>上传</div>
                </button>
              )}
            </Upload>
          </Form.Item> */}
          <ProFormItem name="userId" label={'员工ID'}>
            <ReadOnlyFormItem />
          </ProFormItem>

          <ProFormText name="nickName" label={'昵称'} />
          <ProFormItem name="userName" label={'姓名'}>
            <ReadOnlyFormItem />
          </ProFormItem>
          <ProFormText name="phone" label={'手机号'} rules={[{ required: true, message: '请填写手机号' }]} />
          <ProFormTextArea name="remark" label={'备注'} />
          <ProFormItem name="status" label={'账号状态'}>
            <ReadOnlyStatusFormItem />
          </ProFormItem>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default PersonalInfo;

import { Upload, Modal,Form,Input,Button,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react';
import {HOST,PORT,DOMAIN} from '../../config'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const PostWallpaper = (props)=>{
  const {history,uid} = props
  const [previewVisible,setPreviewVisible] = useState(false);
  const [previewImage,setPreviewImage] = useState('');
  const [previewTitle,setPreviewTitle] = useState('');
  const [filelist,setFilelist] = useState([]);

  const [settings,setSettings] = useState([])//useState内部需要一个参数表示settings的初始值，用个[]空列表代替
    const loadSettings = async ()=>{//获取用户当前信息接口
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式，读取用getItem,从DOMAIN读取
            const {username,token} = JSON.parse(storage)//要解构就得先将storage的字符串格式转换成json格式
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{//调用接口
                method:"GET"
            })
            const result = await res.json()//转化为json格式
            if(res.ok){
                setSettings(result.data)//把响应体里的数据修改状态setSettings存储到状态settings里
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

  const postwallpaper = async (body)=>{
    try {
        const res = await fetch(`${HOST}:${PORT}/api/users/wallpaper`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
        loadSettings()
      } else {
        message.warning(result.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  
  }

  useEffect(()=>{
    loadSettings()
  },[])
  //限制上传大小类型
  const handleUpload = file=>{
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const limit = file.size / 1024 < 300;
    if(!(isJPG||isJPEG||isPNG)){
      message.error('你只能上传JPG、JPEG、PNG格式的图片');
    }else if (!limit) {
      message.error('超过300KB限制，不允许上传');
    }
    return new Promise((resolve,reject)=>{
      if(!(isJPG||isJPEG||isPNG)){
        reject(file);
      }else if(!limit){
        reject(file);
      }else{
        resolve(file);
      }
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  //图片缩放
  const handlePreview = async file => {
    const isLoading = file.status === 'uploading';
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  }

  //上传表单
  const onFinish = async (values) => {
    const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
    const {username,token} = JSON.parse(storage)
    const body = {filelist ,username,token};
    postwallpaper(body);
  };

  // const handleChange = ({ fileList }) => {
  //   console.log("这个是jsx里的fileList:",fileList)
  //   setFileList(fileList)
  // }
  const handleChange = (info)=>{
    const fl = info.fileList.map((f,idx)=>{
      if(f.response){
        return f.response.data
      }
    })
    setFilelist(fl)
    console.log(fl)
  }
  
  //上传的图标样式
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 9 },
    };

    return (
        <div className="pt-4">
          <Form
          {...layout}
          name="basic"
          onFinish={onFinish}>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <div className="clearfix">
              上传壁纸
                <Upload 
                  name="pictures"
                  action="http://localhost:3000/api/upload"
                  listType="picture-card"
                  filelist={filelist}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={handleUpload}
                  multiple={true}
                  defaultValue={filelist}
                >
                  {filelist.length >= 1 ? null : uploadButton}
                </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
            </Form.Item>
        </Form>
      </div>
      );

    }

export default PostWallpaper
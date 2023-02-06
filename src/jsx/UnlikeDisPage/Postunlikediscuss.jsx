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

const Postunlikediscuss = (props)=>{
  const {history} = props
  const [previewVisible,setPreviewVisible] = useState(false);
  const [previewImage,setPreviewImage] = useState('');
  const [previewTitle,setPreviewTitle] = useState('');
  const [filelist,setFilelist] = useState([]);

  const [unlikediscusses,setUnlikediscusses] = useState([])
    const loadUnlikediscusses = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/unlikediscusses`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUnlikediscusses(result.data)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

  const postunlikediscuss = async (body)=>{
    try {
        const res = await fetch(`${HOST}:${PORT}/api/unlikediscusses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
        loadUnlikediscusses()
        history.push('/unlikediscusses')
      } else {
        message.warning(result.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  
  }

  useEffect(()=>{
    loadUnlikediscusses()
  },[])
  //限制上传大小类型
  const handleUpload = file=>{
    const isJPG = file.type === 'image/jpeg';
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const limit = file.size / 1024 < 200;
    if(!(isJPG||isJPEG||isPNG)){
      message.error('你只能上传JPG、JPEG、PNG格式的图片');
    }else if (!limit) {
      message.error('超过200KB限制，不允许上传');
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
    const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
    const { title, content} = values;
    const body = { title, content,filelist ,username,token};
    postunlikediscuss(body);
  };

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
        <h3 style={{textAlign:"center"}}>吐槽帖</h3>
        <Form
        {...layout}
        name="basic"
        onFinish={onFinish}>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入帖子标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入帖子内容" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <div className="clearfix">
            图片上传:
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
              {filelist.length >= 9 ? null : uploadButton}
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

export default Postunlikediscuss
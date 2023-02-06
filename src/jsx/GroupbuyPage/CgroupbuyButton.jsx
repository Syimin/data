import React,{useState} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {HOST,PORT,DOMAIN} from '../../config'

const GroupbuyForm = ()=>{
    const [settings,setSettings] = useState([])//useState内部需要一个参数表示settings的初始值，用个[]空列表代替
    return(
        <Form id="groupbuyForm">
            <Form.Group controlId="title">
                <Form.Label>标题</Form.Label>
                <Form.Control type="text" placeholder="请输入团购标题"/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>内容</Form.Label>
                <Form.Control as="textarea" rows="3"/>
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>类别</Form.Label>
                <Form.Control type="text" placeholder="请输入团购类别"/>
            </Form.Group>
            <Form.Group controlId="price">
                <Form.Label>价格</Form.Label>
                <Form.Control type="text" placeholder="请输入团购价格"/>
            </Form.Group>
            <Form.Group controlId="number">
                <Form.Label>人数</Form.Label>
                <Form.Control type="text" placeholder="请输入开团人数"/>
            </Form.Group>
            <Form.Group controlId="uploader">
                <Form.Label>上传图片</Form.Label>
                <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={settings.pictures ? `/upload/${settings.pictures}` : '/img/avatar.jpg'}
                    alt="团购图片"
                />
                <Form.Control type="file" placeholder="请上传图片"/>
            </Form.Group>
        </Form>
    )
}

const GroupbuyButton = (props)=>{
    const {loadGroupbuys} = props
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)//开启函数
    const closeModal = ()=> setShow(false)//关闭函数
    const post = async (body)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//从浏览器中获取用户名和token，拿到的storage是字符串格式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage的字符串格式转换成json格式
            const {title,content,category,price,number} = body
            const formData = new FormData()//实例化声明formData
            await formData.append('username',username)
            await formData.append('token',token)
            await formData.append('title',title)
            await formData.append('content',content)
            await formData.append('category',category)
            await formData.append('price',price)
            await formData.append('number',number)
            await formData.append('pictures',document.querySelector('#uploader').files[0])//files[0]表示获取第一个文件，即刚刚上传的头像
            const res = await fetch(`${HOST}:${PORT}/api/groupbuys`,{ 
                method:"POST",
                body:formData
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()//成功提交，自动关闭模态框
                loadGroupbuys()
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
        
    }
    
    const handlePost = ()=>{  
        const form = document.forms.groupbuyForm
        const title = form.title.value //value表示用户输入的值
        const content = form.content.value
        const category = form.category.value
        const price = form.price.value
        const number =  form.number.value
        const body = {title,content,category,price,number}//用body将三个变量封装到body里，相当于请求体
        post(body)
    }
    return(
        <div>
            <Button variant="outline-success" size="sm" onClick={()=>showModal()}>
                发起团购
            </Button>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>发起团购</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GroupbuyForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handlePost()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default GroupbuyButton
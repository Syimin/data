import React,{useState,useEffect} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {EditFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const ModifyForm = (props)=>{
    const {sid} = props//解构，将父组件did传给ModifyForm的子组件进行使用
    const [settings,setSettings] = useState([])
    const [title,setTitle] = useState([])
    const [content,setContent] = useState([])
    const [category,setCategory] = useState([])
    const [price,setPrice] = useState([])
    const [number,setNumber] = useState([])
    const [pictures,setPictures] = useState([])
    const loadSecondhand = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/secondhands/${sid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setTitle(result.data.secondhand.title)
                setContent(result.data.secondhand.content)
                setCategory(result.data.secondhand.category)
                setPrice(result.data.secondhand.price)
                setNumber(result.data.secondhand.number)
                setPictures(result.data.secondhand.pictures)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(()=>{
        loadSecondhand()
    },[])
    return(
        <Form id="modifygForm">
            <Form.Group controlId="title">
                <Form.Label>标题</Form.Label>
                <Form.Control type="text" placeholder="请输入二手标题" defaultValue={title}/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>内容</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={content}/>
            </Form.Group>
            <Form.Group controlId="category">
                <Form.Label>类别</Form.Label>
                <Form.Control type="text" placeholder="请输入商品类别" defaultValue={category}/>
            </Form.Group>
            <Form.Group controlId="price">
                <Form.Label>价格</Form.Label>
                <Form.Control type="text" placeholder="请输入二手价格" defaultValue={price}/>
            </Form.Group>
            <Form.Group controlId="number">
                <Form.Label>几成新</Form.Label>
                <Form.Control type="text" placeholder="请输入商品几成新" defaultValue={number}/>
            </Form.Group>
            <Form.Group controlId="uploader">
                <Form.Label>上传图片</Form.Label>
                <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={settings.pictures ? `/upload/${settings.pictures}` : '/img/avatar.jpg'}
                    alt="商品图片"
                />
                <Form.Control type="file" placeholder="请上传图片" defaultValue={pictures}/>
            </Form.Group>
        </Form>
    )
}

const ModifySButton = (props)=>{
    const {sid,loadSecondhand} = props
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)
    const closeModal = ()=> setShow(false)
    const modify = async (body)=>{
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
            const res = await fetch(`${HOST}:${PORT}/api/secondhands/${sid}`,{
                method:"PATCH",
                body:formData
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()
                loadSecondhand()
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleModify = async ()=>{
        const storage = await localStorage.getItem(DOMAIN)
        const {username,token} = JSON.parse(storage)
        const form = document.forms.modifygForm
        const title = form.title.value
        const content = form.content.value
        const category = form.category.value
        const price = form.price.value
        const number = form.number.value
        const body = {username,token,title,content,category,price,number}//用body将三个变量封装到body里，相当于请求体
        modify(body)
    }
    return( 
        <div>
            <EditFilled style={{ fontSize: '26px'}} onClick={()=>showModal()}/>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>修改二手</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModifyForm sid={sid}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handleModify()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModifySButton
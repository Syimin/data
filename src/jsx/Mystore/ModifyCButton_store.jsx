import React,{useState,useEffect} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {EditFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN,DOMAIN2} from '../../config'

const ModifyForm = (props)=>{
    const {cid} = props//解构，将父组件did传给ModifyForm的子组件进行使用
    const [settings,setSettings] = useState([])
    const [title,setTitle] = useState([])
    const [content,setContent] = useState([])
    const [category,setCategory] = useState([])
    const [price,setPrice] = useState([])
    // const [pictures,setPictures] = useState([])
    const loadDiscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/storecommodities/${cid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setTitle(result.data.commodity.title)
                setContent(result.data.commodity.content)
                setCategory(result.data.commodity.category)
                setPrice(result.data.commodity.price)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(()=>{
        loadDiscuss()
    },[])
    return(
        <Form id="modifycForm">
            <Form.Group controlId="title">
                <Form.Label>标题</Form.Label>
                <Form.Control type="text" placeholder="请输入商品标题" defaultValue={title}/>
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
                <Form.Control type="text" placeholder="请输入商品价格" defaultValue={price}/>
            </Form.Group>
        </Form>
    )
}

const ModifyCButton = (props)=>{
    const {cid,loadCommodity} = props
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)
    const closeModal = ()=> setShow(false)
    const modify = async (body)=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//从浏览器中获取用户名和token，拿到的storage是字符串格式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage的字符串格式转换成json格式
            const storage2 = await localStorage.getItem(DOMAIN2)//从浏览器中获取用户名和token，拿到的storage是字符串格式
            const {storename,s_token} = JSON.parse(storage2)//要解构就得先将storage的字符串格式转换成json格式
            const {title,content,category,price} = body
            const formData = new FormData()//实例化声明formData
            await formData.append('username',username)
            await formData.append('token',token)
            await formData.append('storename',storename)
            await formData.append('s_token',s_token)
            await formData.append('title',title)
            await formData.append('content',content)
            await formData.append('category',category)
            await formData.append('price',price)
            const res = await fetch(`${HOST}:${PORT}/api/storecommodities/${cid}`,{
                method:"PATCH",
                body:formData
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()
                loadCommodity()
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
        const storage2 = await localStorage.getItem(DOMAIN2)
        const {storename,s_token} = JSON.parse(storage2)
        const form = document.forms.modifycForm
        const title = form.title.value
        const content = form.content.value
        const category = form.category.value
        const price = form.price.value
        const body = {username,token,title,content,category,price,storename,s_token}//用body将三个变量封装到body里，相当于请求体
        modify(body)
    }
    return( 
        <div>
            <EditFilled style={{ fontSize: '26px'}} onClick={()=>showModal()}/>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>修改商品</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModifyForm cid={cid}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handleModify()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModifyCButton
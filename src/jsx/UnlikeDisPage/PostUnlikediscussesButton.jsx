import React,{useState} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {HOST,PORT,DOMAIN} from '../../config'

const PostForm = ()=>{
    return(
        <Form id="postForm">
            <Form.Group controlId="title">
                <Form.Label>标题</Form.Label>
                <Form.Control type="text" placeholder="请输入讨论标题"/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>内容</Form.Label>
                <Form.Control as="textarea" rows="3"/>
            </Form.Group>
        </Form>
    )
}

const PostUnlikediscussesButton = (props)=>{
    const {loadUnlikediscusses} = props
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)//开启函数
    const closeModal = ()=> setShow(false)//关闭函数
    const post = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/unlikediscusses`,{ //根据商品发布讨论
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()//成功提交讨论，自动关闭模态框
                loadUnlikediscusses()
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
        
    }
    const handlePost = async ()=>{
        const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
        const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
        const form = document.forms.postForm
        const title = form.title.value
        const content = form.content.value
        const body = {
            username,token,title,content
        }
        post(body)
    }
    return(
        <div>
            <Button variant="secondary" size="sm" onClick={()=>showModal()}>
                发起吐槽
            </Button>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>踩雷帖</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PostForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handlePost()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostUnlikediscussesButton
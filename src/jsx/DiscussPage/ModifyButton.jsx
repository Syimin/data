import React,{useState,useEffect} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {EditFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const ModifyForm = (props)=>{
    const {did} = props//解构，将父组件did传给ModifyForm的子组件进行使用
    const [title,setTitle] = useState([])
    const [content,setContent] = useState([])
    const loadDiscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/discusses/${did}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setTitle(result.data.discuss.title)
                setContent(result.data.discuss.content)
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
        <Form id="modifyForm">
            <Form.Group controlId="title">
                <Form.Label>标题</Form.Label>
                <Form.Control type="text" placeholder="请输入讨论标题" defaultValue={title}/>
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>内容</Form.Label>
                <Form.Control as="textarea" rows="3" defaultValue={content}/>
            </Form.Group>
        </Form>
    )
}

const ModifyButton = (props)=>{
    const {did,loadDiscuss} = props
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)
    const closeModal = ()=> setShow(false)
    const modify = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/discusses/${did}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()
                loadDiscuss()
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
        const form = document.forms.modifyForm
        const title = form.title.value
        const content = form.content.value
        const body = {username,token,title,content}
        modify(body)
    }
    return( 
        <div>
            <EditFilled style={{ fontSize: '26px'}} onClick={()=>showModal()}/>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>修改讨论</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModifyForm did={did}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handleModify()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModifyButton
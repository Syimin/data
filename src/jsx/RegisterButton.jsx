import React,{useState,useContext} from 'react'
import {Form,Button,Modal} from 'react-bootstrap'
import {HOST,PORT,DOMAIN} from '../config'
import {userContext} from './App'

const RegisterForm = ()=>{
    return(
        <Form id="registerForm">
            <Form.Group controlId="username">
                <Form.Label>用户名</Form.Label>
                <Form.Control type="text" placeholder="请输入用户名"/>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>密码</Form.Label>
                <Form.Control type="password" placeholder="请输入用户密码"/>
            </Form.Group>
            <Form.Group controlId="confirmpass">
                <Form.Label>确认密码</Form.Label>
                <Form.Control type="password" placeholder="请再次输入用户密码"/>
            </Form.Group>
        </Form>
    )
}

const RegisterButton = ()=>{
    const {setAuth,setUser} = useContext(userContext)
    const [show,setShow] = useState(false)//默认为关闭状态
    const showModal = ()=> setShow(true)//开启函数
    const closeModal = ()=> setShow(false)//关闭函数

    const login = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/login`,{ 
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()//成功提交，自动关闭模态框
                const data = {
                    username:result.data.username,
                    token:result.data.token
                }//从响应体中获取用户名和token
                await localStorage.setItem(DOMAIN,JSON.stringify(data))//将data存到用户的浏览器setItem(a,b)里的a代表键，b代表值
                setAuth(true)
                setUser({
                    _id:result.data._id,
                    username:result.data.username,
                    avatar:result.data.avatar
                })
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
        
    }
    
    const post = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users`,{ 
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                closeModal()//成功提交，自动关闭模态框
                login(body)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
        
    }
    const handlePost = ()=>{
        const form = document.forms.registerForm
        const username = form.username.value //value表示用户输入的值
        const password = form.password.value
        const confirmpass = form.confirmpass.value
        const body = {username,password,confirmpass}//用body将三个变量封装到body里，相当于请求体
        post(body)
    }
    return(
        <div>
            <Button variant="outline-success" size="sm" onClick={()=>showModal()}>
                没有账号，我要注册
            </Button>
            <Modal show={show} onHide={()=>closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>注册</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeModal()}>关闭</Button>
                    <Button variant="primary" onClick={()=>handlePost()}>提交</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default RegisterButton
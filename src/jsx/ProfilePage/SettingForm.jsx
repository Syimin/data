import React,{useState,useEffect} from 'react'//useState表示状态，react里的钩子
import {Form,Button} from 'react-bootstrap'
import {HOST,PORT,DOMAIN} from '../../config'

const SettingForm = (props)=>{
    const {uid} = props
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

    useEffect(()=>{//作用：让组件加载后能够读取并渲染用户当前信息
        loadSettings()
    },[])//第二个参数加上[]可以防止反复渲染的副作用产生

    const setting = async (body)=>{//修改用户信息接口
        try {
            const storage = await localStorage.getItem(DOMAIN)//从浏览器中获取用户名和token，拿到的storage是字符串格式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage的字符串格式转换成json格式
            const {description,nickname} = body
            const formData = new FormData()//实例化声明formData
            await formData.append('username',username)
            await formData.append('token',token)
            await formData.append('nickname',nickname)
            await formData.append('description',description)
            await formData.append('avatar',document.querySelector('#uploader').files[0])//files[0]表示获取第一个文件，即刚刚上传的头像
            const res = await fetch(`${HOST}:${PORT}/api/users`,{
                method:"PATCH",
                body:formData
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                loadSettings()//调用loadSettings实时更新用户当前数据
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const handleSettings = (e)=>{
        e.preventDefault()//阻止页面刷新
        const form = document.forms.settingForm
        const nickname = form.nickname.value
        const description = form.description.value
        const body = {description,nickname}
        setting(body)//调用register函数并且将body传过去
    }
    return(
        //file表示提交文件类型
        <Form id="settingForm">
            <Form.Group controlId="nickname">
                <Form.Label>昵称</Form.Label>
                <Form.Control type="text" placeholder="请输入昵称" defaultValue={settings.nickname}/>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>个人描述</Form.Label>
                <Form.Control type="text" placeholder="请输入个人描述" defaultValue={settings.description}/>
            </Form.Group>
            <Form.Group controlId="uploader">
                <Form.Label>头像</Form.Label>
                <img
                    width={96}
                    height={96}
                    className="mr-3 img-thumbnail round"
                    src={settings.avatar ? `/upload/${settings.avatar}` : '/img/avatar.jpg'}
                    alt="头像"
                />
                <Form.Control type="file" placeholder="请上传头像"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>handleSettings(e)}>确认</Button>
        </Form>
    )
}

export default SettingForm
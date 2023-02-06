import React,{useState,useEffect,useContext} from 'react'
import {HOST,PORT,DOMAIN} from '../../config'
import {Button} from 'react-bootstrap'
import {message} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {userContext} from '../App'

const Followers = (props)=>{
    const {user,setUser} = useContext(userContext)
    const {uid,getUser} = props
    const follower = async ()=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/followers/${uid}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
                getUser()
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    const unfollower = async ()=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/unfollowers/${uid}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    if(!user.followers) return null

    const button = user.followers.includes(uid)
    ?<span onClick={()=>unfollower(uid)}>已关注</span>
    :<span onClick={()=>follower(uid)}>关注+</span>

    return(
            <span style={{color:"orangered",fontSize:"16px",paddingRight:"10px"}}>{button}</span>
        
    )
}

export default Followers
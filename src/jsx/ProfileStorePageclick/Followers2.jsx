import React,{useState,useEffect,useContext} from 'react'
import {HOST,PORT,DOMAIN} from '../../config'
import {Button} from 'react-bootstrap'
import {message} from 'antd'
import {userContext} from '../App'

const Followers2 = (props)=>{
    const {user,setUser} = useContext(userContext)
    const {sid,getStore} = props
    const follower2 = async ()=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/followers2/${sid}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                message.success(result.message)
                setUser(result.data)
                getStore()
            }else{
                message.warning(result.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    
    const unfollower2 = async ()=>{
        try {
            const storage = await localStorage.getItem(DOMAIN)//storage是字符串形式
            const {username,token} = JSON.parse(storage)//要解构就得先将storage转换成json格式
            const body = {
                username,token
            }
            const res = await fetch(`${HOST}:${PORT}/api/users/unfollowers2/${sid}`,{
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
    
    if(!user.followers2) return null

    const button = user.followers2.includes(sid)
    ?<span onClick={()=>unfollower2(sid)}>已关注</span>
    :<span onClick={()=>follower2(sid)}>关注+</span>

    return(
        <div style={{textAlign:"center"}}>
            <Button variant="danger" size="sm">{button}</Button>
        </div>
        
    )
}

export default Followers2
import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {DeleteFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const DeleteLikediscussButton = (props)=>{
    const {lid,history} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/likediscusses/${lid}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                history.push('/likediscusses')
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async ()=>{
        if(confirm('确认删除该种草讨论吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const body = {username,token,lid}
            handle(body)
        }
    }
    return(
        <DeleteFilled style={{ fontSize: '26px'}} onClick={()=>handleDelete()}/>
    )
}

export default withRouter(DeleteLikediscussButton)
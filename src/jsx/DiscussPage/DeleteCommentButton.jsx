import React from 'react'
import {Button} from 'react-bootstrap'
import {DeleteFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const DeleteCommentButton = (props)=>{
    const {cid} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/comments/${cid}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)

            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async ()=>{
        if(confirm('确认删除该回复吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const body = {username,token,cid}
            handle(body)
        }
    }
    return(
        <DeleteFilled style={{ fontSize: '23px'}} onClick={()=>handleDelete()}/>
    )
}

export default DeleteCommentButton
import React from 'react'
import {EnterOutlined} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const DeletePcommentButton = (props)=>{
    const {pid} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/pcomments/${pid}`,{
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
        if(confirm('确认撤回该回复吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const body = {username,token,pid}
            handle(body)
        }
    }
    return(
        <EnterOutlined style={{ fontSize: '23px'}} onClick={()=>handleDelete()}/>
    )
}

export default DeletePcommentButton
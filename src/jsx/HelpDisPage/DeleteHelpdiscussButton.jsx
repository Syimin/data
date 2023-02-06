import React from 'react'
import {withRouter} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {DeleteFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'

const DeleteHelpdiscussButton = (props)=>{
    const {hid,history} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/helpdiscusses/${hid}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                history.push('/helpdiscusses')
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async ()=>{
        if(confirm('确认删除该求助讨论吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const body = {username,token,hid}
            handle(body)
        }
    }
    return(
        <DeleteFilled style={{ fontSize: '26px'}} onClick={()=>handleDelete()}/>
    )
}

export default withRouter(DeleteHelpdiscussButton)
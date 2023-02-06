import React,{useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {DeleteFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN} from '../../config'
import {userContext} from '../App'

const DeletePletterButton = (props)=>{
    const {user} = useContext(userContext)
    const {pid,history} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/pletters/${pid}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                history.push(`/profilepletter/${user._id}`)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async ()=>{
        if(confirm('确认删除该私信吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const body = {username,token,pid}
            handle(body)
        }
    }
    return(
        <DeleteFilled style={{ fontSize: '26px'}} onClick={()=>handleDelete()}/>
    )
}

export default withRouter(DeletePletterButton)
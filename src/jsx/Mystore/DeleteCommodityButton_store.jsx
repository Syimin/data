import React from 'react'
import {withRouter} from 'react-router-dom'
import {DeleteFilled} from '@ant-design/icons';
import {HOST,PORT,DOMAIN,DOMAIN2} from '../../config'

const DeleteCommodityButton_store = (props)=>{
    const {cid,history} = props
    const handle = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/storecommodities/${cid}`,{
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                history.push('/storecommodities')

            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleDelete = async ()=>{
        if(confirm('确认删除该商品吗？')){
            const {username,token} = JSON.parse(localStorage.getItem(DOMAIN))
            const {storename,s_token} = JSON.parse(localStorage.getItem(DOMAIN2))
            const body = {username,token,cid,storename,s_token}
            handle(body)
        }
    }
    return(
        <DeleteFilled style={{ fontSize: '26px'}} onClick={()=>handleDelete()}/>
    )
}

export default withRouter(DeleteCommodityButton_store)
import React from 'react'
import {Form,Button} from 'react-bootstrap'
import {HOST,PORT,DOMAIN} from '../../config'

const ReplyForm = (props)=>{
    const {uid,loadUnlikediscuss} = props
    const reply = async (body)=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/unlikecomments/${uid}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)//将body转化为字符串来调用接口
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                loadUnlikediscuss()
                document.forms.replyForm.content.value=""
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    const handleReply = async (e)=>{
        e.preventDefault()//阻止页面刷新
        const storage = await localStorage.getItem(DOMAIN)
        const {username,token} = JSON.parse(storage)
        const form = document.forms.replyForm   
        const content = form.content.value
        const body = {username,token,content}
        reply(body)
    }
    return(
        <Form id="replyForm" className="p-3">
            <Form.Group controlId="content">
                <Form.Label>回复</Form.Label>
                <Form.Control as="textarea" rows="3"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>handleReply(e)}>提交</Button>
        </Form>
    )
}

export default ReplyForm
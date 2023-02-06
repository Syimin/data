import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Discuss from './Discuss'
import CarouselsD from './CarouselsD'
import ReplyForm from './ReplyForm'
import ModifyButton from './ModifyButton'
import DeleteDiscussButton from './DeleteDiscussButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const DiscussPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {did} = props.match.params//从浏览器地址栏匹配到did
    const [discuss,setDiscuss] = useState({})
    const [comments,setComments] = useState([])
    const loadDiscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/discusses/${did}`)
            const result = await res.json()
            if(res.ok){
                setDiscuss(result.data.discuss)
                setComments(result.data.comments)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <Container>
                <Row>
                    <Col sm={12} md={5}>
                        <CarouselsD did={did} loadDiscuss={loadDiscuss} discuss={discuss}/>
                    </Col>
                    <Col sm={12} md={7}>
                        {discuss.author && user.username === discuss.author.username
                        ? (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyButton did={did} loadDiscuss={loadDiscuss}/>  
                                <DeleteDiscussButton did={did}/>
                            </ButtonGroup>
                        </Row>)
                        : null
                        }
                    
                        <Discuss did={did} loadDiscuss={loadDiscuss} comments={comments} discuss={discuss}/>
                        {auth
                        ? <ReplyForm did={did} loadDiscuss={loadDiscuss}/>
                        : null
                        }
                    </Col>
                 </Row>
                 <BackTop/>
        </Container>
    )
}

export default DiscussPage
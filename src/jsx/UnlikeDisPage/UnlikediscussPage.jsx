import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Unlikediscuss from './Unlikediscuss'
import CarouselsU from './CarouselsU'
import ReplyForm from './ReplyForm'
import ModifyButton from './ModifyButton'
import DeleteUnlikediscussButton from './DeleteUnlikediscussButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const UnlikediscussPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {uid} = props.match.params//从浏览器地址栏匹配到did
    const [unlikediscuss,setUnlikediscuss] = useState({})
    const [unlikecomments,setUnlikecomments] = useState([])
    const loadUnlikediscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/unlikediscusses/${uid}`)
            const result = await res.json()
            if(res.ok){
                setUnlikediscuss(result.data.unlikediscuss)
                setUnlikecomments(result.data.unlikecomments)
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
                        <CarouselsU uid={uid} loadUnlikediscuss={loadUnlikediscuss} unlikediscuss={unlikediscuss}/>
                    </Col>
                    <Col sm={12} md={7}>
                    {unlikediscuss.author && user.username === unlikediscuss.author.username
                    ? (
                    <Row className="m-0">
                        <ButtonGroup className="ml-auto">
                            <ModifyButton uid={uid} loadUnlikediscuss={loadUnlikediscuss}/>
                            <DeleteUnlikediscussButton uid={uid}/>
                        </ButtonGroup>
                    </Row>)
                    : null
                    }
                
                <Unlikediscuss uid={uid} loadUnlikediscuss={loadUnlikediscuss} unlikecomments={unlikecomments} unlikediscuss={unlikediscuss}/>
                {auth
                ? <ReplyForm uid={uid} loadUnlikediscuss={loadUnlikediscuss}/>
                : null
                }
                    </Col>
                 </Row>
                <BackTop/>
        </Container>
    )
}

export default UnlikediscussPage
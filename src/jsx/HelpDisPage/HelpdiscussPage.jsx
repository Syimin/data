import React,{useState,useEffect,useContext} from 'react'
import {Container,Row,ButtonGroup,Col} from 'react-bootstrap'
import { BackTop } from 'antd';
import Helpdiscuss from './Helpdiscuss'
import CarouselsH from './CarouselsH'
import ReplyForm from './ReplyForm'
import ModifyButton from './ModifyButton'
import DeleteHelpdiscussButton from './DeleteHelpdiscussButton'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const HelpdiscussPage = (props)=>{
    const {user,auth} = useContext(userContext)
    const {hid} = props.match.params//从浏览器地址栏匹配到did
    const [helpdiscuss,setHelpdiscuss] = useState({})
    const [helpcomments,setHelpcomments] = useState([])
    const loadHelpdiscuss = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/helpdiscusses/${hid}`)
            const result = await res.json()
            if(res.ok){
                setHelpdiscuss(result.data.helpdiscuss)
                setHelpcomments(result.data.helpcomments)
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
                        <CarouselsH hid={hid} loadHelpdiscuss={loadHelpdiscuss} helpdiscuss={helpdiscuss}/>
                    </Col>
                    <Col sm={12} md={7}>
                    {helpdiscuss.author && user.username === helpdiscuss.author.username
                        ? (
                        <Row className="m-0">
                            <ButtonGroup className="ml-auto">
                                <ModifyButton hid={hid} loadHelpdiscuss={loadHelpdiscuss}/>
                                <DeleteHelpdiscussButton hid={hid}/>
                            </ButtonGroup>
                        </Row>)
                        : null
                        }
                    
                    <Helpdiscuss hid={hid} loadHelpdiscuss={loadHelpdiscuss} helpcomments={helpcomments} helpdiscuss={helpdiscuss}/>
                    {auth
                    ? <ReplyForm hid={hid} loadHelpdiscuss={loadHelpdiscuss}/>
                    : null
                    }
                    </Col>
                </Row>
                <BackTop/>
        </Container>
    )
}

export default HelpdiscussPage
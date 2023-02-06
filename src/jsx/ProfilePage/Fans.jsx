import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import { Tabs} from 'antd';
import {HOST,PORT} from '../../config'

const FanInfo = (props)=>{
    const {fans} = props
    const lines = fans.map((fan,idx)=>{
        return(
            <div style={{textAlign:"center",backgroundPosition:"relative"}}>
            <ListGroup.Item  key={idx} className="d-flex justify-content-between">
                <Link to={`/profileclick/${fan._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 rounded-circle"
                    src={fan.avatar ? `/upload/${fan.avatar}` : "/img/avatar.jpg"}
                    />
                </Link>
                <Link to={`/profileclick/${fan._id}`}>
                    <span style={{fontSize:"18px"}}>{fan.nickname ? fan.nickname : fan.username}</span>
                </Link>
                <small className="text-muted">
                    {fan.description}
                </small>
            </ListGroup.Item>
            </div>
        )
    })
    return(
        <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">TA的粉丝</Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ListGroup variant="flush">
                                {lines}
                            </ListGroup>
                            <hr/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
    )
}

const Fans = (props)=>{
    const {uid} = props
    const [user,setUser] = useState({})
    const [fans,setFans] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUser(result.data)
                setFans(result.data.fans)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <div>
            <FanInfo fans={fans}/>
        </div>
    )
}

export default Fans

import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import { Tabs} from 'antd';
import {HOST,PORT} from '../../config'

const FollowerInfo = (props)=>{
    const {followers2} = props
    const lines = followers2.map((follower2,idx)=>{
        return(
            <div style={{textAlign:"center",backgroundPosition:"relative"}}>
            <ListGroup.Item  key={idx} className="d-flex justify-content-between">
                <Link to={`/profilestoreinfoclick/${follower2._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 rounded-circle"
                    src={follower2.avatar ? `/upload/${follower2.avatar}` : "/img/avatar.jpg"}
                    />
                </Link>
                <Link to={`/profilestoreinfoclick/${follower2._id}`}>
                    <span style={{fontSize:"18px"}}>{follower2.storename}</span>
                </Link>
                <small className="text-muted">
                    {follower2.description}
                </small>
            </ListGroup.Item>
            </div>
        )
    })
    return(
        <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">TA关注的商铺</Accordion.Toggle>
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

const Followers2 = (props)=>{
    const {uid} = props
    const [user,setUser] = useState({})
    const [followers2,setFollowers2] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUser(result.data)
                setFollowers2(result.data.followers2)
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
            <FollowerInfo followers2={followers2}/>
        </div>
    )
}

export default Followers2

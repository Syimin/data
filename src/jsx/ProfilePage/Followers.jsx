import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import { Tabs} from 'antd';
import {HOST,PORT} from '../../config'

const FollowerInfo = (props)=>{
    const {followers} = props
    const lines = followers.map((follower,idx)=>{
        return(
            <div style={{textAlign:"center",backgroundPosition:"relative"}}>
            <ListGroup.Item  key={idx} className="d-flex justify-content-between">
                <Link to={`/profileclick/${follower._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 rounded-circle"
                    src={follower.avatar ? `/upload/${follower.avatar}` : "/img/avatar.jpg"}
                    />
                </Link>
                <Link to={`/profileclick/${follower._id}`}>
                    <span style={{fontSize:"18px"}}>{follower.nickname ? follower.nickname : follower.username}</span>
                </Link>
                <small className="text-muted">
                    {follower.description}
                </small>
            </ListGroup.Item>
            </div>
        )
    })
    return(
        <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">TA的关注</Accordion.Toggle>
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

const Followers = (props)=>{
    const {uid} = props
    const [user,setUser] = useState({})
    const [followers,setFollowers] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUser(result.data)
                setFollowers(result.data.followers)
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
            <FollowerInfo followers={followers}/>
        </div>
    )
}

export default Followers

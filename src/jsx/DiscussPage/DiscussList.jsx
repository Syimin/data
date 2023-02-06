import React,{useState,useEffect} from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Card} from 'antd';
import { LikeOutlined, EllipsisOutlined, StarOutlined } from '@ant-design/icons';
import {HOST,PORT} from '../../config'

const Floor = (props)=>{
    const {picture} = props
    return(
            <div>
            <img 
            height="85px"
            width="105px"
            src={`/upload/${picture}`}
            style={{float:"left",width:"30.33%" ,paddingRight:"2px",paddingBottom:"5px",paddingLeft:"2px", borderRadius:"12px 12px 12px 12px"}}
            />
            </div>
    )
   
}

const Row1 = (props)=>{
    const {discuss} = props
    if(!discuss.pictures) return null
    const pictures = discuss.pictures
    const floors = pictures.map((picture,idx)=>{
        return(
            <div>
                <Floor key={idx} picture={picture}/>
            </div>
        )
    })
    return(
        <>
        <Card
            style={{ width: 333 }}
        >
            <img
                width={32}
                height={32}
                className="mr-3 rounded-circle"
                src={discuss.author.avatar ? `/upload/${discuss.author.avatar}` : '/img/avatar.jpg'}
                alt={discuss.author.nickname ? discuss.author.nickname : discuss.author.username}
            />
                    {discuss.author.nickname ? discuss.author.nickname : discuss.author.username}&nbsp;&nbsp;
                    <span style={{fontSize:"11px",color:"gray"}}>({new Date(discuss.posttime).toLocaleString()})</span>
                    <br/>
                    <span style={{paddingLeft:"10px" ,fontSize:"15px"}}>{discuss.title}</span>
                <br/>
                <span style={{paddingLeft:"10px",paddingBottom:"15px"}}>{discuss.content}</span>
                <Link to={`/discusses/${discuss._id}`}>
                    {floors}
                </Link>
            
        </Card>
        <div>
            <img 
            src='/img/1.png'
            height="35px"
            />
        </div>
        </>
    )
}

const DiscussList = (props)=>{
    const {loadDiscusses,discusses} = props
    useEffect(()=>{
        loadDiscusses()
    },[])
    //数据转换成每行的视图
    const rows = discusses.map((discuss,idx)=>{
        return(
            <Col md={4} key={idx}>
                <Row1 discuss={discuss}/>
            </Col>
         
        )
    })

    return(
        <Container>
            <Row>
                {rows} 
            </Row>
        </Container>
    )
}

export default DiscussList
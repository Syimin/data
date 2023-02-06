import React,{useState,useEffect} from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import { Card} from 'antd';
import {Link} from 'react-router-dom'
import {HOST,PORT} from '../../config'

const { Meta } = Card;

const Floor = (props)=>{
    const {picture} = props
    return(
            <div>
            <img 
            height="85px"
            width="105px"
            src={`/upload/${picture}`}
            style={{float:"left",width:"30.33%" ,paddingRight:"2px",paddingBottom:"5px",paddingLeft:"2px", borderRadius:"10px 10px 10px 10px"}}
            />
            </div>
    )
   
}

const Row1 = (props)=>{
    const {helpdiscuss} = props
    if(!helpdiscuss.pictures) return null
    const pictures = helpdiscuss.pictures
    const floors = pictures.map((picture,idx)=>{
        return(
            <div>
                <Floor key={idx} picture={picture}/>
            </div>
        )
    })
    console.log(floors)
    return(
        <>
        <Card
            style={{ width: 333 }}
        >
            <img
                width={32}
                height={32}
                className="mr-3 rounded-circle"
                src={helpdiscuss.author.avatar ? `/upload/${helpdiscuss.author.avatar}` : '/img/avatar.jpg'}
                alt={helpdiscuss.author.nickname ? helpdiscuss.author.nickname : helpdiscuss.author.username}
            />
                {helpdiscuss.author.nickname ? helpdiscuss.author.nickname : helpdiscuss.author.username}&nbsp;&nbsp;
                <span style={{fontSize:"11px",color:"gray"}}>({new Date(helpdiscuss.posttime).toLocaleString()})</span>
                <br/>
                <span style={{paddingLeft:"10px" ,fontSize:"15px"}}>{helpdiscuss.title}</span>
            <br/>
            <span style={{paddingLeft:"10px",paddingBottom:"15px"}}>{helpdiscuss.content}</span>
            <Link to={`/helpdiscusses/${helpdiscuss._id}`}>
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

const HelpdiscussList = (props)=>{
    const {loadHelpdiscusses,helpdiscusses} = props
    useEffect(()=>{
        loadHelpdiscusses()
    },[])
    //数据转换成每行的视图
    const rows = helpdiscusses.map((helpdiscuss,idx)=>{
        return(
            <Col sm={12} md={4} key={idx}>
                <Row1 helpdiscuss={helpdiscuss}/>
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

export default HelpdiscussList
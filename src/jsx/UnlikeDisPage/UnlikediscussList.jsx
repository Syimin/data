import React,{useState,useEffect} from 'react'
import {Col,Row,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Card} from 'antd';
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
    const {unlikediscuss} = props
    const [num,setNum] = useState(1)
    if(!unlikediscuss.pictures) return null
    const pictures = unlikediscuss.pictures
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
            <Link to={`/unlikediscusses/${unlikediscuss._id}`}>
                <img
                    width={32}
                    height={32}
                    className="mr-3 rounded-circle"
                    src={unlikediscuss.author.avatar ? `/upload/${unlikediscuss.author.avatar}` : '/img/avatar.jpg'}
                    alt={unlikediscuss.author.nickname ? unlikediscuss.author.nickname : unlikediscuss.author.username}
                />
            </Link>
                    {unlikediscuss.author.nickname ? unlikediscuss.author.nickname : unlikediscuss.author.username}&nbsp;&nbsp;
                    <span style={{fontSize:"11px",color:"gray"}}>({new Date(unlikediscuss.posttime).toLocaleString()})</span>
                    <br/>
                    <span style={{paddingLeft:"10px" ,fontSize:"15px"}}>{unlikediscuss.title}</span>
                <br/>
                <span style={{paddingLeft:"10px",paddingBottom:"15px"}}>{unlikediscuss.content}</span>
                <Link to={`/unlikediscusses/${unlikediscuss._id}`}>
                    {floors}
                </Link>
                
                {/* <hr style={{width:"100%",height: "1px",border:"none", borderBottom: "1px solid #b9c2d0"}} /> */}
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

const UnlikediscussList = (props)=>{
    const {loadUnlikediscusses,unlikediscusses} = props
    useEffect(()=>{
        loadUnlikediscusses()
    },[])
    //数据转换成每行的视图
    const rows = unlikediscusses.map((unlikediscuss,idx)=>{
        return(
            <Col sm={12} md={4} key={idx}>
                <Row1 unlikediscuss={unlikediscuss}/>
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

export default UnlikediscussList
import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import {Tabs} from 'antd';
const { TabPane } = Tabs;
import {HOST,PORT} from '../../config'

const PletterInfo = (props)=>{
    const {pletters} = props
    const lines = pletters.map((pletter,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <div>
                    <Link to={`/profileclick/${pletter.author._id}`}>
                        <img
                        width={32}
                        height={32}
                        className="mr-3 rounded-circle"
                        src={pletter.author.avatar ? `/upload/${pletter.author.avatar}` : '/img/avatar.jpg'}
                        />
                    </Link>
                    <br/>
                    <span style={{paddingLeft:"3px"}}>{pletter.author.username}</span>
                </div>
                <Link to={`/pletter/${pletter._id}`}>
                    <span>{pletter.content}</span>
                </Link>
                <small className="text-muted">
                    {new Date(pletter.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const FromsbPletter = (props)=>{
    const {uid} = props
    const [pletters,setPletters] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/pletters/fromsb/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setPletters(result.data)
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
            <PletterInfo pletters={pletters}/>
        </div>
    )
}


export default FromsbPletter

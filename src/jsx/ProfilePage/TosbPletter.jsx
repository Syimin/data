import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import {Tabs} from 'antd';
import {HOST,PORT} from '../../config'

const PletterInfo = (props)=>{
    const {pletters} = props
    const lines = pletters.map((pletter,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <div>
                    <Link to={`/profileclick/${pletter.target._id}`}>
                        <img
                        width={32}
                        height={32}
                        className="mr-3 rounded-circle"
                        src={pletter.target.avatar ? `/upload/${pletter.target.avatar}` : '/img/avatar.jpg'}
                        />
                    </Link>
                    <br/>
                    <span style={{paddingLeft:"3px"}}>{pletter.target.username}</span>
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

const TosbPletter = (props)=>{
    const {uid} = props
    const [pletters,setPletters] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/pletters/tosb/${uid}`,{
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

// const TosbPletter2 = ()=>{
//     return(
//         <Switch>
//             <Route exact path="/profilepletter/:uid" component={TosbPletter}/>
//             <Route exact path="/profilepletter/:pid" component={PletterPage}/>
//         </Switch>
//     )
   
// }

export default TosbPletter

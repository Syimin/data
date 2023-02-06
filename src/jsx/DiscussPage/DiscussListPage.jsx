import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import { BackTop } from 'antd';
// import PostDiscussesButton from './PostDiscussesButton'
import DiscussList from './DiscussList'
import DiscussPage from './DiscussPage'
import {HOST,PORT} from '../../config'

import {userContext} from '../App'

const DiscussListTable = ()=>{
    const [discusses,setDiscusses] = useState([])
    const {auth} = useContext(userContext)
    const loadDiscusses = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/discusses`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setDiscusses(result.data)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <Container>
            {auth
            ?
            (
            <div>
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>闲聊区</p>
                <Link to="/postdiscuss">
                    <PlusCircleFilled style={{fontSize:"35px",paddingBottom:"30px",color:"green"}}/>
                </Link>
                
            </div>
            )
            :null
            }
            <DiscussList loadDiscusses={loadDiscusses} discusses={discusses}/>
            <BackTop/>
        </Container>
    )
}


const DiscussListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/discusses" component={DiscussListTable}/>
            <Route exact path="/discusses/:did" component={DiscussPage}/>
        </Switch>
    )
   
}

export default DiscussListPage
import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import { BackTop } from 'antd';
// import PostHelpdiscussesButton from './PostHelpdiscussesButton'
import HelpdiscussList from './HelpdiscussList'
import HelpdiscussPage from './HelpdiscussPage'
import {HOST,PORT} from '../../config'

import {userContext} from '../App'

const HelpdiscussListTable = ()=>{
    const [helpdiscusses,setHelpdiscusses] = useState([])
    const {auth} = useContext(userContext)
    const loadHelpdiscusses = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/helpdiscusses`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setHelpdiscusses(result.data)
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
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>求助区</p>
                <Link to="/posthelpdiscuss">
                    <PlusCircleFilled style={{fontSize:"35px",paddingBottom:"30px",color:"red"}}/>
                </Link>
                
            </div>
            )
            :null
            }
            <HelpdiscussList loadHelpdiscusses={loadHelpdiscusses} helpdiscusses={helpdiscusses}/>
            <BackTop/>
        </Container>
    )
}


const HelpdiscussListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/helpdiscusses" component={HelpdiscussListTable}/>
            <Route exact path="/helpdiscusses/:hid" component={HelpdiscussPage}/>
        </Switch>
    )
   
}

export default HelpdiscussListPage
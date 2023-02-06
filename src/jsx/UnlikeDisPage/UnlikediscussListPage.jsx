import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import { BackTop } from 'antd';
// import PostUnlikediscussesButton from './PostUnlikediscussesButton'
import UnlikediscussList from './UnlikediscussList'
import UnlikediscussPage from './UnlikediscussPage'
import {HOST,PORT} from '../../config'

import {userContext} from '../App'

const UnlikediscussListTable = ()=>{
    const [unlikediscusses,setUnlikediscusses] = useState([])
    const {auth} = useContext(userContext)
    const loadUnlikediscusses = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/unlikediscusses`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUnlikediscusses(result.data)
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
                    <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>吐槽区</p>
                    <Link to="/postunlikediscuss">
                        <PlusCircleFilled style={{fontSize:"35px",paddingBottom:"30px",color:"gray"}}/>
                    </Link>
                    
                </div>
            )
            : null
            }
            <UnlikediscussList loadUnlikediscusses={loadUnlikediscusses} unlikediscusses={unlikediscusses}/>
            <BackTop/>
        </Container>
    )
}


const UnlikediscussListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/unlikediscusses" component={UnlikediscussListTable}/>
            <Route exact path="/unlikediscusses/:uid" component={UnlikediscussPage}/>
        </Switch>
    )
   
}

export default UnlikediscussListPage
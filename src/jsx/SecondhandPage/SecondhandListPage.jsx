import React,{useState,useContext} from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {PlusCircleFilled} from '@ant-design/icons'
import SecondhandCard from './SecondhandCard'
import SecondhandPage from './SecondhandPage'
import {HOST,PORT} from '../../config'
import {userContext} from '../App'

const SecondhandListTable = ()=>{
    const [secondhands,setSecondhands] = useState([])
    const {auth} = useContext(userContext)
    const loadSecondhands = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/secondhands`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setSecondhands(result.data)
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
                <p style={{fontSize:"25px",textAlign:"center",color:"gray"}}>二手区</p>
                <Link to="/postsecondhand">
                    <PlusCircleFilled style={{fontSize:"35px",color:"#0A8ADB"}}/>
                </Link>
            </div>
            )
            :null
            }
            <SecondhandCard loadSecondhands={loadSecondhands} secondhands={secondhands}/>
        </Container>
    )
}

const SecondhandListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/secondhands" component={SecondhandListTable}/>
            <Route exact path="/secondhands/:sid" component={SecondhandPage}/>
        </Switch>
    )
}

export default SecondhandListPage
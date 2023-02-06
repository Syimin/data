import React,{useState,useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import SecondhandCard from '../SecondhandPage/SecondhandCard'
import SecondhandPage from '../SecondhandPage/SecondhandPage'
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
            <SecondhandCard loadSecondhands={loadSecondhands} secondhands={secondhands}/>
        </Container>
    )
}

const SecondhandListPage2 = ()=>{
    return(
        <Switch>
            <Route exact path="/" component={SecondhandListTable}/>
            <Route exact path="/home" component={SecondhandListTable}/>
            <Route exact path="/secondhands/:sid" component={SecondhandPage}/>
        </Switch>
    )
}

export default SecondhandListPage2
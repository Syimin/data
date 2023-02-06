import React,{useState,useContext} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import StoreList from './StoreList'
import {HOST,PORT} from '../../config'


const StoreListTable = ()=>{
    const [stores,setStores] = useState([])
    const loadStores = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/stores`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setStores(result.data)
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return(
        <Container>
            <StoreList loadStores={loadStores} stores={stores}/>
        </Container>
    )
}

const StoreListPage = ()=>{
    return(
        <Switch>
            <Route exact path="/stores" component={StoreListTable}/>
        </Switch>
    )
}

export default StoreListPage
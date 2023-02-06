import React from 'react'
import {Container} from 'react-bootstrap'
import ShoppingCart from './ShoppingCart'

const ShoppingCart2 = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <ShoppingCart uid={uid}/>
        </Container>
    )  
}

export default ShoppingCart2
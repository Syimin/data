import React from 'react'
import {Container} from 'react-bootstrap'
import StoreInfo from './StoreInfo'
// import DeleteStoreButton from './DeleteStoreButton'

const ProfileStorePage = (props)=>{
    const {sid} = props.match.params
    return(
        <Container>
            <StoreInfo sid={sid}/>
        </Container>
    )
}

export default ProfileStorePage
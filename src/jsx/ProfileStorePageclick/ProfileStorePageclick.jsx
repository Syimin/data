import React from 'react'
import {Container} from 'react-bootstrap'
import StoreInfoclick from './StoreInfoclick'
// import DeleteStoreButton from './DeleteStoreButton'

const ProfileStorePageclick = (props)=>{
    const {sid} = props.match.params
    return(
        <Container>
            <StoreInfoclick sid={sid}/>
        </Container>
    )
}

export default ProfileStorePageclick
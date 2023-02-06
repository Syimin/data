import React from 'react'
import {Container} from 'react-bootstrap'
import Followers2 from './Followers2'

const ProfileStorePage2 = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <Followers2 uid={uid}/>
        </Container>
    )  
}

export default ProfileStorePage2
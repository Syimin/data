import React from 'react'
import {Container} from 'react-bootstrap'
import Fans from './Fans'

const ProfilePage_fans = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <Fans uid={uid}/>
        </Container>
    )  
}

export default ProfilePage_fans
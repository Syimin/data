import React from 'react'
import {Container} from 'react-bootstrap'
import Followers from './Followers'

const ProfilePage_followers = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <Followers uid={uid}/>
        </Container>
    )  
}

export default ProfilePage_followers
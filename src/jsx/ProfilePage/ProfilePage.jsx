import React from 'react'
import {Container} from 'react-bootstrap'
import UserInfo from './UserInfo'

const ProfilePage = (props)=>{
    const {uid} = props.match.params
    return(
        <Container>
            <UserInfo uid={uid}/>
        </Container>
    )  
}

export default ProfilePage
import React,{useContext} from 'react'
import {withRouter} from 'react-router-dom'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {HOST,PORT,DOMAIN,DOMAIN2} from '../config'
import LoginButton from './LoginButton'
import LoginStoreButton from './LoginStoreButton'

import {userContext} from './App'

const Header = (props)=>{
    const {history} = props//浏览记录
    const {user,setUser,store,setStore,auth,setAuth,auth2,setAuth2} = useContext(userContext)
    const logout = async ()=>{
        try {
            const data = await localStorage.getItem(DOMAIN)
            const res = await fetch(`${HOST}:${PORT}/api/users/logout`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:data
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                const data = {
                    s_token:null
                }//从响应体中获取用户名和token
                await localStorage.setItem(DOMAIN2,JSON.stringify(data))//将data存到用户的浏览器setItem(a,b)里的a代表键，b代表值
                setAuth(false)
                setAuth2(false)
                setUser({})
                setStore({})
                history.push('/')
                
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const logout2 = async ()=>{
        try {
            const data = await localStorage.getItem(DOMAIN2)
            const res = await fetch(`${HOST}:${PORT}/api/stores/logout`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:data
            })
            const result = await res.json()
            if(res.ok){
                alert(result.message)
                setAuth2(false)
                setStore({})
                history.push('/')
                
            }else{
                alert(result.message)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const Avatar = ()=>{
        return(
            <div>
                <img
                    src={user.avatar ? `/upload/${user.avatar}` : '/img/avatar.jpg'}
                    alt="头像"
                    width={32}
                    height={32}
                    className="rounded"
                />
                <span style={{color:"black"}} onClick={()=>logout()}>退出</span>
            </div>
        )
    }

    const Avatar2 = ()=>{
        return(
            <div>
                <img
                    src={store.avatar ? `/upload/${store.avatar}` : '/img/avatar.jpg'}
                    alt="头像"
                    width={32}
                    height={32}
                    className="rounded"
                />
                <span style={{color:"black"}} onClick={()=>logout2()}>退出</span>
            </div>
        )
    }

    return(
        <Navbar bg="light " variant="light" expand="lg">
            <Navbar.Brand href="#">Pocket TKK</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/home/">
                        <Nav.Link>首页</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/commodities/">
                        <Nav.Link>商品</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/discusses/">
                        <Nav.Link>讨论区</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`/shoppingcart/${user._id}`}>
                        <Nav.Link>购物车</Nav.Link>
                    </LinkContainer>
                    <NavDropdown title="个人中心" id="basic-navbar-dropdown">
                        {auth
                        ?(<LinkContainer to={`/profile/${user._id}`}>
                            <NavDropdown.Item>个人信息</NavDropdown.Item>
                        </LinkContainer>)
                        : null
                        }
                        {auth2
                        ?(<LinkContainer to={`/profilestore/${store._id}`}>
                            <NavDropdown.Item>个人商铺</NavDropdown.Item>
                        </LinkContainer>)
                        : null
                        }
                    </NavDropdown>
                </Nav>
                <div className="ml-auto">
                    {auth ? <Avatar/> : <LoginButton/>}
                </div>
                    {auth2 ? <Avatar2/> : <LoginStoreButton/>}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Header)
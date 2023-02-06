import React,{createContext,useEffect,useState} from 'react'
import {Route,Switch} from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import HomePage from './HomePage/HomePage'
import Headerleft from './CommodityListPage/Headerleft'
import Postcommodity from './CommodityListPage/Postcommodity'
import Postcommodity_store from './Mystore/Postcommodity_store'
import Postsecondhand from './SecondhandPage/Postsecondhand'
import Postgroupbuy from './GroupbuyPage/Postgroupbuy'
import Postdiscuss from './DiscussPage/Postdiscuss'
import Posthelpdiscuss from './HelpDisPage/Posthelpdiscuss'
import Postlikediscuss from './LikeDisPage/Postlikediscuss'
import Postunlikediscuss from './UnlikeDisPage/Postunlikediscuss'
import ProfilePageclick from './ProfilePageclick/ProfilePageclick'
import ProfileStorePageclick from './ProfileStorePageclick/ProfileStorePageclick'
import ProfilePage from './ProfilePage/ProfilePage'
import ProfilePage_followers from './ProfilePage/ProfilePage_followers'
import ProfilePage_fans from './ProfilePage/ProfilePage_fans'
import ProfileStorePage2 from './ProfilePage/ProfileStorePage2'
import SettingPage from './ProfilePage/SettingPage'
import PletterPage from './ProfilePage/PletterPage'
import SettingStorePage from './ProfileStorePage/SettingStorePage'
import ProfileStorePage from './ProfileStorePage/ProfileStorePage'
import ProfilePletter from './ProfilePage/ProfilePletter'
import Headerleft2 from './DiscussPage/Headerleft2'
import ShoppingCart2 from './ProfilePage/ShoppingCart2'
import {HOST,PORT,DOMAIN,DOMAIN2} from '../config'



const userContext = createContext({
    user:{},
    setUser:()=>{},
    store:{},
    setStore:()=>{},
    auth:false,
    setAuth:()=>{},
    auth2:false,
    setAuth2:()=>{}
})

const App = ()=>{
    const [user,setUser] = useState({})
    const [store,setStore] = useState({})
    const [auth,setAuth] = useState(false)
    const [auth2,setAuth2] = useState(false)
    const authenticate = async ()=>{
        try {
            const data = await localStorage.getItem(DOMAIN)
            const res = await fetch(`${HOST}:${PORT}/api/users/auth`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:data
            })
            const result = await res.json()
            if(res.ok){
                setAuth(true)
                setUser(result.data)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const authenticate2 = async ()=>{
        try {
            const data = await localStorage.getItem(DOMAIN2)
            const res = await fetch(`${HOST}:${PORT}/api/stores/auth`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:data
            })
            const result = await res.json()
            if(res.ok){
                setAuth2(true)
                setStore(result.data)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    
    useEffect(()=>{
        authenticate();
        authenticate2()
    },[])
    return(
        <userContext.Provider value={{user,setUser,store,setStore,auth,setAuth,auth2,setAuth2}}>
            <Header/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/home" component={HomePage}/>
                <Route path="/postcommodity" component={Postcommodity}/>
                <Route path="/poststorecommodity" component={Postcommodity_store}/>
                <Route path="/postsecondhand" component={Postsecondhand}/>
                <Route path="/postgroupbuy" component={Postgroupbuy}/>
                <Route path="/postdiscuss" component={Postdiscuss}/>
                <Route path="/posthelpdiscuss" component={Posthelpdiscuss}/>
                <Route path="/postlikediscuss" component={Postlikediscuss}/>
                <Route path="/postunlikediscuss" component={Postunlikediscuss}/>
                <Route path="/profileclick/:uid" component={ProfilePageclick}/>
                <Route path="/profilestoreinfoclick/:sid" component={ProfileStorePageclick}/>
                <Route path="/commodities" component={Headerleft}/>
                <Route path="/secondhands" component={Headerleft}/>
                <Route path="/groupbuys" component={Headerleft}/>
                <Route path="/stores" component={Headerleft}/>
                <Route path="/storecommodities" component={Headerleft}/>
                <Route path="/discusses" component={Headerleft2}/>
                <Route path="/helpdiscusses" component={Headerleft2}/>
                <Route path="/likediscusses" component={Headerleft2}/>
                <Route path="/unlikediscusses" component={Headerleft2}/>
                <Route path="/shoppingcart/:uid" component={ShoppingCart2}/>
                <Route path="/profile/:uid" component={ProfilePage}/>
                <Route path="/followers/:uid" component={ProfilePage_followers}/>
                <Route path="/fans/:uid" component={ProfilePage_fans}/>
                <Route path="/followers_store/:uid" component={ProfileStorePage2}/>
                <Route path="/setting/:uid" component={SettingPage}/>
                <Route path="/settingstore/:sid" component={SettingStorePage}/>
                <Route path="/profilestore/:sid" component={ProfileStorePage}/>
                <Route path="/profilepletter/:uid" component={ProfilePletter}/>
                <Route path="/pletter/:pid" component={PletterPage}/>
            </Switch>
            {/* <Footer/> */}
        </userContext.Provider>
    )
}

export {userContext}
export default App
import React,{useState,useEffect} from 'react'
import {Route, Switch, Link, withRouter } from 'react-router-dom';
import {Card,ListGroup,Row,Col,Accordion,Button} from 'react-bootstrap'
import {Tabs} from 'antd';
import SettingPage from './SettingPage'
const { TabPane } = Tabs;
import ProfilePletter from './ProfilePletter'
import {HOST,PORT} from '../../config'
import {
    MessageOutlined,
    ShoppingOutlined,
    ShopOutlined,
    StarOutlined,
    HeartOutlined,
    CoffeeOutlined,
    SoundOutlined,
    LikeOutlined,
    DislikeOutlined,
    AppstoreOutlined,
    UserSwitchOutlined,
    TeamOutlined,
    SmileOutlined,
    EditOutlined,
    MailOutlined
  } from '@ant-design/icons';

const ProfileInfo = (props)=>{
    const {user,followers,followers2,fans,wallpaper} = props
    return(
        <div style={{textAlign:"center",backgroundPosition:"relative"}}>
                <p>
                    <img 
                    width={1100}
                    height={200}
                    src={wallpaper.length ? `/upload/${user.wallpaper[0]}` : "/img/white.png"}
                    style={{backgroundPosition:"absolute"}}/>
                </p>
                <img
                width={96}
                height={96}
                className="img-thumbnail round"
                style={{borderRadius:"100%",backgroundPosition:"relative",marginTop: "-50px"}}
                src = {user.avatar ? `/upload/${user.avatar}` : "/img/avatar.jpg"}
                />
                <br/>
        <span style={{fontSize:"20px",paddingBottom:"6px"}}>{user.nickname ? user.nickname : user.username}</span>
        <br/>
        <Link to={`/followers/${user._id}`} style={{fontSize:"15px",color:"gray",paddingLeft:"5px",paddingRight:"5px"}}>关注 {followers.length}</Link>|<Link to={`/fans/${user._id}`} style={{fontSize:"15px",color:"gray",paddingLeft:"5px",paddingRight:"5px"}}>粉丝 {fans.length}</Link>|<Link to={`/followers_store/${user._id}`} style={{fontSize:"15px",color:"gray",paddingLeft:"5px",paddingRight:"5px"}}>商铺 {followers2.length}</Link>
        <p style={{fontSize:"12px",color:"gray",paddingTop:"6px"}}>{user.description ? user.description : "暂无简介"}</p>
        </div>
    )
  
}

const DiscussesInfo = (props)=>{
    const {discusses} = props
    const lines = discusses.map((discuss,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/discusses/${discuss._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${discuss.pictures[0]}`}
                    />
                </Link>
                <Link to={`/discusses/${discuss._id}`}>
                    <span>{discuss.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(discuss.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
            
        )
    })
    return(
        <div>
            {lines}
        </div>
    )
}


const HelpdiscussesInfo = (props)=>{
    const {helpdiscusses} = props
    const lines = helpdiscusses.map((helpdiscuss,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/helpdiscusses/${helpdiscuss._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${helpdiscuss.pictures[0]}`}
                    />
                </Link>
                <Link to={`/helpdiscusses/${helpdiscuss._id}`}>
                    <span>{helpdiscuss.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(helpdiscuss.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
            
        )
    })
    return(
            <div>
                {lines}
            </div>

    )
}


const LikediscussesInfo = (props)=>{
    const {likediscusses} = props
    const lines = likediscusses.map((likediscuss,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/likediscusses/${likediscuss._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${likediscuss.pictures[0]}`}
                    />
                </Link>
                <Link to={`/likediscusses/${likediscuss._id}`}>
                    <span>{likediscuss.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(likediscuss.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
            
        )
    })
    return(
        <div>
            {lines}
        </div>

    )
}


const UnlikediscussesInfo = (props)=>{
    const {unlikediscusses} = props
    const lines = unlikediscusses.map((unlikediscuss,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/unlikediscusses/${unlikediscuss._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${unlikediscuss.pictures[0]}`}
                    />
                </Link>
                <Link to={`/unlikediscusses/${unlikediscuss._id}`}>
                    <span>{unlikediscuss.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(unlikediscuss.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
            
        )
    })
    return(
        <div>
            {lines}
        </div>
    )
}


const McommoditiesInfo = (props)=>{
    const {mcommodities} = props
    const lines = mcommodities.map((mcommodity,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/commodities/${mcommodity._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${mcommodity.pictures[0]}`}
                    />
                </Link>
                <Link to={`/commodities/${mcommodity._id}`}>
                    <span>{mcommodity.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(mcommodity.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const SecondhandInfo = (props)=>{
    const {secondhands} = props
    const lines = secondhands.map((secondhand,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/secondhands/${secondhand._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${secondhand.pictures[0]}`}
                    />
                </Link>
                <Link to={`/secondhands/${secondhand._id}`}>
                    <span>{secondhand.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(secondhand.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const GroupbuyInfo = (props)=>{
    const {groupbuys} = props
    const lines = groupbuys.map((groupbuy,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/groupbuys/${groupbuy._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${groupbuy.pictures[0]}`}
                    />
                </Link>
                <Link to={`/groupbuys/${groupbuy._id}`}>
                    <span>{groupbuy.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(groupbuy.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
            {lines}
        </div>
    )
}

const MystoreInfo = (props)=>{
    const {stores} = props
    const lines = stores.map((store,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/profilestoreinfoclick/${store._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${store.avatar}`}
                    />
                </Link>
                <Link to={`/profilestoreinfoclick/${store._id}`}>
                    <span>{store.storename}</span>
                </Link>
                <small className="text-muted">
                    {new Date(store.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const CinformationsInfo = (props)=>{
    const {cinformations} = props
    const lines = cinformations.map((cinformation,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/storecommodities/${cinformation._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${cinformation.pictures[0]}`}
                    />
                </Link>
                <Link to={`/storecommodities/${cinformation._id}`}>
                    <span>{cinformation.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(cinformation.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const CollectInfo = (props)=>{
    const {collects} = props
    const lines = collects.map((collect,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/commodities/${collect._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${collect.pictures[0]}`}
                    />
                </Link>
                <Link to={`/commodities/${collect._id}`}>
                    <span>{collect.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(collect.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const CollectInfo2 = (props)=>{
    const {collects2} = props
    const lines = collects2.map((collect2,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                <Link to={`/secondhands/${collect2._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${collect2.pictures[0]}`}
                    />
                </Link>
                <Link to={`/secondhands/${collect2._id}`}>
                    <span>{collect2.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(collect2.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const CollectInfo3 = (props)=>{
    const {collects3} = props
    const lines = collects3.map((collect3,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/groupbuys/${collect3._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${collect3.pictures[0]}`}
                    />
                </Link>
                <Link to={`/groupbuys/${collect3._id}`}>
                    <span>{collect3.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(collect3.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}


const CollectInfo4 = (props)=>{
    const {collects4} = props
    const lines = collects4.map((collect4,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/storecommodities/${collect4._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${collect4.pictures[0]}`}
                    />
                </Link>
                <Link to={`/storecommodities/${collect4._id}`}>
                    <span>{collect4.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(collect4.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const LikeInfo1 = (props)=>{
    const {likesd} = props
    const lines = likesd.map((like1,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/discusses/${like1._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${like1.pictures[0]}`}
                    />
                </Link>
                <Link to={`/discusses/${like1._id}`}>
                    <span>{like1.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(like1.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const LikeInfo2 = (props)=>{
    const {likesh} = props
    const lines = likesh.map((like2,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/helpdiscusses/${like2._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${like2.pictures[0]}`}
                    />
                </Link>
                <Link to={`/helpdiscusses/${like2._id}`}>
                    <span>{like2.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(like2.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const LikeInfo3 = (props)=>{
    const {likesl} = props
    const lines = likesl.map((like3,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/likediscusses/${like3._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${like3.pictures[0]}`}
                    />
                </Link>
                <Link to={`/likediscusses/${like3._id}`}>
                    <span>{like3.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(like3.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const LikeInfo4 = (props)=>{
    const {likesu} = props
    const lines = likesu.map((like4,idx)=>{
        return(
            <ListGroup.Item key={idx} className="d-flex justify-content-between">
                 <Link to={`/unlikediscusses/${like4._id}`}>
                    <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail round"
                    src={`/upload/${like4.pictures[0]}`}
                    />
                </Link>
                <Link to={`/unlikediscusses/${like4._id}`}>
                    <span>{like4.title}</span>
                </Link>
                <small className="text-muted">
                    {new Date(like4.posttime).toLocaleString()}
                </small>
            </ListGroup.Item>
        )
    })
    return(
        <div>
           {lines}
        </div>
    )
}

const UserInfo = (props)=>{
    const {uid} = props
    const [user,setUser] = useState({})
    const [discusses,setDiscusses] = useState([])
    const [helpdiscusses,setHelpdiscusses] = useState([])
    const [likediscusses,setLikediscusses] = useState([])
    const [unlikediscusses,setUnlikediscusses] = useState([])
    const [mcommodities,setMcommodities] = useState([])
    const [secondhands,setSecondhands] = useState([])
    const [groupbuys,setGroupbuys] = useState([])
    const [stores,setStores] = useState([])
    const [cinformations,setCinformations] = useState([])
    const [collects,setCollects] = useState([])
    const [collects2,setCollects2] = useState([])
    const [collects3,setCollects3] = useState([])
    const [collects4,setCollects4] = useState([])
    const [followers,setFollowers] = useState([])
    const [fans,setFans] = useState([])
    const [followers2,setFollowers2] = useState([])
    const [likesd,setLikesd] = useState([])
    const [likesh,setLikesh] = useState([])
    const [likesl,setLikesl] = useState([])
    const [likesu,setLikesu] = useState([])
    const [wallpaper,setWallpaper] = useState([])
    const getUser = async ()=>{
        try {
            const res = await fetch(`${HOST}:${PORT}/api/users/${uid}`,{
                method:"GET"
            })
            const result = await res.json()
            if(res.ok){
                setUser(result.data)
                setDiscusses(result.data.discusses)
                setHelpdiscusses(result.data.helpdiscusses)
                setLikediscusses(result.data.likediscusses)
                setUnlikediscusses(result.data.unlikediscusses)
                setMcommodities(result.data.mcommodities)
                setSecondhands(result.data.secondhands)
                setGroupbuys(result.data.groupbuys)
                setStores(result.data.stores)
                setCinformations(result.data.cinformations)
                setCollects(result.data.collects)
                setCollects2(result.data.collects2)
                setCollects3(result.data.collects3)
                setCollects4(result.data.collects4)
                setFollowers(result.data.followers)
                setFans(result.data.fans)
                setFollowers2(result.data.followers2)
                setLikesd(result.data.likesd)
                setLikesh(result.data.likesh)
                setLikesl(result.data.likesl)
                setLikesu(result.data.likesu)
                setWallpaper(result.data.wallpaper)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        
        <div>
                <ProfileInfo 
                    user={user}
                    followers={followers}
                    followers2={followers2} 
                    fans={fans}
                    wallpaper={wallpaper}
                    />
                    <div style={{textAlign:"center"}}>
                        <Link to={`/setting/${user._id}`}>
                            <span style={{color:"gray",fontSize:"16px",paddingRight:"10px"}}  onClick={()=><SettingPage/>}><EditOutlined /> 编辑</span>
                        </Link>
                        |
                        <Link to={`/profilepletter/${user._id}`}>
                            <span style={{color:"green",fontSize:"16px",paddingLeft:"10px"}}  onClick={()=><ProfilePletter/>}><MailOutlined /> 信箱</span>
                        </Link>
                    </div>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab={<span><MessageOutlined />动态</span>} key="1" >
                        <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><CoffeeOutlined />闲聊区</span>} key="1" >
                                <DiscussesInfo discusses={discusses}/>
                            </TabPane>
                            <TabPane tab={<span><SoundOutlined />求助区</span>} key="2" >
                                <HelpdiscussesInfo helpdiscusses={helpdiscusses}/>
                            </TabPane>
                            <TabPane tab={<span><LikeOutlined />种草区</span>} key="3" >
                                <LikediscussesInfo likediscusses={likediscusses}/>
                            </TabPane>
                            <TabPane tab={<span><DislikeOutlined />吐槽区</span>} key="4" >
                                <UnlikediscussesInfo unlikediscusses={unlikediscusses}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={<span><ShoppingOutlined />商品</span>} key="2">
                        <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><AppstoreOutlined />商品</span>} key="1" >
                                <McommoditiesInfo mcommodities={mcommodities}/>
                            </TabPane>
                            <TabPane tab={<span><UserSwitchOutlined />二手</span>} key="2" >
                                <SecondhandInfo secondhands={secondhands}/>
                            </TabPane>
                            <TabPane tab={<span><TeamOutlined />团购</span>} key="3" >
                                <GroupbuyInfo groupbuys={groupbuys}/>
                            </TabPane>
                            <TabPane tab={<span><TeamOutlined />商铺商品</span>} key="4" >
                                <CinformationsInfo cinformations={cinformations}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={<span><ShopOutlined />商铺</span>} key="3">
                        <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><SmileOutlined />所创商铺</span>} key="1" >
                                <MystoreInfo stores={stores}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={<span><StarOutlined />收藏</span>} key="4">
                        <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><AppstoreOutlined />商品</span>} key="1" >
                                <CollectInfo collects={collects}/>
                            </TabPane>
                            <TabPane tab={<span><UserSwitchOutlined />二手</span>} key="2" >
                                <CollectInfo2 collects2={collects2}/>
                            </TabPane>
                            <TabPane tab={<span><TeamOutlined />团购</span>} key="3" >
                                <CollectInfo3 collects3={collects3}/>
                            </TabPane>
                            <TabPane tab={<span><TeamOutlined />商铺商品</span>} key="4" >
                                <CollectInfo4 collects4={collects4}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab={<span><HeartOutlined />点赞</span>} key="5">
                    <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><CoffeeOutlined />闲聊区</span>} key="1" >
                                <LikeInfo1 likesd={likesd}/>
                            </TabPane>
                            <TabPane tab={<span><SoundOutlined />求助区</span>} key="2" >
                                <LikeInfo2 likesh={likesh}/>
                            </TabPane>
                            <TabPane tab={<span><LikeOutlined />种草区</span>} key="3" >
                                <LikeInfo3 likesl={likesl}/>
                            </TabPane>
                            <TabPane tab={<span><DislikeOutlined />吐槽区</span>} key="4" >
                                <LikeInfo4 likesu={likesu}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    {/* <TabPane tab={<span><HeartOutlined />私聊信息</span>} key="6">
                        <Tabs defaultActiveKey="1" centered tabPosition="left">
                            <TabPane tab={<span><CoffeeOutlined />私聊</span>} key="1" >
                                <Pletter/>
                            </TabPane>
                        </Tabs>
                    </TabPane> */}
                </Tabs> 
        </div>
    )
}

export default UserInfo

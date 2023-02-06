import React,{useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {HOST,PORT} from '../../config'

const Row = (props)=>{
    const {store} = props
    return(
        <tr>
            <td>
                <img
                    width={64}
                    height={64}
                    className="mr-3 img-thumbnail rounded-circle "
                    src={store.avatar ? `/upload/${store.avatar}` : '/img/avatar.jpg'}
                />
            </td>
            <td>
                <Link to={`/profilestoreinfoclick/${store._id}`}>
                    {store.storename}
                </Link>
            </td>
            <Link to={`/profileclick/${store.author._id}`}>
                <td>{store.author.username}</td>
            </Link>
            <td>{new Date(store.posttime).toLocaleString()}</td>
        </tr>
    )
}

const StoreList = (props)=>{
    const {loadStores,stores} = props
    useEffect(()=>{
        loadStores()
    },[])

    const rows = stores.map((store,idx)=>{
        return(
            <Row key={idx} store={store}/>
        )
    })


    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>商铺头像</th>
                    <th>商铺名</th>
                    <th>作者</th>
                    <th>发布时间</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}

export default StoreList
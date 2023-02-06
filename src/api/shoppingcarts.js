// import mongoose from 'mongoose'
// import Shoppingcart from '../model/Shoppingcart'
// import Commodity from '../model/Commodity'
// import User from '../model/User'

// const shoppingcartAPIs = (app)=>{
//     //将商品加入购物车
//     app.patch('/api/shoppingcarts/putin/:cid',async (req,res)=>{
//         try {
//             const {cid} = req.params
//             if(!cid){
//                 return res.status(400).json({
//                     message:"没有获取到商品的id"
//                 })  
//             }
//             const {username,token} = req.body
//             if(!username){
//                 return res.status(400).json({
//                     message:"没有获取到用户名"
//                 })
//             }
//             if(!token){
//                 return res.status(400).json({
//                     message:"没有获取到token"
//                 })
//             }
//             const user = await User.findOne({
//                 username:username,
//                 token:token
//             })
//             if(!user){
//                 return res.status(400).json({
//                     message:"token已过期，请重新登陆"
//                 })
//             }

//             const commodity = await Commodity.findById(cid)//用findById可以直接通过ID来寻找目标是否存在
//             if(!commodity){
//                 return res.status(400).json({
//                     message:"该商品不存在"
//                 })
//             }

//             if(String(user._id)===String(commodity.author)){
//                 return res.status(400).json({
//                     message:"你是该商品的发布者无法购买该商品"
//                 })
//             }

//             const shoppingcart = await Shoppingcart.find({num:num})
//             // if(shoppingcart){
//             //     return res.status(400).json({
//             //         message:"该商品您已经加入过购物车了"
//             //     })
//             // }
            
//             if(shoppingcart.commodities.includes(commodity._id)){
//                 return res.status(400).json({
//                     message:"该商品已加入过购物车"
//                 })
//             }
//             shoppingcart.commodities.push(commodity)
//             await shoppingcart.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
//             return res.json({
//                 message:"成功加入购物车"
//             })
//         } catch (e) {
//             return res.status(400).json({   
//                 message:e.message
//             })
//         }
//     }),

//     //将商品移出购物车
//     app.patch('/api/shoppingcarts/takeout/:cid',async (req,res)=>{
//         try {
//             const {cid} = req.params
//             if(!cid){
//                 return res.status(400).json({
//                     message:"没有获取到商品的id"
//                 })  
//             }
//             const {username,token} = req.body
//             if(!username){
//                 return res.status(400).json({
//                     message:"没有获取到用户名"
//                 })
//             }
//             if(!token){
//                 return res.status(400).json({
//                     message:"没有获取到token"
//                 })
//             }
//             const user = await User.findOne({
//                 username:username,
//                 token:token
//             })
//             if(!user){
//                 return res.status(400).json({
//                     message:"token已过期，请重新登陆"
//                 })
//             }
//             const commodity = await Commodity.findById(cid)//用findById可以直接通过ID来寻找目标是否存在
//             if(!commodity){
//                 return res.status(400).json({
//                     message:"该商品不存在"
//                 })
//             }
//             const shoppingcart = new Shoppingcart()
//             if(!shoppingcart.commodities.includes(commodity._id)){
//                 return res.status(400).json({
//                     message:"您的购物车未加入过该商品"
//                 })
//             }
//             shoppingcart.commodities.pull(commodity)
//             await shoppingcart.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
//             return res.json({
//                 message:"成功移出购物车"
//             })
//         } catch (e) {
//             return res.status(400).json({   
//                 message:e.message
//             })
//         }
//     }),
//     //获取购物车列表
//     app.get('/api/shoppingcarts',async (req,res)=>{
//         try {
//             const shoppingcart = await Shoppingcart.find()
//             return res.json({
//                 data:shoppingcart
//             })
//         } catch (e) {
//             return res.status(400).json({   
//                 message:e.message
//             })
//         }
//     })
//     //获取订单详情
//     // app.get('/api/shoppingcart/:id',async (req,res)=>{
//     //     try {
//     //         const {oid} = req.params
//     //         if(!oid){
//     //             return res.status(400).json({
//     //                 message:"没有输入订单的ID"
//     //             })  
//     //         }
//     //         const {username,token} = req.body
//     //         if(!username){
//     //             return res.status(400).json({
//     //                 message:"没有获取到用户名"
//     //             })
//     //         }
//     //         if(!token){
//     //             return res.status(400).json({
//     //                 message:"没有获取到token"
//     //             })
//     //         }
//     //         const user = await User.findOne({
//     //             username:username,
//     //             token:token
//     //         })
//     //         if(!user){
//     //             return res.status(400).json({
//     //                 message:"token已过期，请重新登陆"
//     //             })
//     //         }
//     //         const order = await Order.findById(oid)
//     //         if(!order){
//     //             return res.status(400).json({
//     //                 message:"该订单不存在"
//     //             })
//     //         }
//     //         return res.json({
//     //             data:order
//     //         })  
//     //     } catch (e) {
//     //         return res.status(400).json({   
//     //             message:e.message
//     //         })
//     //     }
//     // })

// }
// export default shoppingcartAPIs
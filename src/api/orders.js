import mongoose from 'mongoose'
import Order from '../model/Order'
import Commodity from '../model/Commodity'
import User from '../model/User'

const orderAPIs = (app)=>{
    //新增订单
    app.post('/api/orders/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品的ID"
                })  
            }
            const {username,token,information,choice} = req.body
            if(!username){
                return res.status(400).json({
                    message:"没有获取到用户名"
                })
            }
            if(!token){
                return res.status(400).json({
                    message:"没有获取到token"
                })
            }
            if(!information){
                return res.status(400).json({
                    message:"没有输入买家信息"
                })
            }
            if(!choice){
                return res.status(400).json({
                    message:"没有输入选择区内容"
                })
            }
            const user = await User.findOne({
                username:username,
                token:token
            })
            if(!user){
                return res.status(400).json({
                    message:"token已过期，请重新登陆"
                })
            }
            const commodity = await Commodity.findById(cid)//用findById可以直接通过ID来寻找目标是否存在
            if(!commodity){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            if(String(user._id)===String(commodity.author)){
                return res.status(400).json({
                    message:"你是该商品的发布者无法购买商品"
                })
            }
            const newOrder = {//对象数据类型
                information:information,
                choice:choice,
                target:cid
            }
            const order = new Order(newOrder)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await order.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.bcommodities.push(order)
            await user.save()
            return res.json({
                message:"新增订单成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),
    //获取订单列表
    app.get('/api/orders',async (req,res)=>{
        try {
            const orders = await Order.find()
            return res.json({
                data:orders
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),
    //获取订单详情
    app.get('/api/orders/:oid',async (req,res)=>{
        try {
            const {oid} = req.params
            if(!oid){
                return res.status(400).json({
                    message:"没有输入订单的ID"
                })  
            }
            const {username,token} = req.body
            if(!username){
                return res.status(400).json({
                    message:"没有获取到用户名"
                })
            }
            if(!token){
                return res.status(400).json({
                    message:"没有获取到token"
                })
            }
            const user = await User.findOne({
                username:username,
                token:token
            })
            if(!user){
                return res.status(400).json({
                    message:"token已过期，请重新登陆"
                })
            }
            const order = await Order.findById(oid)
            if(!order){
                return res.status(400).json({
                    message:"该订单不存在"
                })
            }
            return res.json({
                data:order
            })  
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    })
}
export default orderAPIs
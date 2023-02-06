import mongoose from 'mongoose'
import User from '../model/User'
import Storecommodity from '../model/Storecommodity'
import Commentstore from '../model/Commentstore'
import Store from '../model/Store'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const storecommodityAPIs = (app)=>{

    //发布商品
    app.post('/api/storecommodities',upload.array('pictures'),async (req,res)=>{
        try {
            const {username,token,storename,s_token,category,price,title,content,filelist} = req.body
            console.log("这个是商品接口里的fileList:",filelist)
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
            if(!storename){
                return res.status(400).json({
                    message:"没有获取到商铺名"
                })
            }
            if(!s_token){
                return res.status(400).json({
                    message:"没有获取到s_token"
                })
            }
            if(!category){
                return res.status(400).json({
                    message:"没有输入商品类型"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入商品价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入商品标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入商品内容"
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
            const store = await Store.findOne({
                storename:storename,
                s_token:s_token
            })
            if(!store){
                return res.status(400).json({
                    message:"s_token已过期，请重新登陆"
                })
            }
            const fl = filelist.flat(Infinity);
            console.log(fl)
           
            const newCommodity = {//对象数据类型
                category:category,
                price:price,
                title:title,
                content:content,
                author:store //同时记录上发布商品的作者
            }
            const commodity = new Storecommodity(newCommodity)//声明一个新的模型
            commodity.pictures = fl
            await commodity.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            store.storecommodities.push(commodity)
            await store.save()
            user.cinformations.push(commodity)
            await user.save()
            return res.json({
                message:"新增商铺商品成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
        
    }),

    //获取商铺商品列表
    app.get('/api/storecommodities',async (req,res)=>{
        try {
            const commodities = await Storecommodity.find()
            .populate('author','storename avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:commodities
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //获取特定的商品内容
    app.get('/api/storecommodities/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品的ID"
                })
            }
            const commodity = await Storecommodity.findById(cid)
            .populate('author','storename avatar description')
            if(!commodity){
                return res.status(400).json({
                    message:"该商铺商品不存在"
                })
            }
            const comments = await Commentstore.find({target:cid})
            .populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            .populate('dianzans_storecommodity')
            return res.json({
                data:{
                    commodity:commodity,
                    comments:comments
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //修改商品内容
    app.patch('/api/storecommodities/:cid',upload.array('pictures',9),async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品ID"
                })
            }
            const {username,token,storename,s_token,category,price,title,content} = req.body
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
            if(!storename){
                return res.status(400).json({
                    message:"没有获取到商铺名"
                })
            }
            if(!s_token){
                return res.status(400).json({
                    message:"没有获取到s_token"
                })
            }
            if(!category){
                return res.status(400).json({
                    message:"没有输入商品类型"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入商品价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入商品标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入商品内容"
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
            const store = await Store.findOne({
                storename:storename,
                s_token:s_token
            })
            if(!store){
                return res.status(400).json({
                    message:"s_token已过期，请重新登陆"
                })
            }
            const commodity = await Storecommodity.findById(cid)
            if(!cid){
                return res.status(400).json({
                    message:"该商铺商品不存在"
                })
            }
            if(String(store._id)!==String(commodity.author)){
                return res.status(400).json({
                    message:"你不是发布该商品的用户"
                })
            }
            commodity.category = category
            commodity.price = price
            commodity.title = title
            commodity.content = content
            await commodity.save()
            return res.json({
                message:"修改商品内容成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //删除商品
    app.delete('/api/storecommodities/:cid',async (req,res)=>{
        try {
           const {cid} = req.params
           if(!cid){
               return res.status(400).json({
                   message:"没有输入商品ID"
               })
           }
           const{username,token,storename,s_token} = req.body
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
            if(!storename){
                return res.status(400).json({
                    message:"没有获取到商铺名"
                })
            }
            if(!s_token){
                return res.status(400).json({
                    message:"没有获取到s_token"
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
            const store = await Store.findOne({
                storename:storename,
                s_token:s_token
            })
            if(!store){
                return res.status(400).json({
                    message:"s_token已过期，请重新登陆"
                })
            }
            const commodity = await Storecommodity.findById(cid)
            if(!cid){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            if(String(store._id)!==String(commodity.author)){
                return res.status(400).json({
                    message:"你不是发布该商铺商品的用户"
                })
            }
            store.storecommodities.pull(commodity)
            await store.save()
            user.cinformations.pull(commodity)
            await user.save()
            await commodity.remove() //移除
            return res.json({
                message:"成功删除商品"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
    
}

export default storecommodityAPIs
import mongoose from 'mongoose'
import User from '../model/User'
import Commodity from '../model/Commodity'
import Comment2 from '../model/Comment2'
import File from '../model/File'
import Store from '../model/Store'
import images from 'images'
import fs from 'fs'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const commodityAPIs = (app)=>{


     // 上传文件图片
     app.post("/api/upload",upload.array('pictures'),(req,res)=>{
        try {  
        console.log("这个是upload接口里的req.files:",req.files)
        // req.files.forEach(async f=>{
        //     const path = `${f.destination}/${f.filename}`
        //     const newPath = `${f.destination}/tmp/${f.filename}`
        //     console.log("这个是path:",path)
        //     await images(path).size(48,48).save(newPath);
        // })      
        const filelist = req.files.map(f=>f.filename)
        return res.json({
            message:"上传文件成功",
            data:filelist,

        })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })

    //发布商品
    app.post('/api/commodities',upload.array('pictures'),async (req,res)=>{
        try {
            const {username,token,category,price,title,content,filelist} = req.body
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
            const fl = filelist.flat(Infinity);
            console.log(fl)
           
            const newCommodity = {//对象数据类型
                category:category,
                price:price,
                title:title,
                content:content,
                author:user //同时记录上发布商品的作者
            }
            const commodity = new Commodity(newCommodity)//声明一个新的模型
            commodity.pictures = fl
            await commodity.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.mcommodities.push(commodity)
            await user.save()
            return res.json({
                message:"新增商品成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
        
    }),

    //获取商品列表
    app.get('/api/commodities',async (req,res)=>{
        try {
            const commodities = await Commodity.find()
            .populate('author','username stores nickname')//不止找一个所有不用findone,并且用populate返回用户一些信息
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
    app.get('/api/commodities/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品的ID"
                })
            }
            const commodity = await Commodity.findById(cid)
            .populate('author','username avatar description nickname')
            .populate('dianzans_commodity')
            if(!commodity){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            const comments = await Comment2.find({target:cid}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{
                    commodity,
                    comments
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //修改商品内容
    app.patch('/api/commodities/:cid',upload.array('pictures',9),async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品ID"
                })
            }
            const {username,token,category,price,title,content} = req.body
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
            
            const commodity = await Commodity.findById(cid)
            if(!cid){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            if(String(user._id)!==String(commodity.author)){
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
    app.delete('/api/commodities/:cid',async (req,res)=>{
        try {
           const {cid} = req.params
           if(!cid){
               return res.status(400).json({
                   message:"没有输入商品ID"
               })
           }
           const{username,token} = req.body
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
            const commodity = await Commodity.findById(cid)
            if(!cid){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            if(String(user._id)!==String(commodity.author)){
                return res.status(400).json({
                    message:"你不是发布该商品的用户"
                })
            }
            // await Discuss.deleteMany({
            //     target:mongoose.Types.ObjectId(cid)
            // })

            user.mcommodities.pull(commodity)
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

export default commodityAPIs
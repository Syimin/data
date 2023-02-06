import mongoose from 'mongoose'
import User from '../model/User'
import Secondhand from '../model/Secondhand'
import Comment4 from '../model/Comment4'
import File from '../model/File'
import Store from '../model/Store'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const secondhandAPIs = (app)=>{
    
    //发布二手
    app.post('/api/secondhands',upload.array('pictures'),async (req,res)=>{//upload.array('pictures',9)
        try {
            const {username,token,category,price,title,content,number,filelist} = req.body
            console.log("这个是二手接口里的fileList:",filelist)
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
                    message:"没有输入二手类型"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入二手价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入二手标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入二手内容"
                })
            }
            if(!number){
                return res.status(400).json({
                    message:"没有输入几成新"
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

            const newSecondhand = {//对象数据类型
                category:category,
                price:price,
                title:title,
                content:content,
                number:number,
                author:user //同时记录上发布二手的作者
            }
            const secondhand = new Secondhand(newSecondhand)//声明一个新的模型
            secondhand.pictures = fl
            await secondhand.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.secondhands.push(secondhand)
            await user.save()
            return res.json({
                message:"发起二手成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
        
    }),

    //发布商铺里的二手
    app.post('/api/secondhands/:sid',upload.array('pictures',9),async (req,res)=>{//upload.array('picture',5)
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入商铺ID"
                })
            }
            const {username,token,storename,s_token,category,price,title,content,number} = req.body
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
                    message:"没有输入二手类型"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入二手价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入二手标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入二手内容"
                })
            }
            if(!number){
                return res.status(400).json({
                    message:"没有输入几成新"
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
            const newSecondhand = {//对象数据类型
                category:category,
                price:price,
                title:title,
                content:content,
                number:number,
                author:user,//同时记录上发布二手的作者
                target:sid
            }
            const secondhand = new Secondhand(newSecondhand)//声明一个新的模型
            if(req.files){
                req.files.forEach(async (item,index)=>{
                    // console.log(item);
                    const file = new File({
                        filename:item.filename,
                        mimetype:item.mimetype,
                        size:item.size,
                        author:user
                        })
                    
                    secondhand.pictures.push(file)
                    await file.save()
                })
            }
            await secondhand.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.secondhands.push(secondhand)//存进user的发布二手模型里
            await user.save()
            store.cinformations.push(secondhand)//存进store的二手信息模型里
            await store.save()
            return res.json({
                message:"商铺发起二手成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //获取二手列表
    app.get('/api/secondhands',async (req,res)=>{
        try {
            const secondhands = await Secondhand.find()
            .populate('author','username stores')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:secondhands
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //获取特定的二手内容
    app.get('/api/secondhands/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入二手的ID"
                })
            }
            const secondhand = await Secondhand.findById(sid)
            .populate('author','username avatar description nickname')
            .populate('dianzans_secondhand')
            if(!secondhand){
                return res.status(400).json({
                    message:"该二手不存在"
                })
            }
            const comments = await Comment4.find({target:sid}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{
                    secondhand,
                    comments
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //修改二手内容
    app.patch('/api/secondhands/:sid',upload.array('pictures',9),async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入二手ID"
                })
            }
            const {username,token,category,price,title,content,number} = req.body
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
                    message:"没有输入二手类型"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入二手价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入二手标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入二手内容"
                })
            }
            if(!number){
                return res.status(400).json({
                    message:"没有输入几成新"
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
            const secondhand = await Secondhand.findById(sid)
            if(!sid){
                return res.status(400).json({
                    message:"该二手不存在"
                })
            }
            if(String(user._id)!==String(secondhand.author)){
                return res.status(400).json({
                    message:"你不是发布该二手的用户"
                })
            }
            if(req.files){
                req.files.forEach(async (item,index)=>{
                    // console.log(item);
                    const file = new File({
                        filename:item.filename,
                        mimetype:item.mimetype,
                        size:item.size,
                        author:user
                        })
                    
                    secondhand.pictures.push(file)
                    await file.save()
                })
            }
            secondhand.category = category
            secondhand.price = price
            secondhand.title = title
            secondhand.content = content
            secondhand.number = number
            await secondhand.save()
            return res.json({
                message:"修改二手内容成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //删除二手
    app.delete('/api/secondhands/:sid',async (req,res)=>{
        try {
           const {sid} = req.params
           if(!sid){
               return res.status(400).json({
                   message:"没有输入二手ID"
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
            const secondhand = await Secondhand.findById(sid)
            if(!sid){
                return res.status(400).json({
                    message:"该二手不存在"
                })
            }
            if(String(user._id)!==String(secondhand.author)){
                return res.status(400).json({
                    message:"你不是发布该二手的用户"
                })
            }
            user.secondhands.pull(secondhand)
            await user.save()
            await secondhand.remove() //移除
            return res.json({
                message:"成功删除二手"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除商铺里的二手
    app.delete('/api/stores/:sid',async (req,res)=>{
        try {
           const {sid} = req.params
           if(!sid){
               return res.status(400).json({
                   message:"没有输入二手ID"
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
            const secondhand = await Secondhand.findById(sid)
            if(!sid){
                return res.status(400).json({
                    message:"该二手不存在"
                })
            }
            if(String(user._id)!==String(secondhand.author)){
                return res.status(400).json({
                    message:"你不是发布该二手的商家"
                })
            }
            await Secondhand.deleteMany({
                target:mongoose.Types.ObjectId(sid)
            })
            user.secondhands.pull(secondhand)
            await user.save()
            await secondhand.remove() //移除
            return res.json({
                message:"成功删除商铺二手"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
    
}

export default secondhandAPIs
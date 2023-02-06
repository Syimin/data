import mongoose from 'mongoose'
import User from '../model/User'
import Unlikecomment from '../model/Unlikecomment'
import Unlikediscuss from '../model/Unlikediscuss'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const unlikedisAPIs = (app)=>{

    //发表踩雷区帖子
    app.post('/api/unlikediscusses',upload.array('pictures'),async (req,res)=>{
        try {
            const {username,token,title,content,filelist} = req.body
            console.log("这个是踩雷帖子接口里的fileList:",filelist)
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
            if(!title){
                return res.status(400).json({
                    message:"没有输入讨论标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入讨论内容"
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

            const newDiscuss = {//对象数据类型
                title:title,
                content:content,
                author:user //同时记录上讨论的作者
            }
            const unlikediscuss = new Unlikediscuss(newDiscuss)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            unlikediscuss.pictures = fl
            await unlikediscuss.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.unlikediscusses.push(unlikediscuss)
            await user.save()
            return res.json({
                message:"新增踩雷帖子成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //发布回复信息(回复求助区帖子)
    app.post('/api/unlikecomments/:uid',async (req,res)=>{//did表示回复的具体目标ID
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入帖子的ID"
                })  
            }
            const {username,token,content} = req.body
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
            if(!content){
                return res.status(400).json({
                    message:"没有输入回复内容"
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
            const unlikediscuss = await Unlikediscuss.findById(uid)//用findById可以直接通过ID来寻找目标是否存在
            if(!unlikediscuss){
                return res.status(400).json({
                    message:"该踩雷帖子不存在"
                })
            }
            const newComment = {
                content:content,
                author:user,//同时添加上用户的名称
                target:uid//确定回复的对象
            }
            const unlikecomment = new Unlikecomment(newComment)//表示用mongoose新弄一个模型，用new表示事例化
            await unlikecomment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            unlikediscuss.comments.push(unlikecomment)
            await unlikediscuss.save()
            return res.json({
                message:"新增回复成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //获取求助区讨论列表
    app.get('/api/unlikediscusses',async (req,res)=>{
        try {
            const unlikediscusses = await Unlikediscuss.find().populate('author','username avatar nickname')//不止找一个所有不用findone,并且用populate返回用户一些信息
            return res.json({
                data:unlikediscusses
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //获取特定求助讨论内容
    app.get('/api/unlikediscusses/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入讨论的ID"
                })  
            }
            const unlikediscuss = await Unlikediscuss.findById(uid)
            .populate('author','username avatar description nickname')//用findById可以直接通过ID来寻找目标是否存在
            .populate('dianzans_unlikediscuss')
            if(!unlikediscuss){
                return res.status(400).json({
                    message:"该踩雷讨论不存在"
                })
            }

            //获取所有target为did的回复
            const unlikecomments = await Unlikecomment.find({target:uid}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{//要获取讨论和回复的内容，不是单个所有再加一个{}表对象
                    unlikediscuss:unlikediscuss,
                    unlikecomments:unlikecomments
                }
            })  
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    
    
    //修改讨论信息
    app.patch('/api/unlikediscusses/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入讨论的ID"
                })  
            }
            const {username,token,title,content} = req.body
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
            if(!title){
                return res.status(400).json({
                    message:"没有输入讨论标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入讨论内容"
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
            const unlikediscuss = await Unlikediscuss.findById(uid)
            if(!unlikediscuss){
                return res.status(400).json({
                    message:"该踩雷讨论不存在"
                })
            }
            if(String(user._id)!==String(unlikediscuss.author)){
                return res.status(400).json({
                    message:"你不是该踩雷讨论的作者"
                })
            }
            unlikediscuss.title = title
            unlikediscuss.content = content
            await unlikediscuss.save()
            return res.json({
                message:"修改踩雷讨论内容成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //删除讨论内容
    app.delete('/api/unlikediscusses/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入讨论的ID"
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
            const unlikediscuss = await Unlikediscuss.findById(uid)
            if(!unlikediscuss){
                return res.status(400).json({
                    message:"该踩雷讨论不存在"
                })
            }
            if(String(user._id)!==String(unlikediscuss.author)){
                return res.status(400).json({
                    message:"你不是该讨论的作者"
                })
            }
            await Unlikecomment.deleteMany({
                target:mongoose.Types.ObjectId(uid)
            })
            user.unlikediscusses.pull(unlikediscuss)
            await user.save()
            await unlikediscuss.remove() //移除
            return res.json({
                message:"成功删除求助讨论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除回复内容
    app.delete('/api/unlikecomments/:uid',async (req,res)=>{
        try {
            const{uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入回复的ID"
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
            const unlikecomment = await Unlikecomment.findById(uid)
            if(!unlikecomment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(unlikecomment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await unlikecomment.remove() //移除
            return res.json({
                message:"成功删除回复"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
    
}

export default unlikedisAPIs
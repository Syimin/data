import mongoose from 'mongoose'
import User from '../model/User'
import Discuss from '../model/Discuss'
import Comment from '../model/Comment'
import Comment2 from '../model/Comment2'
import Comment3 from '../model/Comment3'
import Comment4 from '../model/Comment4'
import Commentstore from '../model/Commentstore'
import Groupbuy from '../model/Groupbuy'
import Secondhand from '../model/Secondhand'
import Commodity from '../model/Commodity'
import Storecommodity from '../model/Storecommodity'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const discussAPIs = (app)=>{
    //发表闲聊区帖子
    app.post('/api/discusses',upload.array('pictures'),async (req,res)=>{
        try {
            const {username,token,title,content,filelist} = req.body
            console.log("这个是闲聊帖子接口里的fileList:",filelist)
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
            const discuss = new Discuss(newDiscuss)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            discuss.pictures = fl
            await discuss.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.discusses.push(discuss)
            await user.save()
            return res.json({
                message:"新增帖子成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),


    //发布回复信息(回复闲聊区帖子)
    app.post('/api/comments/:did',async (req,res)=>{//did表示回复的具体目标ID
        try {
            const {did} = req.params
            if(!did){
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
            const discuss = await Discuss.findById(did)//用findById可以直接通过ID来寻找目标是否存在
            if(!discuss){
                return res.status(400).json({
                    message:"该帖子不存在"
                })
            }
            const newComment = {
                content:content,
                author:user,//同时添加上用户的名称
                target:did//确定回复的对象
            }
            const comment = new Comment(newComment)//表示用mongoose新弄一个模型，用new表示事例化
            await comment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            discuss.comments.push(comment)
            await discuss.save()
            return res.json({
                message:"新增回复成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    

    //针对商品发表评论
    app.post('/api/comments2/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有输入商品的ID"
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
            const commodity = await Commodity.findById(cid)//用findById可以直接通过ID来寻找目标是否存在
            if(!commodity){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            
            const newComment = {//对象数据类型
                content:content,
                target:cid,
                author:user //同时记录上讨论的作者
            }
            const comment = new Comment2(newComment)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await comment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            // user.discusses.push(discuss)
            // await user.save()
            commodity.comments.push(comment)
            await commodity.save()
            return res.json({
                message:"新增评论成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //针对团购发表评论
    app.post('/api/comments3/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有输入团购的ID"
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
            const groupbuy = await Groupbuy.findById(gid)//用findById可以直接通过ID来寻找目标是否存在
            if(!groupbuy){
                return res.status(400).json({
                    message:"该团购不存在"
                })
            }
            const newComment = {//对象数据类型
                content:content,
                target:gid,
                author:user //同时记录上讨论的作者
            }
            const comment = new Comment3(newComment)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await comment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            // user.discusses.push(discuss)
            // await user.save()
            groupbuy.comments.push(comment)
            await groupbuy.save()
            return res.json({
                message:"新增评论成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //针对二手发表讨论
    app.post('/api/comments4/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入二手的ID"
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
            const secondhand = await Secondhand.findById(sid)//用findById可以直接通过ID来寻找目标是否存在
            if(!secondhand){
                return res.status(400).json({
                    message:"该二手不存在"
                })
            }
            const newComment = {//对象数据类型
                content:content,
                target:sid,
                author:user //同时记录上讨论的作者
            }
            const comment = new Comment4(newComment)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await comment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            // user.discusses.push(discuss)
            // await user.save()
            secondhand.comments.push(comment)
            await secondhand.save()
            return res.json({
                message:"新增评论成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //针对商铺商品发表讨论
    app.post('/api/commentstore/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入商铺的ID"
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
            const storecommodity = await Storecommodity.findById(sid)//用findById可以直接通过ID来寻找目标是否存在
            if(!storecommodity){
                return res.status(400).json({
                    message:"该商铺商品不存在"
                })
            }
            const newComment = {//对象数据类型
                content:content,
                target:sid,
                author:user //同时记录上讨论的作者
            }
            const comment = new Commentstore(newComment)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await comment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            storecommodity.comments.push(comment)
            await storecommodity.save()
            return res.json({
                message:"新增商铺商品评论成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //获取闲聊区讨论列表
    app.get('/api/discusses',async (req,res)=>{
        try {
            const discusses = await Discuss.find()
            .populate('author','username avatar nickname')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:discusses
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //获取特定讨论内容
    app.get('/api/discusses/:did',async (req,res)=>{
        try {
            const {did} = req.params
            if(!did){
                return res.status(400).json({
                    message:"没有输入讨论的ID"
                })  
            }
            const discuss = await Discuss.findById(did).populate('author','username avatar description nickname')//用findById可以直接通过ID来寻找目标是否存在
            .populate('dianzans_discuss')
            if(!discuss){
                return res.status(400).json({
                    message:"该讨论不存在"
                })
            }

            //获取所有target为did的回复
            const comments = await Comment.find({target:did}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{//要获取讨论和回复的内容，不是单个所有再加一个{}表对象
                    discuss:discuss,
                    comments:comments
                }
            })  
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    
    
    //修改讨论信息
    app.patch('/api/discusses/:did',async (req,res)=>{
        try {
            const {did} = req.params
            if(!did){
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
            const discuss = await Discuss.findById(did)
            if(!discuss){
                return res.status(400).json({
                    message:"该讨论不存在"
                })
            }
            if(String(user._id)!==String(discuss.author)){
                return res.status(400).json({
                    message:"你不是该讨论的作者"
                })
            }
            discuss.title = title
            discuss.content = content
            await discuss.save()
            return res.json({
                message:"修改讨论内容成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //删除讨论内容
    app.delete('/api/discusses/:did',async (req,res)=>{
        try {
            const {did} = req.params
            if(!did){
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
            const discuss = await Discuss.findById(did)
            if(!discuss){
                return res.status(400).json({
                    message:"该讨论不存在"
                })
            }
            if(String(user._id)!==String(discuss.author)){
                return res.status(400).json({
                    message:"你不是该讨论的作者"
                })
            }
            await Comment.deleteMany({
                target:mongoose.Types.ObjectId(did)
            })
            user.discusses.pull(discuss)
            await user.save()
            await discuss.remove() //移除
            return res.json({
                message:"成功删除讨论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除回复内容
    app.delete('/api/comments/:cid',async (req,res)=>{
        try {
            const{cid} = req.params
            if(!cid){
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
            const comment = await Comment.findById(cid)
            if(!comment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(comment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await comment.remove() //移除
            return res.json({
                message:"成功删除回复"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除针对商品的回复内容
    app.delete('/api/comments2/:cid',async (req,res)=>{
        try {
            const{cid} = req.params
            if(!cid){
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
            const comment = await Comment2.findById(cid)
            if(!comment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(comment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await comment.remove() //移除
            return res.json({
                message:"成功删除评论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })

     //删除针对商品的回复内容
     app.delete('/api/comments3/:cid',async (req,res)=>{
        try {
            const{cid} = req.params
            if(!cid){
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
            const comment = await Comment3.findById(cid)
            if(!comment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(comment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await comment.remove() //移除
            return res.json({
                message:"成功删除评论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除针对商品的回复内容
    app.delete('/api/comments4/:cid',async (req,res)=>{
        try {
            const{cid} = req.params
            if(!cid){
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
            const comment = await Comment4.findById(cid)
            if(!comment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(comment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await comment.remove() //移除
            return res.json({
                message:"成功删除评论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除针对商品的回复内容
    app.delete('/api/commentstore/:cid',async (req,res)=>{
        try {
            const{cid} = req.params
            if(!cid){
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
            const comment = await Commentstore.findById(cid)
            if(!comment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(comment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await comment.remove() //移除
            return res.json({
                message:"成功删除评论"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })

}

export default discussAPIs
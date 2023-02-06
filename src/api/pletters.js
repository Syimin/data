import mongoose from 'mongoose'
import User from '../model/User'
import Pcomment from '../model/Pcomment'
import Pletter from '../model/Pletter'

const plettersAPIs = (app)=>{

    //私聊用户
    app.post('/api/pletters/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入用户的ID"
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
            const target_user = await User.findById(uid)
            if(!target_user){
                return res.status(400).json({
                    message:"私聊用户不存在"
                })
            }
            if(String(target_user._id)===String(user._id)){
                return res.status(400).json({
                    message:"无法私信自己"
                })
            }
            const newLetter = {//对象数据类型
                content:content,
                author:user, //同时记录上讨论的作者
                target:uid
            }
            const pletter = new Pletter(newLetter)//表示用mongoose新弄一个模型，用new表示事例化(新讨论模型)
            await pletter.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.pletters.push(pletter)
            await user.save()
            target_user.pletters.push(pletter)
            await target_user.save()
            return res.json({
                message:"私聊信息发送成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //私聊回复信息
    app.post('/api/pcomments/:pid',async (req,res)=>{//did表示回复的具体目标ID
        try {
            const {pid} = req.params
            if(!pid){
                return res.status(400).json({
                    message:"没有输入回复私信的ID"
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
            const pletter = await Pletter.findById(pid)//用findById可以直接通过ID来寻找目标是否存在
            if(!pletter){
                return res.status(400).json({
                    message:"该私信回复目标不存在"
                })
            }
            const newComment = {
                content:content,
                author:user,//同时添加上用户的名称
                target:pid//确定回复的对象
            }
            const pcomment = new Pcomment(newComment)//表示用mongoose新弄一个模型，用new表示事例化
            await pcomment.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            pletter.pcomments.push(pcomment)
            await pletter.save()
            return res.json({
                message:"私信回复成功"
            })
        } catch (e) {
            return res.status(400).json({   
                message:e.message
            })
        }
    }),

    //获取私信列表(私信我的)
    app.get('/api/pletters/fromsb/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入用户的ID"
                })  
            }
            const user = await User.findById(uid)
            if(!user){
                return res.status(400).json({
                    message:"该用户不存在"
                })
            }
            const pletters = await Pletter.find({target:uid})
            .populate('author','username avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .populate('target','username avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:pletters
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //获取私信列表(我私信的)
    app.get('/api/pletters/tosb/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有输入用户的ID"
                })  
            }
            const user = await User.findById(uid)
            if(!user){
                return res.status(400).json({
                    message:"该用户不存在"
                })
            }
            const pletters = await Pletter.find({author:uid})
            .populate('author','username avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .populate('target','username avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:pletters
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //获取特定求助讨论内容
    app.get('/api/pletters/:pid',async (req,res)=>{
        try {
            const {pid} = req.params
            if(!pid){
                return res.status(400).json({
                    message:"没有输入讨论的ID"
                })  
            }
            const pletter = await Pletter.findById(pid).populate('author','username avatar description nickname')//用findById可以直接通过ID来寻找目标是否存在
            if(!pletter){
                return res.status(400).json({
                    message:"该私信不存在"
                })
            }

            //获取所有target为uid的回复
            const pcomments = await Pcomment.find({target:pid}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{//要获取讨论和回复的内容，不是单个所有再加一个{}表对象
                    pletter:pletter,
                    pcomments:pcomments
                }
            })  
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除讨论内容
    app.delete('/api/pletters/:pid',async (req,res)=>{
        try {
            const {pid} = req.params
            if(!pid){
                return res.status(400).json({
                    message:"没有输入私聊的ID"
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
            const pletter = await Pletter.findById(pid)
            if(!pletter){
                return res.status(400).json({
                    message:"该私信不存在"
                })
            }
            if(String(user._id)!==String(pletter.author)){
                return res.status(400).json({
                    message:"你不是该私信的作者"
                })
            }
            await Pcomment.deleteMany({
                target:mongoose.Types.ObjectId(pid)
            })
            user.pletters.pull(pletter)
            await user.save()
            await pletter.remove() //移除
            return res.json({
                message:"成功删除私信"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除回复内容
    app.delete('/api/pcomments/:pid',async (req,res)=>{
        try {
            const{pid} = req.params
            if(!pid){
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
            const pcomment = await Pcomment.findById(pid)
            if(!pcomment){
                return res.status(400).json({
                    message:"该回复不存在"
                })
            }
            if(String(user._id)!==String(pcomment.author)){
                return res.status(400).json({
                    message:"你不是该回复的作者"
                })
            }
            await pcomment.remove() //移除
            return res.json({
                message:"撤回成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
    
}

export default plettersAPIs
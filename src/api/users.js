import User from '../model/User'
import Crypto from 'crypto'
import {v4 as uuidv4} from 'uuid'
import multer from 'multer'
import Commodity from '../model/Commodity'
import Groupbuy from '../model/Groupbuy'
import Secondhand from '../model/Secondhand'
import Discuss from '../model/Discuss'
import Helpdiscuss from '../model/Helpdiscuss'
import Likediscuss from '../model/Likediscuss'
import Unlikediscuss from '../model/Unlikediscuss'
import Store from '../model/Store'
import Storecommodity from '../model/Storecommodity'
import { symlink } from 'fs'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const userAPIs = (app)=>{
    //注册接口
    app.post('/api/users',async (req,res)=>{
        try {
            const {username,password,confirmpass} = req.body
            if(!username){
                return res.status(400).json({
                    message:"没有输入用户名"
                })
            }
            if(!password){
                return res.status(400).json({
                    message:"没有输入密码"
                })
            }
            if(!confirmpass){
                return res.status(400).json({
                    message:"没有输入确认密码"
                })
            }
            if(password!==confirmpass){
                return res.status(400).json({
                    message:"密码与确认密码不一致"
                })
            }
            const user = await User.findOne({username:username})
            if(user){
                return res.status(400).json({
                    message:"该用户名已经被占用"
                })
            }
            const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex')
            const newUser = {//用户的对象
                username:username,
                password:passwordCryp
            }
            const newuser = new User(newUser)//表示用mongoose新弄一个模型，用new表示实例化
            await newuser.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            return res.json({
                message:"新增用户成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
            
        }
    })
    //登陆接口
    app.post('/api/users/login',async (req,res)=>{
        try {
            const {username,password} = req.body
            if(!username){
                return res.status(400).json({
                    message:"没有输入用户名"
                })
            }
            if(!password){
                return res.status(400).json({
                    message:"没有输入密码"
                })
            }
            const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex')
            const user = await User.findOne({username:username})
            if(!user){
                return res.status(400).json({
                    message:"该用户不存在"
                })
            }
            if(user.password!==passwordCryp){
                return res.status(400).json({
                    message:"密码错误，请重新输入"
                })
            }
            const tokenstr = uuidv4();//生成标识符
            const token = Crypto.createHash('sha1').update(tokenstr).digest('hex')
            user.token = token
            await user.save()
            return res.json({
                message:"登陆成功",
                data:{//伴随登陆成功同时将用户名和登陆凭证token一并返回给前端
                    _id:user._id,
                    username:user.username,
                    token:user.token,
                    avatar:user.avatar
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
            
        }
    }),
    //验证接口
    app.post('/api/users/auth',async (req,res)=>{
        try {
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
            //将密码和token遮蔽保护用户隐私
            user.password = null
            user.token = null
            return res.json({
                message:"验证成功",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //注销接口
    app.post('/api/users/logout',async (req,res)=>{
        try {
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
            user.token = null//将token清空在user.save一下
            await user.save()
            return res.json({
                message:"成功退出登陆"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //个人中心页壁纸
    app.post('/api/users/wallpaper',async (req,res)=>{
        try {
            const {username,token,filelist} = req.body
            console.log("这个是个人主页壁纸接口里的fileList:",filelist)
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
            const fl = filelist.flat(Infinity);
            console.log(fl)
            user.wallpaper = fl
            await user.save()
            return res.json({
                message:"上传壁纸成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //修改用户信息接口
    app.patch('/api/users',upload.single('avatar'),async (req,res)=>{
        try {
            const {username,token,nickname,description} = req.body
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
            // if(String(user._id)!==String(user.author)){
            //     return res.status(400).json({
            //         message:"您没有权限修改他人的信息"
            //     })
            // }
            if(req.file){//判断用户是否传了文件
                user.avatar = req.file.filename//如果传了文件就把用户头像改为上传的文件
            }
            user.nickname = nickname//个人昵称
            user.description = description//个人描述
            // user.username = username
            await user.save()
            return res.json({
                message:"修改用户资料成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //用户关注
    app.patch('/api/users/followers/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有获取到用户id"
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
            const follower = await User.findById(uid)
            if(!follower){
                return res.status(400).json({
                    message:"待关注用户不存在"
                })
            }
            if(String(follower._id)===String(user._id)){
                return res.status(400).json({
                    message:"不能关注自己"
                })
            }
            if(user.followers.includes(follower._id)&&follower.fans.includes(user._id)){
                return res.status(400).json({
                    message:"你已经关注过该用户"
                })
            }
            user.followers.push(follower)
            follower.fans.push(user)
            await user.save()
            await follower.save()
            return res.json({
                message:"成功关注用户",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户取关
    app.patch('/api/users/unfollowers/:uid',async (req,res)=>{
        try {
            const {uid} = req.params
            if(!uid){
                return res.status(400).json({
                    message:"没有获取到用户id"
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
            const follower = await User.findById(uid)
            if(!follower){
                return res.status(400).json({
                    message:"该关注用户不存在"
                })
            }
            if(!user.followers.includes(follower._id)&&!follower.fans.includes(user._id)){
                return res.status(400).json({
                    message:"你没关注过该用户"
                })
            }
            user.followers.pull(follower)
            follower.fans.pull(user)
            await user.save()
            await follower.save()
            return res.json({
                message:"成功取关该用户",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),



    //商铺关注
    app.patch('/api/users/followers2/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到商铺id"
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
            const follower2 = await Store.findById(sid)
            if(!follower2){
                return res.status(400).json({
                    message:"待关注商铺不存在"
                })
            }
            if(String(follower2.author._id)===String(user._id)){
                return res.status(400).json({
                    message:"不能关注自己商铺"
                })
            }
            if(user.followers2.includes(follower2._id)){
                return res.status(400).json({
                    message:"你已经关注过该商铺"
                })
            }
            user.followers2.push(follower2)

            await user.save()
            return res.json({
                message:"成功关注商铺",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //商铺取关
    app.patch('/api/users/unfollowers2/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到商铺id"
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
            const follower2 = await Store.findById(sid)
            if(!follower2){
                return res.status(400).json({
                    message:"该关注商铺不存在"
                })
            }
            if(!user.followers2.includes(follower2._id)){
                return res.status(400).json({
                    message:"你没关注过该商铺"
                })
            }
            user.followers2.pull(follower2)
            await user.save()
            return res.json({
                message:"成功取关该商铺",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //用户收藏商品
    app.patch('/api/users/collects/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有获取到商品id"
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
            const commodity = await Commodity.findById(cid)
            if(!commodity){
                return res.status(400).json({
                    message:"待收藏商品不存在"
                })
            }
            if(String(user._id)===String(commodity.author)){
                return res.status(400).json({
                    message:"不能收藏自己的商品"
                })
            }
            if(user.collects.includes(commodity._id)&&commodity.dianzans_commodity.includes(user._id)){
                return res.status(400).json({
                    message:"你已经收藏过该商品"
                })
            }
            user.collects.push(commodity)
            await user.save()
            commodity.dianzans_commodity.push(user)
            await commodity.save()
            return res.json({
                message:"成功收藏商品",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户取消商品收藏
    app.patch('/api/users/uncollects/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有获取到商品id"
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
            const commodity = await Commodity.findById(cid)
            if(!commodity){
                return res.status(400).json({
                    message:"该收藏商品不存在"
                })
            }
            if(!user.collects.includes(commodity._id)&&!commodity.dianzans_commodity.includes(user._id)){
                return res.status(400).json({
                    message:"你没收藏过该商品"
                })
            }
            user.collects.pull(commodity)
            await user.save()
            commodity.dianzans_commodity.pull(user)
            await commodity.save()
            return res.json({
                message:"成功取消商品收藏",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //用户收藏二手商品
    app.patch('/api/users/collects2/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到二手商品id"
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
            const secondhand = await Secondhand.findById(sid)
            if(!secondhand){
                return res.status(400).json({
                    message:"待收藏二手商品不存在"
                })
            }
            if(String(user._id)===String(secondhand.author)){
                return res.status(400).json({
                    message:"不能收藏自己的二手商品"
                })
            }
            if(user.collects2.includes(secondhand._id)&&secondhand.dianzans_secondhand.includes(user._id)){
                return res.status(400).json({
                    message:"你已经收藏过该二手商品"
                })
            }
            user.collects2.push(secondhand)
            await user.save()
            secondhand.dianzans_secondhand.push(user)
            await secondhand.save()
            return res.json({
                message:"成功收藏二手商品",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户取消二手商品收藏
    app.patch('/api/users/uncollects2/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到二手商品id"
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
            const secondhand = await Secondhand.findById(sid)
            if(!secondhand){
                return res.status(400).json({
                    message:"该收藏二手商品不存在"
                })
            }
            if(!user.collects2.includes(secondhand._id)&&!secondhand.dianzans_secondhand.includes(user._id)){
                return res.status(400).json({
                    message:"你没收藏过该二手商品"
                })
            }
            user.collects2.pull(secondhand)
            await user.save()
            secondhand.dianzans_secondhand.pull(user)
            await secondhand.save()
            return res.json({
                message:"成功取消二手商品收藏",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //用户收藏团购商品
    app.patch('/api/users/collects3/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有获取到团购商品id"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!groupbuy){
                return res.status(400).json({
                    message:"待收藏团购商品不存在"
                })
            }
            if(String(user._id)===String(groupbuy.author)){
                return res.status(400).json({
                    message:"不能收藏自己的团购商品"
                })
            }
            if(user.collects3.includes(groupbuy._id)&&groupbuy.dianzans_groupbuy.includes(user._id)){
                return res.status(400).json({
                    message:"你已经收藏过该团购商品"
                })
            }
            user.collects3.push(groupbuy)
            await user.save()
            groupbuy.dianzans_groupbuy.push(user)
            await groupbuy.save()
            return res.json({
                message:"成功收藏团购商品",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户取消团购商品收藏
    app.patch('/api/users/uncollects3/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有获取到团购商品id"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!groupbuy){
                return res.status(400).json({
                    message:"该收藏团购商品不存在"
                })
            }
            if(!user.collects3.includes(groupbuy._id)&&!groupbuy.dianzans_groupbuy.includes(user._id)){
                return res.status(400).json({
                    message:"你没收藏过该团购商品"
                })
            }
            user.collects3.pull(groupbuy)
            await user.save()
            groupbuy.dianzans_groupbuy.pull(user)
            await groupbuy.save()
            return res.json({
                message:"成功取消团购商品收藏",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


 //用户收藏商铺商品
 app.patch('/api/users/collects4/:sid',async (req,res)=>{
    try {
        const {sid} = req.params
        if(!sid){
            return res.status(400).json({
                message:"没有获取到商铺商品id"
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
        const storecommodity = await Storecommodity.findById(sid)
        if(!storecommodity){
            return res.status(400).json({
                message:"待收藏商铺商品不存在"
            })
        }
        if(String(user._id)===String(storecommodity.author.author)){
            return res.status(400).json({
                message:"不能收藏自己的商品"
            })
        }
        if(user.collects4.includes(storecommodity._id)&&storecommodity.dianzans_storecommodity.includes(user._id)){
            return res.status(400).json({
                message:"你已经收藏过该商铺商品"
            })
        }
        user.collects4.push(storecommodity)
        await user.save()
        storecommodity.dianzans_storecommodity.push(user)
        await storecommodity.save()
        return res.json({
            message:"成功收藏商铺商品",
            data:user
        })
    } catch (e) {
        return res.status(400).json({
            message:e.message
        })
    }
}),

//用户取消商品收藏
app.patch('/api/users/uncollects4/:sid',async (req,res)=>{
    try {
        const {sid} = req.params
        if(!sid){
            return res.status(400).json({
                message:"没有获取到商铺商品id"
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
        const storecommodity = await Storecommodity.findById(sid)
        if(!storecommodity){
            return res.status(400).json({
                message:"该收藏商铺商品不存在"
            })
        }
        if(!user.collects4.includes(storecommodity._id)&&!storecommodity.dianzans_storecommodity.includes(user._id)){
            return res.status(400).json({
                message:"你没收藏过该商铺商品"
            })
        }
        user.collects4.pull(storecommodity)
        await user.save()
        storecommodity.dianzans_storecommodity.pull(user)
        await storecommodity.save()
        return res.json({
            message:"成功取消商品收藏",
            data:user
        })
    } catch (e) {
        return res.status(400).json({
            message:e.message
        })
    }
}),


    //商品加入购物车
    app.patch('/api/shoppingcarts/putin/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有获取到商品id"
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
            const commodity = await Commodity.findById(cid)
            if(!commodity){
                return res.status(400).json({
                    message:"待加入购物车商品不存在"
                })
            }
            if(String(user._id)===String(commodity.author)){
                return res.status(400).json({
                    message:"你是该商品的发布者无法购买该商品"
                })
            }
            if(user.shoppingcarts.includes(commodity._id)){
                return res.status(400).json({
                    message:"该商品已经在购物车里了哟~"
                })
            }
            user.shoppingcarts.push(commodity)
            await user.save()
            return res.json({
                message:"商品成功加入购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //商品移出购物车
    app.patch('/api/shoppingcarts/takeout/:cid',async (req,res)=>{
        try {
            const {cid} = req.params
            if(!cid){
                return res.status(400).json({
                    message:"没有获取到商品id"
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
            const commodity = await Commodity.findById(cid)
            if(!commodity){
                return res.status(400).json({
                    message:"该商品不存在"
                })
            }
            if(!user.shoppingcarts.includes(commodity._id)){
                return res.status(400).json({
                    message:"该商品您未加入过购物车"
                })
            }
            user.shoppingcarts.pull(commodity)
            await user.save()
            return res.json({
                message:"成功将商品移出购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //二手商品加入购物车
    app.patch('/api/shoppingcarts2/putin/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到二手商品id"
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
            const secondhand = await Secondhand.findById(sid)
            if(!secondhand){
                return res.status(400).json({
                    message:"待加入购物车的二手商品不存在"
                })
            }
            if(String(user._id)===String(secondhand.author)){
                return res.status(400).json({
                    message:"你是该二手商品的发布者无法购买该商品"
                })
            }
            if(user.shoppingcarts2.includes(secondhand._id)){
                return res.status(400).json({
                    message:"该二手商品您已经加入过购物车了"
                })
            }
            user.shoppingcarts2.push(secondhand)
            await user.save()
            return res.json({
                message:"二手商品成功加入购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //二手商品移出购物车
    app.patch('/api/shoppingcarts2/takeout/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有获取到二手商品id"
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
            const secondhand = await Secondhand.findById(sid)
            if(!secondhand){
                return res.status(400).json({
                    message:"该二手商品不存在"
                })
            }
            if(!user.shoppingcarts2.includes(secondhand._id)){
                return res.status(400).json({
                    message:"该二手商品您未加入过购物车"
                })
            }
            user.shoppingcarts2.pull(secondhand)
            await user.save()
            return res.json({
                message:"成功将二手商品移出购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //团购商品加入购物车
    app.patch('/api/shoppingcarts3/putin/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有获取到团购商品id"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!groupbuy){
                return res.status(400).json({
                    message:"待加入购物车的团购商品不存在"
                })
            }
            if(String(user._id)===String(groupbuy.author)){
                return res.status(400).json({
                    message:"你是该团购商品的发布者无法购买该商品"
                })
            }
            if(user.shoppingcarts3.includes(groupbuy._id)){
                return res.status(400).json({
                    message:"该团购商品您已经加入过购物车了"
                })
            }
            user.shoppingcarts3.push(groupbuy)
            await user.save()
            return res.json({
                message:"团购商品成功加入购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //团购商品移出购物车
    app.patch('/api/shoppingcarts3/takeout/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有获取到团购商品id"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!groupbuy){
                return res.status(400).json({
                    message:"该团购商品不存在"
                })
            }
            if(!user.shoppingcarts3.includes(groupbuy._id)){
                return res.status(400).json({
                    message:"该团购商品您未加入过购物车"
                })
            }
            user.shoppingcarts3.pull(groupbuy)
            await user.save()
            return res.json({
                message:"成功将团购商品移出购物车",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户点赞闲聊
    app.patch('/api/users/likes/:did',async (req,res)=>{
        try {
            const {did} = req.params
            if(!did){
                return res.status(400).json({
                    message:"没有获取到闲聊帖子id"
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
            const discuss = await Discuss.findById(did)
            if(!discuss){
                return res.status(400).json({
                    message:"待点赞帖子不存在"
                })
            }
            // if(String(discuss.author)===String(user._id)){
            //     return res.status(400).json({
            //         message:"不能点赞自己"
            //     })
            // }
            if(user.likesd.includes(discuss._id)&&discuss.dianzans_discuss.includes(user._id)){
                return res.status(400).json({
                    message:"你已经点赞过该帖子"
                })
            }
            user.likesd.push(discuss)
            await user.save()
            discuss.dianzans_discuss.push(user)
            await discuss.save()
            return res.json({
                message:"点赞成功~",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //用户取消点赞
    app.patch('/api/users/unlikes/:did',async (req,res)=>{
        try {
            const {did} = req.params
            if(!did){
                return res.status(400).json({
                    message:"没有获取到闲聊帖子id"
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
            const discuss = await Discuss.findById(did)
            if(!discuss){
                return res.status(400).json({
                    message:"该点赞帖子不存在"
                })
            }
            if(!user.likesd.includes(discuss._id)&&!discuss.dianzans_discuss.includes(user._id)){
                return res.status(400).json({
                    message:"你没点赞过该用户"
                })
            }
            user.likesd.pull(discuss)
            await user.save()
            discuss.dianzans_discuss.pull(user)
            await discuss.save()
            return res.json({
                message:"取消点赞",
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


        //用户点赞求助
        app.patch('/api/users/likes2/:hid',async (req,res)=>{
            try {
                const {hid} = req.params
                if(!hid){
                    return res.status(400).json({
                        message:"没有获取到求助帖子id"
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
                const helpdiscuss = await Helpdiscuss.findById(hid)
                if(!helpdiscuss){
                    return res.status(400).json({
                        message:"待点赞帖子不存在"
                    })
                }
                // if(String(helpdiscuss.author)===String(user._id)){
                //     return res.status(400).json({
                //         message:"不能点赞自己"
                //     })
                // }
                if(user.likesh.includes(helpdiscuss._id)&&helpdiscuss.dianzans_helpdiscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你已经点赞过该帖子"
                    })
                }
                user.likesh.push(helpdiscuss)
                await user.save()
                helpdiscuss.dianzans_helpdiscuss.push(user)
                await helpdiscuss.save()
                return res.json({
                    message:"点赞成功~",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),
    
        //用户取消点赞
        app.patch('/api/users/unlikes2/:hid',async (req,res)=>{
            try {
                const {hid} = req.params
                if(!hid){
                    return res.status(400).json({
                        message:"没有获取到求助帖子id"
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
                const helpdiscuss = await Helpdiscuss.findById(hid)
                if(!helpdiscuss){
                    return res.status(400).json({
                        message:"该点赞帖子不存在"
                    })
                }
                if(!user.likesh.includes(helpdiscuss._id)&&!helpdiscuss.dianzans_helpdiscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你没点赞过该用户"
                    })
                }
                user.likesh.pull(helpdiscuss)
                await user.save()
                helpdiscuss.dianzans_helpdiscuss.pull(user)
                await helpdiscuss.save()
                return res.json({
                    message:"取消点赞",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),

        //用户点赞种草
        app.patch('/api/users/likes3/:lid',async (req,res)=>{
            try {
                const {lid} = req.params
                if(!lid){
                    return res.status(400).json({
                        message:"没有获取到种草帖子id"
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
                const likediscuss = await Likediscuss.findById(lid)
                if(!likediscuss){
                    return res.status(400).json({
                        message:"待点赞帖子不存在"
                    })
                }
                // if(String(likediscuss.author)===String(user._id)){
                //     return res.status(400).json({
                //         message:"不能点赞自己"
                //     })
                // }
                if(user.likesl.includes(likediscuss._id)&&likediscuss.dianzans_likediscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你已经点赞过该帖子"
                    })
                }
                user.likesl.push(likediscuss)
                await user.save()
                likediscuss.dianzans_likediscuss.push(user)
                await likediscuss.save()
                return res.json({
                    message:"点赞成功~",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),
    
        //用户取消点赞
        app.patch('/api/users/unlikes3/:lid',async (req,res)=>{
            try {
                const {lid} = req.params
                if(!lid){
                    return res.status(400).json({
                        message:"没有获取到求助帖子id"
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
                const likediscuss = await Likediscuss.findById(lid)
                if(!likediscuss){
                    return res.status(400).json({
                        message:"该点赞帖子不存在"
                    })
                }
                if(!user.likesl.includes(likediscuss._id)&&!likediscuss.dianzans_likediscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你没点赞过该用户"
                    })
                }
                user.likesl.pull(likediscuss)
                await user.save()
                likediscuss.dianzans_likediscuss.pull(user)
                await likediscuss.save()
                return res.json({
                    message:"取消点赞",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),

        //用户点赞种草
        app.patch('/api/users/likes4/:uid',async (req,res)=>{
            try {
                const {uid} = req.params
                if(!uid){
                    return res.status(400).json({
                        message:"没有获取到拔草帖子id"
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
                const unlikediscuss = await Unlikediscuss.findById(uid)
                if(!unlikediscuss){
                    return res.status(400).json({
                        message:"待点赞帖子不存在"
                    })
                }
                // if(String(unlikediscuss.author)===String(user._id)){
                //     return res.status(400).json({
                //         message:"不能点赞自己"
                //     })
                // }
                if(user.likesu.includes(unlikediscuss._id)&&unlikediscuss.dianzans_unlikediscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你已经点赞过该帖子"
                    })
                }
                user.likesu.push(unlikediscuss)
                await user.save()
                unlikediscuss.dianzans_unlikediscuss.push(user)
                await unlikediscuss.save()
                return res.json({
                    message:"点赞成功~",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),
    
        //用户取消点赞
        app.patch('/api/users/unlikes4/:uid',async (req,res)=>{
            try {
                const {uid} = req.params
                if(!uid){
                    return res.status(400).json({
                        message:"没有获取到求助帖子id"
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
                const unlikediscuss = await Unlikediscuss.findById(uid)
                if(!unlikediscuss){
                    return res.status(400).json({
                        message:"该点赞帖子不存在"
                    })
                }
                if(!user.likesu.includes(unlikediscuss._id)&&!unlikediscuss.dianzans_unlikediscuss.includes(user._id)){
                    return res.status(400).json({
                        message:"你没点赞过该用户"
                    })
                }
                user.likesu.pull(unlikediscuss)
                await user.save()
                unlikediscuss.dianzans_unlikediscuss.pull(user)
                await unlikediscuss.save()
                return res.json({
                    message:"取消点赞",
                    data:user
                })
            } catch (e) {
                return res.status(400).json({
                    message:e.message
                })
            }
        }),

    //获取用户信息接口
    app.get('/api/users/:uid',async (req,res)=>{
        try {
            const {uid} = req.params//根据参数获取uid
            if(!uid){
                return res.status(400).json({
                    message:"没有输入用户的ID"
                })
            }
            const user = await User.findById(uid)
            // 链式写法，获取相关模型信息
            .populate("discusses",'title content posttime pictures')
            .populate("helpdiscusses",'title content posttime pictures')
            .populate("likediscusses",'title content posttime pictures')
            .populate("unlikediscusses",'title content posttime pictures')
            .populate("mcommodities",'category title content posttime pictures')
            .populate("cinformations",'category title content posttime pictures')
            .populate("stores")
            .populate("groupbuys",'category title content posttime pictures')
            .populate("secondhands",'category title content posttime pictures')
            .populate("collects")
            .populate("collects2")
            .populate("collects3")
            .populate("collects4")
            .populate("shoppingcarts","category title content price posttime pictures")
            .populate("shoppingcarts2","category title content price posttime pictures")
            .populate("shoppingcarts3","category title content price posttime pictures")
            .populate("followers")
            .populate("fans")
            .populate("followers2")
            .populate("likesd")
            .populate("likesh")
            .populate("likesl")
            .populate("likesu")
            .populate("pletters")
            if(!user){
                return res.status(400).json({
                    message:"该用户不存在"
                })
            }
            user.password = null
            user.token = null
            return res.json({
                data:user
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })

}

export default userAPIs
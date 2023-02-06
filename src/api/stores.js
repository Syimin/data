import mongoose from 'mongoose'
import Store from '../model/Store'
import User from '../model/User'
import Commodity from '../model/Commodity'
import Crypto from 'crypto'
import {v4 as uuidv4} from 'uuid'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const storeAPIs = (app)=>{
    //申请商铺
    app.post('/api/stores',async (req,res)=>{
        try {
            const {username,token,storename,password,confirmpass} = req.body
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
                    message:"没有输入商铺名"
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
            const user = await User.findOne({
                username:username,
                token:token
            })
            if(!user){
                return res.status(400).json({
                    message:"token已过期，请重新登陆"
                })
            }
            const store = await Store.findOne({storename:storename})
            if(store){
                return res.status(400).json({
                    message:"该商铺名已经被占用"
                })
            }
            if(user.stores.length >= 1){
                return res.status(400).json({
                    message:"你已创建过店铺,一个用户只允许建一个店铺"
                })
            }
            console.log(user.stores.length)
            const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex')
            const newStore = {//商铺的对象
                storename:storename,
                password:passwordCryp,
                author:user//创建商铺的用户
            }
            const newstore = new Store(newStore)//表示用mongoose新弄一个模型，用new表示事例化
            user.stores.push(newstore)//存进user的商铺模型里
            await user.save()
            await newstore.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            return res.json({
                message:"新增商铺成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //商铺登陆
    app.post('/api/stores/login',async (req,res)=>{
        try {
            const {username,token,storename,password} = req.body
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
                    message:"没有输入商铺名"
                })
            }
            if(!password){
                return res.status(400).json({
                    message:"没有输入密码"
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
            const passwordCryp = Crypto.createHash('sha1').update(password).digest('hex')
            const store = await Store.findOne({storename:storename})
            if(!store){
                return res.status(400).json({
                    message:"该商铺不存在"
                })
            }
            if(store.password!==passwordCryp){
                return res.status(400).json({
                    message:"密码错误，请重新输入"
                })
            }
            if(String(user._id)!==String(store.author)){
                return res.status(400).json({
                    message:"你不是该商铺的所有者"
                })
            }
            const tokenstr = uuidv4();//生成标识符
            const s_token = Crypto.createHash('sha1').update(tokenstr).digest('hex')
            store.s_token = s_token
            await store.save()
            return res.json({
                message:"登陆成功",
                data:{//伴随登陆成功同时将商铺名和登陆凭证token一并返回给前端
                    _id:store._id,
                    storename:store.storename,
                    s_token:store.s_token,
                    avatar:store.avatar
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

     //验证接口
     app.post('/api/stores/auth',async (req,res)=>{
        try {
            const {storename,s_token} = req.body
            // if(!username){
            //     return res.status(400).json({
            //         message:"没有获取到用户名"
            //     })
            // }
            // if(!token){
            //     return res.status(400).json({
            //         message:"没有获取到token"
            //     })
            // }
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
            // const user = await User.findOne({
            //     username:username,
            //     token:token
            // })
            // if(!user){
            //     return res.status(400).json({
            //         message:"token已过期，请重新登陆"
            //     })
            // }
            const store = await Store.findOne({
                storename:storename,
                s_token:s_token
            })
            if(!store){
                return res.status(400).json({
                    message:"s_token已过期，请重新登陆"
                })
            }
            //将密码和token遮蔽保护用户隐私
            store.password = null
            store.s_token = null
            return res.json({
                message:"验证成功",
                data:store
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    
    //商铺注销
    app.post('/api/stores/logout',async (req,res)=>{
        try {
            const {storename,s_token} = req.body
            // if(!username){
            //     return res.status(400).json({
            //         message:"没有获取到用户名"
            //     })
            // }
            // if(!token){
            //     return res.status(400).json({
            //         message:"没有获取到token"
            //     })
            // }
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
            // const user = await User.findOne({
            //     username:username,
            //     token:token
            // })
            // if(!user){
            //     return res.status(400).json({
            //         message:"token已过期，请重新登陆"
            //     })
            // }
            const store = await Store.findOne({
                storename:storename,
                s_token:s_token
            })
            if(!store){
                return res.status(400).json({
                    message:"s_token已过期，请重新登陆"
                })
            }
            store.s_token = null//将s_token清空
            await store.save()
            return res.json({
                message:"成功退出商铺登陆"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //商铺信息修改 
    app.patch('/api/stores',upload.single('avatar'),async (req,res)=>{
        try {
            const {username,token,storename,s_token,description} = req.body
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
            if(req.file){//判断用户是否传了文件
                store.avatar = req.file.filename//如果传了文件就把商铺头像改为上传的文件
            }
            store.description = description//商铺描述
            await store.save()
            return res.json({
                message:"修改商铺资料成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),


    //获取商铺列表
    app.get('/api/stores',async (req,res)=>{
        try {
            const stores = await Store.find()
            .populate('author','username avatar')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:stores
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    
    //获取特定商铺信息
    app.get('/api/stores/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入商铺ID"
                })
            }
            const store = await Store.findById(sid)
            .populate('author','username avatar description nickname')
            .populate("storecommodities","category title content price posttime pictures")
            .populate("stores",'storename posttime')
            if(!store){
                return res.status(400).json({
                    message:"该商铺不存在"
                })
            }
            store.password = null
            store.s_token = null
            return res.json({
                data:store
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })

    //删除商铺
    app.delete('/api/stores/:sid',async (req,res)=>{
        try {
            const {sid} = req.params
            if(!sid){
                return res.status(400).json({
                    message:"没有输入商铺ID"
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
            // const newstore = await User.findById(sid)//用newstore是因为store在上面已经被声明过了，不可重复
            // if(!sid){
            //     return res.status(400).json({
            //         message:"该商铺不存在"
            //     })
            // }
            // if(String(user._id)!==String(newstore.author)){
            //     return res.status(400).json({
            //         message:"你不是发布该商铺的用户"
            //     })
            // }
            await Commodity.deleteMany({
                target:mongoose.Types.ObjectId(sid)
            })
            user.stores.pull(sid)
            await user.save()
            return res.json({
                message:"成功删除商铺"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
}

export default storeAPIs
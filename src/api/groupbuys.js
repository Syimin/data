import mongoose from 'mongoose'
import User from '../model/User'
import Groupbuy from '../model/Groupbuy'
import Comment3 from '../model/Comment3'
import File from '../model/File'
import Store from '../model/Store'
import multer from 'multer'

const upload = multer({//上传图片文件都存到static里边的upload
    dest:'./static/upload'
})

const groupbuyAPIs = (app)=>{
    
    //发布团购
    app.post('/api/groupbuys',upload.array('pictures'),async (req,res)=>{//upload.array('pictures',9)
        try {
            const {username,token,category,motoprice,price,title,content,filelist} = req.body
            console.log("这个是团购接口里的fileList:",filelist)
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
                    message:"没有输入团购类型"
                })
            }
            if(!motoprice){
                return res.status(400).json({
                    message:"没有输入商品原价"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入团购价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入团购标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入团购内容"
                })
            }
            // if(!number){
            //     return res.status(400).json({
            //         message:"没有输入发团人数"
            //     })
            // }
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

            const newGroupbuy = {//对象数据类型
                category:category,
                motoprice:motoprice,
                price:price,
                title:title,
                content:content,
                // number:number,
                author:user //同时记录上发布团购的作者
            }
            const groupbuy = new Groupbuy(newGroupbuy)//声明一个新的模型
            groupbuy.pictures = fl
            await groupbuy.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
            user.groupbuys.push(groupbuy)
            await user.save()
            return res.json({
                message:"发起团购成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
        
    }),

    //发布商铺里的团购
    // app.post('/api/groupbuys/:sid',upload.array('pictures',9),async (req,res)=>{//upload.array('picture',5)
    //     try {
    //         const {sid} = req.params
    //         if(!sid){
    //             return res.status(400).json({
    //                 message:"没有输入商铺ID"
    //             })
    //         }
    //         const {username,token,storename,s_token,category,price,title,content,number} = req.body
    //         if(!username){
    //             return res.status(400).json({
    //                 message:"没有获取到用户名"
    //             })
    //         }
    //         if(!token){
    //             return res.status(400).json({
    //                 message:"没有获取到token"
    //             })
    //         }
    //         if(!storename){
    //             return res.status(400).json({
    //                 message:"没有获取到商铺名"
    //             })
    //         }
    //         if(!s_token){
    //             return res.status(400).json({
    //                 message:"没有获取到s_token"
    //             })
    //         }
    //         if(!category){
    //             return res.status(400).json({
    //                 message:"没有输入团购类型"
    //             })
    //         }
    //         if(!price){
    //             return res.status(400).json({
    //                 message:"没有输入团购价格"
    //             })
    //         }
    //         if(!title){
    //             return res.status(400).json({
    //                 message:"没有输入团购标题"
    //             })
    //         }
    //         if(!content){
    //             return res.status(400).json({
    //                 message:"没有输入团购内容"
    //             })
    //         }
    //         if(!number){
    //             return res.status(400).json({
    //                 message:"没有输入开团人数"
    //             })
    //         }
    //         const user = await User.findOne({
    //             username:username,
    //             token:token
    //         })
    //         if(!user){
    //             return res.status(400).json({
    //                 message:"token已过期，请重新登陆"
    //             })
    //         }
    //         const store = await Store.findOne({
    //             storename:storename,
    //             s_token:s_token
    //         })
    //         if(!store){
    //             return res.status(400).json({
    //                 message:"s_token已过期，请重新登陆"
    //             })
    //         }
    //         const newGroupbuy = {//对象数据类型
    //             category:category,
    //             price:price,
    //             title:title,
    //             content:content,
    //             number,
    //             author:user,//同时记录上发布团购的作者
    //             target:sid
    //         }
    //         const groupbuy = new Groupbuy(newGroupbuy)//声明一个新的模型
    //         if(req.files){
    //             req.files.forEach(async (item,index)=>{
    //                 // console.log(item);
    //                 const file = new File({
    //                     filename:item.filename,
    //                     mimetype:item.mimetype,
    //                     size:item.size,
    //                     author:user
    //                     })
                    
    //                 groupbuy.pictures.push(file)
    //                 await file.save()
    //             })
    //         }
    //         await groupbuy.save()//save存储进数据库，因为用到数据库处理所以前面加一个await
    //         user.groupbuys.push(groupbuy)//存进user的发布团购模型里
    //         await user.save()
    //         store.cinformations.push(groupbuy)//存进store的团购信息模型里
    //         await store.save()
    //         return res.json({
    //             message:"商铺发起团购成功"
    //         })
    //     } catch (e) {
    //         return res.status(400).json({
    //             message:e.message
    //         })
    //     }
    // }),

    //获取团购列表
    app.get('/api/groupbuys',async (req,res)=>{
        try {
            const groupbuys = await Groupbuy.find()
            .populate('author','username stores')//不止找一个所有不用findone,并且用populate返回用户一些信息
            .sort({"posttime":-1})
            return res.json({
                data:groupbuys
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //获取特定的团购内容
    app.get('/api/groupbuys/:gid',async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有输入团购的ID"
                })
            }
            const groupbuy = await Groupbuy.findById(gid)
            .populate('author','username avatar description nickname')
            .populate('dianzans_groupbuy')
            if(!groupbuy){
                return res.status(400).json({
                    message:"该团购不存在"
                })
            }
            const comments = await Comment3.find({target:gid}).populate('author','username avatar description nickname')//具体获取每条回复里作者的一些相关信息
            return res.json({
                data:{
                    groupbuy,
                    comments
                }
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //修改团购内容
    app.patch('/api/groupbuys/:gid',upload.array('pictures',9),async (req,res)=>{
        try {
            const {gid} = req.params
            if(!gid){
                return res.status(400).json({
                    message:"没有输入团购ID"
                })
            }
            const {username,token,category,motoprice,price,title,content} = req.body
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
                    message:"没有输入团购类型"
                })
            }
            if(!motoprice){
                return res.status(400).json({
                    message:"没有输入商品原价"
                })
            }
            if(!price){
                return res.status(400).json({
                    message:"没有输入团购价格"
                })
            }
            if(!title){
                return res.status(400).json({
                    message:"没有输入团购标题"
                })
            }
            if(!content){
                return res.status(400).json({
                    message:"没有输入团购内容"
                })
            }
            // if(!number){
            //     return res.status(400).json({
            //         message:"没有输入开团人数"
            //     })
            // }
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
            if(!gid){
                return res.status(400).json({
                    message:"该团购不存在"
                })
            }
            if(String(user._id)!==String(groupbuy.author)){
                return res.status(400).json({
                    message:"你不是发布该团购的用户"
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
                    
                    groupbuy.pictures.push(file)
                    await file.save()
                })
            }
            groupbuy.category = category
            groupbuy.motoprice = motoprice
            groupbuy.price = price
            groupbuy.title = title
            groupbuy.content = content
            // groupbuy.number = number
            await groupbuy.save()
            return res.json({
                message:"修改团购内容成功"
            })
        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),
    //删除团购
    app.delete('/api/groupbuys/:gid',async (req,res)=>{
        try {
           const {gid} = req.params
           if(!gid){
               return res.status(400).json({
                   message:"没有输入团购ID"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!gid){
                return res.status(400).json({
                    message:"该团购不存在"
                })
            }
            if(String(user._id)!==String(groupbuy.author)){
                return res.status(400).json({
                    message:"你不是发布该团购的用户"
                })
            }
            user.groupbuys.pull(groupbuy)
            await user.save()
            await groupbuy.remove() //移除
            return res.json({
                message:"成功删除团购"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    }),

    //删除商铺里的团购
    app.delete('/api/stores/:gid',async (req,res)=>{
        try {
           const {gid} = req.params
           if(!gid){
               return res.status(400).json({
                   message:"没有输入团购ID"
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
            const groupbuy = await Groupbuy.findById(gid)
            if(!gid){
                return res.status(400).json({
                    message:"该团购不存在"
                })
            }
            if(String(user._id)!==String(groupbuy.author)){
                return res.status(400).json({
                    message:"你不是发布该团购的商家"
                })
            }
            await Groupbuy.deleteMany({
                target:mongoose.Types.ObjectId(gid)
            })
            user.groupbuys.pull(groupbuy)
            await user.save()
            await groupbuy.remove() //移除
            return res.json({
                message:"成功删除商铺团购"
            })

        } catch (e) {
            return res.status(400).json({
                message:e.message
            })
        }
    })
    
}

export default groupbuyAPIs
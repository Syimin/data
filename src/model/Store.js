import mongoose from 'mongoose'

const StoreSchema = new mongoose.Schema({
    storename:{//商铺昵称
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{//商铺密码
        type:String,
        required:true,
        trim:true
    },
    posttime:{//商铺创建时间
        type:Date,
        default:Date.now()
    },
    avatar:String,//商铺头像
    description:{//商铺个性签名
        type:String,
        trim:true
    },
    s_token:String,//商铺登录凭证
    url:String,
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    storecommodities:[{//记录商铺发布商品相关信息
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Storecommodity'//关联到商品模型
    }]
})

const Store = mongoose.model('Store',StoreSchema)
export default Store
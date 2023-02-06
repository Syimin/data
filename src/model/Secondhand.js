import mongoose from 'mongoose'
import User from './User'

const SecondhandSchema = new mongoose.Schema({
    category:{//商品类别
        type:String,
        required:true,
        trim:true
    },
    price:{//商品价格
        type:Number,
        required:true
    },
    title:{//商品标题
        type:String,
        required:true,
        trim:true
    },
    content:{//商品内容
        type:String,
        required:true,
        trim:true
    },
    number:{
        type:Number,
        required:true
    },
    posttime:{//商品发布时间
        type:Date,
        default:Date.now()
    },
    pictures:[{//商品图片
        type:String
    }],
    url:String,//商品链接
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    target:{//存储商铺的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Store'
    },
    comments:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Comment4'//关联到回复模型
    }],
    dianzans_secondhand:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'//关联到回复模型
    }],
})

const Secondhand = mongoose.model('Secondhand',SecondhandSchema)
export default Secondhand
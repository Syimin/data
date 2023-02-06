import mongoose from 'mongoose'
import User from './User'
import Store from './Store'
import Comment2 from './Comment2'

const GroupbuySchema = new mongoose.Schema({
    category:{//商品类别
        type:String,
        required:true,
        trim:true
    },
    price:{//现价
        type:Number,
        required:true
    },
    motoprice:{//原价
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
    // number:{
    //     type:Number,
    //     required:true
    // },
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
        ref:'Comment3'//关联到回复模型
    }],
    dianzans_groupbuy:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'//关联到回复模型
    }],
})

const Groupbuy = mongoose.model('Groupbuy',GroupbuySchema)
export default Groupbuy
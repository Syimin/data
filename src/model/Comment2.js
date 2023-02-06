import mongoose from 'mongoose'
import User from './User'
import Discuss from './Discuss'
//针对商品发表讨论
const CommentSchema = new mongoose.Schema({
    content:{//回复内容
        type:String,
        required:true,
        trim:true
    },
    posttime:{//发布时间
        type:Date,
        default:Date.now()
    },
    pictures:[{//商品图片
        type:String
    }],
    anonymous:Boolean,//匿名选择
    author:{//存储用户的信息
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'User'
    },
    target:{//存储讨论的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Commodity'
    }
})

const Comment2 = mongoose.model('Comment2',CommentSchema)
export default Comment2
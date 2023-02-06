import mongoose from 'mongoose'
import User from './User'

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
    anonymous:Boolean,//匿名选择
    author:{//存储用户的信息
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'User'
    },
    target:{//存储讨论的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Groupbuy'
    }
})

const Comment3 = mongoose.model('Comment3',CommentSchema)
export default Comment3
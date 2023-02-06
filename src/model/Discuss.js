import mongoose from 'mongoose'
import User from './User'
import Commodity from './Commodity'
//闲聊区帖子
const DiscussSchema = new mongoose.Schema({
    title:{//讨论标题
        type:String,
        required:true,
        trim:true
    },
    content:{//讨论内容
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
        required:true,
        ref:'User'
    },
    comments:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Comment'
    }],
    dianzans_discuss:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'//关联到回复模型
    }],
})

const Discuss = mongoose.model('Discuss',DiscussSchema)
export default Discuss
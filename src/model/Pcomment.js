import mongoose from 'mongoose'

const PcommentSchema = new mongoose.Schema({
    content:{//回复私信内容
        type:String,
        required:true,
        trim:true
    },
    posttime:{//发布时间
        type:Date,
        default:Date.now()
    },
    author:{//存储用户的信息
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    target:{//存储商品的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Pletter'
    }
})

const Pcomment = mongoose.model('Pcomment',PcommentSchema)
export default Pcomment
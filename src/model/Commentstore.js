import mongoose from 'mongoose'

const CommentstoreSchema = new mongoose.Schema({
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
        ref:'Storecommodity'
    }
})

const Commentstore = mongoose.model('Commentstore',CommentstoreSchema)
export default Commentstore
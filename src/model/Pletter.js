import mongoose from 'mongoose'
//私信帖子
const PletterSchema = new mongoose.Schema({
    content:{//讨论内容
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
        ref:'User'
    },
    // pletters:[{
    //     type:mongoose.SchemaTypes.ObjectId,
    //     ref:'Pletter'
    // }],
    pcomments:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Pcomment'
    }]
})

const Pletter = mongoose.model('Pletter',PletterSchema)
export default Pletter
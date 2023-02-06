import mongoose from 'mongoose'

const StorecommoditySchema = new mongoose.Schema({
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
    posttime:{//商品发布时间
        type:Date,
        default:Date.now()
    },
    pictures:[{//商品图片
        type:String
    }],
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Store'
    },
    comments:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Commentstore'//关联到回复模型
    }],
    dianzans_storecommodity:[{//记录用户回复过复数个讨论
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'//关联到回复模型
    }],

})

const Storecommodity = mongoose.model('Storecommodity',StorecommoditySchema)
export default Storecommodity
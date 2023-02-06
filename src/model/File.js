import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
    filename: { 
        type: String, 
        required: true, 
        unique: true
    },
    mimetype: { 
        type: String 
    },
    size: { 
        type: Number, 
        required: true 
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    target:{//存储商铺的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Commodity'
    },
    target2:{//存储商铺的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Secondhand'
    },
    target3:{//存储商铺的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Groupbuy'
    },
})

const File = mongoose.model('File',FileSchema)
export default File
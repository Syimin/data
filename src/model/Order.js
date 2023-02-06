import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    information:{//买家信息
        type:String,
        required:true,
        trim:true
    },
    remarks:{//备注区
        type:String,
        trim:true 
    },
    choice:{//选择区
        type:String,
        required:true,
        trim:true 
    },
    target:{//存储商品的id
        type:mongoose.SchemaTypes.ObjectId,
        requried:true,
        ref:'Commodity'
    }
})

const Order = mongoose.model('Order',OrderSchema)
export default Order
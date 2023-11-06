import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
        title: { type: String, require: true },
        description: { type: String, require: true },
        code: { type: String, require: true },
        price: { type: Number, require: true },
        status: { type: String, default: 'active', enum: ['active', 'inactive'] },
        stock: { type: Number, require: true },
        category: { type: String, require: true },
        thumbnail: { type: Array, default: []}
})

export default mongoose.model('Product', productSchema);
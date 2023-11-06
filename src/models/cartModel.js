import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema({
    products: { type: [] }
})

export default mongoose.model('Cart', cartSchema);
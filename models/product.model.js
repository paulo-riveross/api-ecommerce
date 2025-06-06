import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    title: {
        type: String, required: true},
    description: String,
    price: {
        type: Number, required: true},
    stock: {
        type: Number, required: true},
    category: String,
    images: [String],
}, {
    timestamps: true,
});            

const Product = mongoose.model('Product', productSchema);
export default Product;
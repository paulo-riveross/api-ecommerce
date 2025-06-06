import mongoose from 'moongose'

const orderSchema = new mongoose.schema(
    {
        userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ], 
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Order", orderSchema)
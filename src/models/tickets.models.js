import { Schema, model } from "mongoose";

const ticketCollection = "ticket";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purcharser: {
        type: String,
        required: true
    },
    products: {
        type: Object
    }
})

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;
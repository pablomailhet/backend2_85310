import { model, Schema } from "mongoose";
import cartModel from "./carts.models.js";

const userCollection = "users";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
        ],
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: null
    },
    rol: {
        type: String,
        default: "user",
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
});

userSchema.post("save", async function (userCreated) {
    try {
        const newCart = await cartModel.create({ products: [] });
        await model("users").findByIdAndUpdate(userCreated._id, {
            cart: newCart._id
        });
    }
    catch (error) {
        console.log(error);
    }
})

const userModel = model(userCollection, userSchema);

export default userModel;

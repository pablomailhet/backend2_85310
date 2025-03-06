import cartModel from "../models/carts.model.js";

export const getCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", cart });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
}

export const createCart = async (req, res) => {
    try {
        let cart = req.body;
        const newCart = await cartModel.create(cart);
        res.status(201).send({ status: "success", message: "Cart added", cart: newCart });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
}

export const insertProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        let quantity = parseInt(req.body.quantity) || 1;
        if (isNaN(quantity) || quantity <= 0) {
            throw new Error("Invalid quantity");
        }

        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        if (!await productModel.findById(pid)) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        const products = cart.products;

        const product = products.find(item => item.product.id === pid);

        if (product) {
            product.quantity += quantity;
        }
        else {
            const product = {
                product: pid,
                quantity
            };
            products.push(product);
        }

        await cart.save();

        res.status(201).send({ status: "success", message: "Product added in cart" });

    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
}

export const deleteProductCart = async (req, res) => {

    try {

        const { cid, pid } = req.params;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { "product": pid } } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", message: "Product deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).send({ status: "error", message: error.message });

    }
}

export const deleteCart = async (req, res) => {
    try {

        const { cid } = req.params;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }

        res.send({ status: "success", message: "All products deleted from cart", cart: updatedCart });

    }
    catch (error) {

        res.status(500).send({ status: "error", message: error.message });

    }
}
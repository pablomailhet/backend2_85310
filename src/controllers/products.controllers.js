import productModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
    try {

        const { limit, page, metFilter, filter, metOrder, order } = req.query;

        const currPage = page !== undefined ? page : 1
        const currLimit = limit !== undefined ? limit : 10

        const filQuery = metFilter !== undefined ? { [metFilter]: filter } : {}
        const ordQuery = metOrder !== undefined ? { metOrder: order } : {}

        const products = await productModel.paginate(filQuery, { limit: currLimit, page: currPage, ordQuery, lean: true })

        products.pageNumbers = Array.from({ length: products.totalPages }, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page
        }))

        res.status(200).send({ status: "success", products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.findById(pid);
        if (product) {
            res.status(200).send({ status: "success", product });
        } 
        else {
            res.status(404).send({
                status: "error",
                message: "Product not found.",
            });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {

        const product = req.body;
        const newProduct = await productModel.create(product);
        res.status(201).send({
            status: "success",
            message: "Product added",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const updateProduct = req.body;
        const product = await productModel.findByIdAndUpdate(
            pid,
            updateProduct,
            {
                new: true,
                runValidators: true,
            }
        );
        if (product) {
            res.status(200).send({
                status: "success",
                message: "Product updated",
                product,
            });
        } 
        else {
            res.status(404).send({
                status: "error",
                message: "Product not found.",
            });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productModel.findByIdAndDelete(pid, {
            new: true,
        });
        if (product) {
            res.status(200).send({
                status: "success",
                message: "Product deleted",
            });
        } else {
            res.status(404).send({
                status: "error",
                message: "Product not found.",
            });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

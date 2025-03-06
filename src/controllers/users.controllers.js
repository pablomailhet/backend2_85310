import userModel from "../models/users.models.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({ status: "success", users });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await userModel.findById(uid);
        if (user) {
            res.status(200).send({ status: "success", user });
        }
        else {
            res.status(404).send({ status: "error", message: "User not found." });
        }
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const newUser = await userModel.create(user);
        res.status(201).send({ status: "success", message: "User added", user: newUser });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const updateUser = req.body;
        const user = await userModel.findByIdAndUpdate(uid, updateUser, { new: true, runValidators: true });

        if (user) {
            res.status(200).send({ status: "success", message: "User updated", user });
        }
        else {
            res.status(404).send({ status: "error", message: "User not found." });
        }
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await userModel.findByIdAndDelete(uid, { new: true });

        if (user) {
            res.status(200).send({ status: "success", message: "User deleted" });
        }
        else {
            res.status(404).send({ status: "error", message: "User not found." });
        }
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};
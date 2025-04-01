import userModel from "../models/users.models.js";

import { hashPassword } from "../utils/bcrypt.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ status: "success", users });
    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await userModel.findById(uid);

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found." });
        }

        res.status(200).json({ status: "success", user });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {

        let { first_name, last_name, email, password, age } = req.body;

        password = hashPassword(password);

        const user = await userModel.create({ first_name, last_name, email, password, age });

        res.status(201).json({ status: "success", message: "User added", user: user });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {

        const uid = req.params.uid;

        let { first_name, last_name, email, password, age } = req.body;

        password = hashPassword(password);

        const user = await userModel.findByIdAndUpdate(uid, { first_name, last_name, email, password, age }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found." });
        }

        res.status(200).json({ status: "success", message: "User updated", user });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await userModel.findByIdAndDelete(uid, { new: true });

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found." });
        }

        res.status(200).json({ status: "success", message: "User deleted" });

    }
    catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
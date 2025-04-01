import dotenv from "dotenv";
dotenv.config();

import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (password) => {
    return hashSync(password, parseInt(process.env.SALT));
}

export const validatePassword = (password, passwordBDD) => {
    return compareSync(password, passwordBDD);
}


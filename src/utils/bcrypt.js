import { hashSync, compareSync } from "bcrypt";

export const hashPassword = (password) => {
    return hashSync(password, 5);
}

export const validatePassword = (password, passwordBDD) => {
    return compareSync(password, passwordBDD);
}


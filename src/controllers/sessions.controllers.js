import { generateToken } from '../utils/jwt.js';

export const login = async (req, res) => {
    try {
        if (!req.user)
            return res.status(400).send({ status: "error", message: "Usuario o contraseña incorrecta" });

        //Sesion de BDD
        req.session.user = {
            _id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            gender: req.user.gender,
            rol: req.user.rol
        }

        //Retornar un token de JWT
        return res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send({ status: "success", message: "Usuario logueado correctamente" });

    } catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }

}

export const register = async (req, res) => {
    try {
        if (!req.user)
            return res.status(400).send({ status: "error", message: "Email y contraseña son obligatorios" });

        return res.status(201).send({ status: "success", message: "Usuario registrado correctamente" });
    }
    catch (error) {
        return res.status(500).send({ status: "error", message: error.message });
    }
}

export const githubLogin = (req, res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        }
        res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send({ status: "success", message: "Usuario logueado correctamente" });
    }
    catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
}
import passport from 'passport';
import local from 'passport-local';
import GithubStrategy from 'passport-github2';
import { validatePassword, hashPassword } from '../utils/bcrypt.js';
import userModel from '../models/users.models.js';
import jwt from 'passport-jwt';
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.jwtSecret;
const githubClientID = process.env.githubClientID;
const githubClientSecret = process.env.githubClientSecret;

const localStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req.cookies) {
        token = req.cookies['coderSession'];
    }
    return token;
}

const initializatePassword = () => {

    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, password, age, gender } = req.body;
            const newUser = await userModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashPassword(password),
                age: age,
                gender: gender
            })
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use('login', new localStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {

            const user = await userModel.findOne({ email: username });

            if (validatePassword(password, user?.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        } catch (error) {
            return done(error);
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            console.log(profile);

            let user = await userModel.findOne({ email: profile._json.email });

            if (!user) {
                user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ",
                    email: email,
                    password: hashPassword("coder"),
                    age: 18
                })
            }

            done(null, user);

        } catch (error) {
            done(error);
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: jwtSecret
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    })
}

export default initializatePassword;
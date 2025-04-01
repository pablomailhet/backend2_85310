import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from 'passport';
import initializatePassword from './config/passport.js';
import { create } from "express-handlebars";
import indexRouter from "./routes/index.routes.js";
import { connectDB, sessionStore } from "./config/db.js";

dotenv.config();

const PORT = 8080;

const handlebars = create();

const cookieSecret = process.env.cookieSecret;
const sessionSecret = process.env.sessionSecret;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(cookieSecret));

app.use(
    session({
        store: sessionStore,
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true,
    })
);

connectDB();

initializatePassword();

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("views", "src/views");
app.use(express.static("public"));

app.use("/", indexRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

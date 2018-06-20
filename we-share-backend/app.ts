import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Knex from 'knex';
import * as knexfile from './knexfile';

const knex = Knex(knexfile.development)

import UserRouter from './routers/userRouter';
import UserService from './services/userService';

import RandomRouter from './routers/randomRouter';
import RandomService from './services/randomService';

import ProfileRouter from './routers/profileRouter';
import ProfileService from './services/profileService';


import LoginRouter from './routers/loginRouter';
import LoginService from './services/loginService';
import PostFormService from './services/postFormService';
import PostFormRouter from './routers/postFormRouter';



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let postFormService = new PostFormService(knex);
let postFormRouter = new PostFormRouter(postFormService);

let loginService = new LoginService(knex);
let loginRouter = new  LoginRouter(loginService);

let userService = new UserService(knex);
let userRouter = new UserRouter(userService);

let randomService = new RandomService(knex);
let randomRouter = new RandomRouter(randomService);

let profileService = new ProfileService(knex);
let profileRouter = new ProfileRouter(profileService);



// need use `${process.env.REACT_APP_API_SERVER}/api/login` ???
app.use("/api/login", loginRouter.route());
app.use("/api/signup", userRouter.route());
app.use("/api/random", randomRouter.route());
app.use("/api/profile", profileRouter.route());
app.use("/api/post_form",postFormRouter.route());




app.listen(8000);








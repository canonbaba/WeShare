import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import knex from 'knex';


const router = require("./router")(express);

import UserRouter from './routers/userRouter';
import UserService from './services/userService';

import RandomRouter from './routers/randomRouter';
import RandomService from './services/randomService';

import ProfileRouter from './routers/profileRouter';
import ProfileService from './services/profileService';

import CreateContractRouter from './routers/createContractRouter';
import CreateContractService from './services/createContractService';



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", router);

let userService = new UserService(knex);
let userRouter = new UserRouter(userService);

let randomService = new RandomService(knex);
let randomRouter = new RandomRouter(randomService);

let profileService = new ProfileService(knex);
let profileRouter = new ProfileRouter(profileService);

let createContractService = new CreateContractService(knex);
let createContractRouter = new CreateContractRouter(createContractService);



app.use("/api/login", userRouter.route());
app.use("/api/random", randomRouter.route());
app.use("api/profile", profileRouter.route());
app.use("api/createContract",createContractRouter.route());



app.listen(8000); 








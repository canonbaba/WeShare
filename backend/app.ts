import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from './node_modules/cors';
import UserRouter from './routers/userRouter';
import UserService from './services/userService';
import * as knex from 'knex';

import InboxTableRouter from './routers/inboxTableRouter';
import InboxTableService from './services/inboxTableService';

import PostTableRouter from './routers/postTableRouter';
import PostTableService from './services/postTableService';

import RatingRouter from './routers/ratingRouter';
import RatingService from './services/ratingService';

import ProfileRouter from './routers/profileRouter';
import ProfileService from './services/profileService';

const router = require("./router")(express);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/", router);

app.use("/api/rating", RatingRouter.route());
app.use("api/postTable", PostTableRouter.route());
app.use("api/inboxTable", InboxTableRouter.route());

let ratingService = new RatingService (knex);
let ratingRouter = new RatingRouter (ratingService);
let postTableService = new PostTableService (knex);
let postTableRouter = new PostTableRouter (postTableService);
let inboxTableService = new InboxTableService (knex);
let inboxTableRouter = new InboxTableRouter (inboxTableService);
let profileService = new RatingService (knex);
let profileRouter = new ProfileRouter(profileService);


app.listen(8000);



// const teams = [];

// app.get('/teams', (req, res) => {
//   res.json(teams);
// });

// const handleTeamPost = (req: express.Request, res: express.Response) => {
//   const team = {
//     name: req.body.name,
//     color: req.body.color,
//     players: req.body.players,
//     id: Date.now()
//   };
//   teams.push(team);
//   res.json({id: team.id});
// };

// app.post('/teams', handleTeamPost);
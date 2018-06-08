import express from 'express'

export default class UserRouter {
  static userService: any;
    userService;

    constructor (userService) {
        this.userService = userService;
    }

    route() {
        let router = express.Router();
        // router.get("/", this.get.bind(this))
        router.post("/", this.post.bind(this))
        return router;
    }

    // get() {

    // }

    post(req, res) {
        return this.userService
        .login(req.body.name, req.body.email, req.body.password)
        .then(data => {
            console.log("data, data");
            res.json({data: data});
        })
        .catch(err => res.status(500).json(err));
    }

}
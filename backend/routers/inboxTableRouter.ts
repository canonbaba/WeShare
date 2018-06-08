import express from "express";

export default class InboxTableRouter {
    static route(): any {
        throw new Error("Mehtod not implemented.")
    }

    static inboxTableService: any;

    inboxTableService;

    constructor(inboxTableService) {
        this.inboxTableService = inboxTableService;
    }

    route() {
        let router = express.Router();
        router.post("/", this.post.bind(this));
        // router.post("/", this.postInbox.bind(this));
        return router;
    }

    post(req, res) {
        return this.inboxTableService
            .inbox(req.body, req.user)
            .then(data => {
                console.log("data", data);
                res.json({ data: data });
            })
            .catch(err => res.status(500).json(err));
    }

}
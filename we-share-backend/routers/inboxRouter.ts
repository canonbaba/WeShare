import * as express from "express";

class InboxRouter {
    inboxService: any;

  

  constructor(inboxService) {
    this.inboxService = inboxService;
  }

  route() {
    let router = express.Router();
    // router.post("/", this.post.bind(this));
    router.post("/visitor_join_home", this.visitorJoinRoom.bind(this));
    router.post("/save_message", this.saveMessage.bind(this));
    router.post("/onload_inboxlist", this.fatchInboxlist.bind(this));
    router.post("/select_inbox_room", this.selectInboxMessage.bind(this));
    return router;
  }


  // post(req,res){
  //     console.log(req.body)
  //     return this.inboxService
  //     .addMessages(req.body)
  //     .then(data => {
  //       res.json({ data: data });
  //     })
  //     .catch(err => res.status(500).json(err));
  // }

  visitorJoinRoom(req, res) {
    // console.log(req.body)
    return this.inboxService
      .joinRoom(req.body)
      .then(data => {
        // console.log(data)
        res.json(data );
      })
      .catch(err => res.status(500).json(err));
  }

  saveMessage(req, res) {
    // console.log(req.body)
    return this.inboxService
      .insertMessage(req.body)
      .then(data => {
        console.log(data)
        res.json(data );
      })
      .catch(err => res.status(500).json(err));
  }

  fatchInboxlist(req, res) {
    // console.log(req.body)
    return this.inboxService
      .getInboxList(req.body)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  selectInboxMessage(req, res) {
    // console.log(req.body)
    return this.inboxService
      .selectMessage(req.body)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

}

 
export default InboxRouter;
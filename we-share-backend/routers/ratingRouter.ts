import * as express from "express";

class RatingRouter {
  private ratingService: any;

  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));

    return router;
  }


  post(req,res){
      // console.log(req.body.userid, req.body.comment,req.body.trueClick)
    return this.ratingService
    .saverating(req.body)
    .then(data => {
      // console.log(data[0]);
      res.json(data);
    })
    .catch(err => {
      console.log("rating error", err);
      res.status(500).json(err);
    });

  }
}

 
export default RatingRouter;

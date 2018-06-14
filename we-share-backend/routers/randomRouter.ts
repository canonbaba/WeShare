import * as express from "express";

class RandomRouter {
   private randomService: any;

  constructor(randomService) {
    this.randomService = randomService;
  }

  route() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    return router;
  }



  get(req,res){
      return this.randomService
      .random(req.body)
      .then(arr => res.json(arr))
      .catch(err => res.status(500).json(err));
      
  }



  }

 
export default RandomRouter;



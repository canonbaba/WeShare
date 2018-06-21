import * as express from "express";

class HomeRouter {
  private homeService: any;

  constructor(homeService) {
    this.homeService = homeService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }

  post(req,res){
    return this.homeService
    .homedata()
    .then(data => {
        // console.log(data[0])
        res.json(data);
    })
    .catch(err => res.status(500).json(err));
    }
  }


 
export default HomeRouter;

import * as express from "express";

class HomeRouter {
  private homeService: any;

  constructor(homeService) {
    this.homeService = homeService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.post("/select_category_data", this.selectCategoryData.bind(this));
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

    selectCategoryData(req,res){
      console.log(req.body)
      return this.homeService
      .categorydata(req.body)
      .then(data => {
          // console.log(data)
          res.json(data);
      })
      .catch(err => res.status(500).json(err));
      }

  }

  


 
export default HomeRouter;

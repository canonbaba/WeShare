import * as express from "express";

class PostFormRouter {
  private postFormService: any;

  constructor(postFormService) {
    this.postFormService = postFormService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));

    return router;
  }


  post(req,res){
    // what's is photo???
    // console.log(req.body.productName, req.body.productPrice, req.body.productPricePercent, req.body.numberOfShareUser,req.body.productDescription, req.body.productCategory,req.body.userid, req.body.photo)
    return this.postFormService
    .savepost(req.body)
    .then(data => {
      // console.log(data)
      res.json({data: 'saved post'});
    })
    .catch(err => res.status(500).json(err));
  }
}

 
export default PostFormRouter;

// get(req, res) {
//     return this.resultService
//       .result(req.query.cities, req.query.typeOfActivities)
//       .then(arr => res.json(arr))
//       .catch(err => res.status(500).json(err));
//   }

//   post(req, res) {
//     console.log(req.user, req.body)
//     return this.resultService.save(req.user, req.body)
//       .then(data => {
//         console.log("data", data);
//         res.json({ data: data });
//       })
//       .catch(err => res.status(500).json(err));
//   }


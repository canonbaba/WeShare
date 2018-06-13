import express from "express";

class UserRouter {
  public userService: any;

    static route(): any {
        throw new Error("Method not implemented.");
    }
    
   static userService: any;

  constructor(userService) {
    this.userService = userService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.get("/", this.get.bind(this));
    return router;
  }


  post(req,res){
    return this.userService
    .signup(req.body)
    .then(data => {
      console.log("data", data);
      res.json({ data: data });
    })
    .catch(err => res.status(500).json(err));
  }

  get(req,res){
    return this.userService
    .login(req.body.name, req.body.email, req.body.password)
    .then(data => {
      console.log("data", data);
      res.json({ data: data });
    })
    .catch(err => res.status(500).json(err));
}

  }

 
export default UserRouter;

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


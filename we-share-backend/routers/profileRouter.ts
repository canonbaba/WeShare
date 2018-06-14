import * as express from "express";

class ProfileRouter {
    
    static route(): any {
        throw new Error("Method not implemented.");
    }
   static profileService: any;

   profileService;

  constructor(profileService) {
    this.profileService = profileService;
  }

  route() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.get("/", this.getPost.bind(this));
    return router;
  }

  get(req,res){
      return this.profileService
      .getUser(req.body.token)
      .then(arr => res.json(arr))
      .catch(err => res.status(500).json(err));
  }

  getPost(req,res){
        return this.profileService
        .extractPost(req.body.token)
        .then(arr => res.json(arr))
        .catch(err => res.status(500).json(err));
    }

  }

 
export default ProfileRouter;

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

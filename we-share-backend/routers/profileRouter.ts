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
    router.post("/", this.post.bind(this));
    router.post("/ratingdata", this.getProfileRating.bind(this));
    router.post("/contractdata", this.getProfileContract.bind(this));
    router.post("/contract_detail_data", this.getContractDetail.bind(this));
    return router;
  }

  post(req, res) {
    return this.profileService
      .profilePostdata(req.body)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }


  getProfileRating(req, res) {
    return this.profileService
      .profileRatingdata(req.body)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  getProfileContract(req, res) {
    // console.log(req.body)
    return this.profileService
      .profileContractData(req.body)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => { console.log("err", err); res.status(500).json(err) });
  }

  getContractDetail(req, res) {
    // console.log(req.body)
    return this.profileService
      .getDetailContractData(req.body)
      .then(data => {
        console.log(data)
        res.json(data);
      })
      .catch(err => { console.log("err", err); res.status(500).json(err) });
  }


}


export default ProfileRouter;

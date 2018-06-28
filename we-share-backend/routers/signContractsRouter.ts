import * as express from "express";

class SignContractsRouter {

    
    static route(): any {
        throw new Error("Method not implemented.");
    }
   static signContractsService: any;

   signContractsService;

  constructor(signContractsService) {
    this.signContractsService = signContractsService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    router.post("/sign",this.postSign.bind(this));
   
    return router;
  }

  post(req,res){
    console.log(req.body)
    return this.signContractsService
    .getContracts(req.body)
    .then(data => {
        // console.log(data)
        res.json(data);
    })
    .catch(err => {
        console.log("err", err);
        res.status(500).json(err)
    });
    }

    postSign(req,res){
        console.log(req.body)
        return this.signContractsService
        .postSignData(req.body)
        .then(data => {
            // console.log(data)
            res.json(data);
        })
        .catch(err => {
            console.log("err", err);
            res.status(500).json(err)
        });
        }
}

export default SignContractsRouter;
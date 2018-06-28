import * as express from "express";

class CreateContractRouter {

  
    createContractService: any;
    static route(): any {
        throw new Error("Method not implemented.");
    }
    
   static createContractService: any;

  constructor(createContractService) {
    this.createContractService = createContractService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }



  post(req,res){
      console.log(req.body)
      return this.createContractService
      .createContract(req.body)
      .then(data => {
        res.json({ data: data });
      })
      .catch(err => {console.log("err", err); res.status(500).json(err)});
  }

  }

 
export default CreateContractRouter;


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
      return this.createContractService
      .createContract(req.body)
      .then(data => {
        console.log("data", data);
        res.json({ data: data });
      })
      .catch(err => res.status(500).json(err));
  }

  }

 
export default CreateContractRouter;
import * as express from "express";

class LoginRouter {
  private loginService: any;

  constructor(loginService) {
    this.loginService = loginService;
  }

  route() {
    let router = express.Router();
    router.post("/", this.post.bind(this));
    return router;
  }


  post(req,res){
    return this.loginService
    .login(req.body.email, req.body.password)
    .then(data => {
      console.log(data);
      if (data !== null){ 
        res.json({isdataempty: true});
      } else {
        res.json({isdataempty: false});
      }
    })
    .catch(err => res.status(500).json(err));
    }
  }


 
export default LoginRouter;

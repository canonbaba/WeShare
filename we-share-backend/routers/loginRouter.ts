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
    // console.log(req.body.email, req.body.password )
    return this.loginService
    .login({email: req.body.email, password: req.body.password})
    .then(data => {
        console.log(data)
        res.json({data});
      // if (data.length > 0){ 
      //   res.json({data: true});
      // } else {
      //   res.json({data: false});
      // }
    })
    .catch(err => res.status(500).json(err));
    }
  }


 
export default LoginRouter;

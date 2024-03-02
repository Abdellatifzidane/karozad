
import UserModel from "../models/userModel.js";

class UserController {

  static getLoginForm(req,res) {
      res.render('login.ejs');
  }

  static login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    UserModel.findByUsername(username, (user) => {
      if (!user || user.password !== password) {
        const canLogin = false
        res.render('login.ejs',{canLogin});
      } else {
        req.session.user = user;
        res.redirect('/')
      }
    });
  }

  static logout(req,res){
    req.session.destroy(err => {
      if (err) {
          console.error('Error destroying session:', err);
          res.sendStatus(500);
      } else {
          res.redirect('/users/login'); 
      }
  });
  }
}

export default UserController;

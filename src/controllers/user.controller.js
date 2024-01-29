import UserModel from "../models/user.model.js";

export default class UserController{
    getRegister(req, res){
        res.render('register');
    }
    getLogin(req, res){
        res.render('login',{errorMessage : null});
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login',{errorMessage : null});
    }
    postLogin(req, res){
        const {email, password} = req.body;
        var result = UserModel.find(email,password);
        if(result)
            res.redirect('/');
        else
            res.render('login',{errorMessage : "Credentials Invalid"});
    }
}
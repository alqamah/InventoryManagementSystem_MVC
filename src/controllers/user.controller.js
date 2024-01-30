import UserModel from "../models/user.model.js";
import session from "express-session";

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
        if(!result)
            return res.render('login',{errorMessage : "Credentials Invalid"});
        req.session.userEmail = email;
        res.redirect('/');
    }
    getLogout(req, res){
        req.session.destroy((err)=>{
            if(err)
                console.log(err);
            else
                res.redirect('/');
        })
    }
}
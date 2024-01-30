
export const auth = (req, res, next) => {
    //to verify if the req.session has the email ID assigned during UserLogin process.
    if(req.session.userEmail){//if true, call next middleware
        next();
    }else{
        res.redirect('/login');//else redirect to login page
    }
}
//add this middleware to the routes that need to be secured
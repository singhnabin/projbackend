const express= require('express');
const { check,validationResult } = require('express-validator');
const router= express.Router();

const {signout, signup, signin, isSignedIn}=require('../controllers/auth');



router.post("/signup", 
[
    check("name","name should be of at least of 3 char").isLength({min:3}),
    check("email", "email is required").isEmail(),
    check("password", "password should be of at least of 5 char").isLength({ min: 5})
    
],
signup);

router.post("/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required!!").isLength({ min: 1 })

    ],
    signin);

router.get("/signout", signout);



module.exports= router;
import {body, validationResult} from 'express-validator'; //imports the body of request

const validateRequest = async (req, res, next) =>{
   //Step 1. Setup rules for validation
  const rules = [
    body('name').notEmpty().withMessage('Name must be at least 5 characters long'),
    //if (cond = true): continue; else: err_message
    body('price').isFloat({min:1}).withMessage('Price must be a positive value'),
    //('imageUrl').isURL().withMessage('URL is invalid'); //fileUpload instead of URL
    //Creating a custom validation rule
    body('imageUrl').custom((value, {req})=>{
      if(!req.file)
        throw new Error ("Image is required");
      else
        return true;
    }),
  ]

  await Promise.all(
    rules.map(rule => rule.run(req))
  )

  
  //Step 3. Get the validation errors
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('new-product', {
      errorMessage: errors.array()[0].msg
    });
  }
  next();
}

export default validateRequest;
//To use export default: Hoisted declaration; Class; Assignment declaration
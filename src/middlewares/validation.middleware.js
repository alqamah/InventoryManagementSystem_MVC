import {body, validationResult} from 'express-validator'; //imports the body of request

const validateRequest = async (req, res, next) =>{
   //Step 1. Setup rules for validation
  const rules = [
    body('name').notEmpty().withMessage('Name must be at least 5 characters long'),
    //if (cond = true): continue; else: err_message
    body('price').isFloat({min:1}).withMessage('Price must be a positive value'),
    body('imageUrl').isURL().withMessage('URL is invalid')
  ];

  //Step 2. Run the rules
  /**
   * Runs validation rules asynchronously using Promise.all.
   * Maps array of rules to array of promises from rule.run(), 
   * awaits all promises to complete, 
  */
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
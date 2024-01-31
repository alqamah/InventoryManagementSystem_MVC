// Export a middleware function called setLastVisit
export const setLastVisit = (req, res, next) => {
    
    // 1. Check if the 'lastVisit' cookie exists on the request
    if (req.cookies.lastVisit) {
        
        // If it exists, set a local variable 'lastVisit' on the response 
        // object to the parsed cookie date
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
        
    } 
    
    // If the cookie doesn't exist:
    
    // 2. Set a new 'lastVisit' cookie on the response
    // - 'name' is the cookie name 
    // - 'value' is the current date string
    // - 'options' is an object with the cookie settings:
    //   - maxAge is the lifetime in ms 
    //   - other options like signed, path, etc
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days in ms
    });
    
    // 3. Call next() to move to next middleware
    next();
}

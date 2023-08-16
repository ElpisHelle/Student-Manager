// Middleware to check if the user is authenticated - make it a module to be called in the routes
function isAuthenticated(req, res, next) {
    if(req.path === '/login' || req.session.userId) {
      console.log(`logged in, userId: ${req.session.userId}}`);
      next();
    } else {
      console.log('Redirecting to /login');
      res.redirect('/login');
    }
}  

module.exports = {
    isAuthenticated
}
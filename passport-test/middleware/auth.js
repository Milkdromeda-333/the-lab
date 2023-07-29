module.exports = {
    userIsAuthenticated: (req, res, next) => {
        // if user is authenticated carry on, reroute to login screen
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated());
            return next();
        }

        res.redirect('/login');
    },
    isNotAuthenticated: (req, res, next) => {
        // if user is not authenticated, carry on, otherwise let them into the route
        // main use is so that authenticated users cant go to login or register page
        console.log(req);
        if (req.isAuthenticated()) {
            console.log('user is authenticated');

            return res.redirect('/');
        }
        console.log(req.isAuthenticated());

        console.log('user is not authenticated');

        next();
    }
};
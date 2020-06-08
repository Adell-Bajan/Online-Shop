const authModel = require('../models/auth.model');

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        isUser: false,
        isAdmin: false,
        pageTitle: 'Signup'
    });
    // , {
    //     authError: req.flash("authError")[0]
    // });

};

exports.postSignup = (req, res, next) => {
    const { username, email, password, confirmpassword } = req.body;
    let errors = [];
    if (!username) {
        errors.push({ msg: 'Username must have a value' });
    }
    if (!email) {
        errors.push({ msg: 'Email must have a value' });
    }
    if (!password) {
        errors.push({ msg: 'Password must have a value' });
    }
    if (!confirmpassword) {
        errors.push({ msg: 'Confirm Password must have a value' });
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }
    if (password !== confirmpassword) {
        errors.push({ msg: 'Password do not match' });
    }
    if (errors.length > 0) {
        res.render('signup', {
            errors,
            username,
            email,
            password,
            confirmpassword
        });
    }
    authModel
        .createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => res.redirect('/login'))
        .catch(err => {
            res.redirect('/signup')
        });
};

exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash("authError")[0],
        isUser: false,
        isAdmin: false,
        pageTitle: 'Login'
    });
};


exports.postLogin = (req, res, next) => {

    authModel
        .login(req.body.email, req.body.password)
        .then(result => {
            req.session.userId = result.id;
            req.session.isAdmin = result.isAdmin
            res.redirect('/');
        })
        .catch(err => {
            req.flash('authError', err);
            console.log(err)
            res.redirect('/login');
        });
};




// Export Logout
exports.logout = function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
};
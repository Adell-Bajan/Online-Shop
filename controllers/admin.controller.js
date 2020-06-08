const productsModel = require('../models/products.model');


exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        isUser: true,
        isAdmin: true,
        pageTitle: ' Add-Product'
    });
};


exports.postAdd = (req, res, next) => {
    const image = req.body;
    // let errors = [];
    // if (!image) {
    //     // errors.push({ msg: 'Please fill in image fields' });
    //     console.log("Please fill in image fields")
    // }
    // if (errors.length > 0) {
    //     res.render('add-product', {
    //         errors,
    //         image
    //     })
    //     console.log("Please fill in image fields")
    // }
    // if (!errors) {
    req.body.image = req.file.filename;
    productsModel.addNewProduct(req.body)
        .then(() => {
            req.flash('added', true);
            res.redirect('/admin/add')
        })
        // .catch(err => {
        //     next(err)
        // });
        // } else {
        //     req.flash('error_msg', 'Please Enter Image')
        //     res.redirect('/admin/add');
        // }

};
const productModel = require('../models/products.model')

exports.getProduct = (req, res, next) => {
    productModel.getFirstProduct().then(product => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            // pageTitle: 'Product'

        });
    })
}



exports.getProductById = (req, res, next) => {
    let id = req.params.id
    productModel.getProductById(id).then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product'

        });
    });
};
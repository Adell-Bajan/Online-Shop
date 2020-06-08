const cartModel = require('../models/cart.model');
const flsh = require('connect-flash');

exports.getCart = (req, res, next) => {
    cartModel.getItemByUser(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Home',
        })
    }).catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const { amount } = req.body;
    let errors = [];
    if (!amount) {
        errors.push({ msg: 'Amount is required' });
    }
    if (amount.length < 0) {
        errors.push({ msg: 'Amount is Number' });
        console.log('fosadadsa')
    }
    if (errors.length > 0) {
        res.render('index', {
            errors,
            amount
        });
    }
    cartModel
        .addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestemp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
        });
    if (errors) {
        req.flash('success_msg', 'amount add to cart');
        res.redirect(req.body.redirectTO)
    }
}


exports.postSave = (req, res, next) => {
    let errors = [];
    if (errors) {
        res.redirect('/cart')
    } else {
        cartModel.editItem(req.body.cartId, {
                amount: req.body.amount,
                timestemp: Date.now()
            }).then(() => res.redirect('/cart'))
            .catch(err => console.log(err));
    }
}



exports.postDelete = (req, res, next) => {
    cartModel
        .deleteItem(req.body.cartId)
        .then(() => res.redirect('/cart'))
        .catch(err => console.log(err));
}
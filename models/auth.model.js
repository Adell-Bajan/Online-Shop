const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const DB_URL = 'mongodb+srv://AdellTeam:Adell5594@cluster0-fbpua.mongodb.net/online-shop?retryWrites=true&w=majority';


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);



exports.createNewUser = (username, email, password) => {
    // check if email exists
    // yes ===> error
    // no ===> create new account
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email });
            })
            .then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject("email is used");
                } else {
                    return bcrypt.hash(password, 10)
                }
            }).then(hashedPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                return user.save()
            }).then(() => {
                mongoose.disconnect()
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
};

// Login
exports.login = (email, password) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => User.findOne({ email: email })).then(user => {
            if (!user) {
                mongoose.disconnect()
                reject('there is on user matches this email')
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect();
                        reject('password is incorrect')
                    } else {
                        mongoose.disconnect();
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        });
                    }
                });
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    });
};









// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
// });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://AdellTeam:Adell5594@cluster0-fbpua.mongodb.net/online-shop?retryWrites=true&w=majority');
let db = mongoose.connection;


// Check conection
db.once('open', function() {
    console.log('Mongodb Conecting Succeeded.');
})


// Check for DB errors
db.on('error', function(err) {
    console.log(err);
})
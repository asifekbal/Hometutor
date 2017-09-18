var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    emailId: {
        type: String,
        index: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    qualification: {
        type: String,
    },
    dateofbirth: {
        type: String,
    },
    sex: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    postal: {
        type: String,
    },
    country: {
        type: String,
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmailId = function(emailId, callback) {
    var query = {
        emailId: emailId
    };
    User.findOne(query, callback);
}
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.comparePassword = function(enteredPassword, hash, callback) {
    bcrypt.compare(enteredPassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

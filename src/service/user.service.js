const User = require('../model/index').User;

exports.insertUser = async (user) => {
    console.log(user);
    return await User.create(user);
}

exports.findUserByUsernameAndPassword = async (user) => {
    console.log(user);
    return await User.findOne({
        where: {
            username: user.username
        }
    });
}

exports.findUserByEmailId = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    });
}

exports.findUserByUsername = async (username) => {
    return await User.findOne({
        where: {
            username: username
        }
    });
}
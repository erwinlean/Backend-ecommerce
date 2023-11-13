"use strict";

const mongoose = require('mongoose');
const encrypt = require('bcrypt');
const errMessage = require('../errors/error-handler');
const fs = require('fs');
const path = require('path');

// Define the path to the default image
const defaultImagePath = path.join(__dirname, '..', 'assets', 'users', 'default.png');
// Read the default image file and convert it to a Base64 URI
const defaultImageBase64 = fs.readFileSync(defaultImagePath, 'base64');
const defaultImageURI = `data:image/png;base64,${defaultImageBase64}`

const users = mongoose.Schema({
    name: {
        type: String,
        min: 4,
        required: [true, errMessage.general.campo_obligatorio.minLegth]
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: [true, errMessage.general.campo_obligatorio],
        unique: true
    },
    password: {
        type: String,
        required: [true, errMessage.general.campo_obligatorio],
        min: 7,
    },
    userImg: {
        type: String,
        default: defaultImageURI,
    },
    userRole: {
        type: String,
        required: [true, errMessage.general.campo_obligatorio],
        enum: ["user", "admin"],
        default: "user"
    }
});

// Hash and password validation+email
users.pre('save', function (next) {
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(this.password)) {
        return next(new Error('El password debe contener al menos una letra y un número.'));
    } else {
        this.password = encrypt.hashSync(this.password, 12);
        next();
    }

    let emailCheck = users.email;

    if (this.email) {
        emailCheck.includes('@' && '.' && String);
    } else {
        return next(new Error('El mail no contiene @ y/o . necesarios.'));
    }

    next();
});

module.exports = mongoose.model('users', users);
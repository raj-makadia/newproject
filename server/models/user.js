const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({

    username:String,
    email:String,
    password:String,
    comment:String,
})

module.exports = mongoose.model('user',userSchema,'users');
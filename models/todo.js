const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    text: String,
    done: {type:String,default:0}
});
module.exports = mongoose.model('Todo', schema);
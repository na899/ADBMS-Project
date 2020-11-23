const mongoose = require('mongoose');

let userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            default: "" 
        },
        password: {
            type: String,
            required: true,
            min: 8,
            max: 32,
        },
        name: { 
            type: String, 
            default: "" 
        },
        email: {
            type: String,
            lowercase: true,
            unique:true,
        },
        profilePhoto: {
            type: String,
            default:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkQeaUoawZR3nca9VClt8XQO38BxMqdRVOsfgzjYaLgzbJxjh"
        },        
        session: {
            type: String,
            default: null,
        }
    }
)

module.exports = mongoose.model('User', userSchema);

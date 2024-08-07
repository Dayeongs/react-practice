const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스 제거
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

// pre() : user Model에 user 정보를 저장하기 전에 해야하는 작업
userSchema.pre('save', function( next ) {
    var user = this;  
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
                
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })  
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, callbackFunction) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return callbackFunction(err)
        callbackFunction(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')   // user._id + 'secretToken' = token

    user.token = token
    user.save()
        .then(() => { cb(null, user) })
        .catch((err) => { return cb(err); })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰을 decode 한다. (user._id + '' = token)
    jwt.verify(token, 'secretToken', function(err, decoded) {

        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인한다.
        user.findOne({ "_id": decoded, "token": token })
            .then((user) => { cb(null, user) })
            .catch((err) => { return cb(err) })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }
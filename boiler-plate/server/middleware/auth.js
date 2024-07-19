const { User } = require("../models/User");

let auth = (req, res, next) => {

    // 인증 처리를 하는 곳

    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화 한 후 유저를 찾는다. 유저가 있으면 인증 완료, 유저가 없으면 인증 실패
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true })
        
        // req에 token과 user를 넣어줌으로써 사용가능하게 한다.
        req.token = token;
        req.user = user;

        // middleware 작업이 끝난 후 다음 작업을 진행하기 위해 next()를 적어야 한다.
        next();
    })

}

module.exports = { auth };
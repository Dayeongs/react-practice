// 임포트 순서 : express -> body-parser (*중요)
const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000

const config = require('./server/config/key');

const { auth } = require('./server/middleware/auth');
const { User } = require('./server/models/User');

const mongoose = require('mongoose')
// MongoParseError: option usefindandmodify is not supported 에러 발생
// mongoose 6버전 이상에서 useNewUrlParser, useUnifiedTopology, useFindAndModify, useCreateIndex를 지원하지 않는다.
mongoose
    .connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Express 애플리케이션 객체를 생성한 후, 이 객체를 통해 app.use()를 통해 라우팅 설정, 미들웨어 추가, 서버 시작 등의 작업을 수행할 수 있다. 
// body-parser 미들웨어 추가
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded, URL-encoded 형식의 데이터 파싱'
app.use(express.json()); // application/json, JSON 형식의 데이터 파싱
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World! 안녕하세용 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'));

app.post('/api/users/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const userInfo = await user.save();
        res.status(200).json({ success: true, userInfo });
    } catch (err) {
        res.json({ success: false, err });
    }
});

app.post('/api/users/login', (req, res) => {
    // 1. 요청된 이메일을 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }

            // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지 확인한다.
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

                // 3. 비밀번호가 맞다면 토큰을 생성한다.
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);

                    // 토큰을 저장한다.어디에? 쿠키, 로컬스토리지 등
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
                })
            })
        })
        .catch((err) => {
            return res.status(400).send(err);
        })
})

app.get('/api/users/auth', auth, (req, res) => {

    // 여기까지 미들웨어를 통과했다는 것은 Authentication이 True라는 말이다.
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        token: req.token
    })

})

// async/await를 이용한 예
app.get('/api/users/logout', auth, async (req, res) => {
    // User model에서 id를 찾고 token을 지워줌
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
        return res.status(200).send({ success: true });
    } catch (err) {
        return res.status(400).send({ success: false, err });
    }
});

// app.get('/api/users/logout', auth, (req, res) => {
//     User.findOneAndUpdate({ _id: req.user._id }, { token: '' })
//         .then(() => {return res.status(200).send({ success: true }) })
//         .catch((err) => { return res.json({ success: false, err }) })
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
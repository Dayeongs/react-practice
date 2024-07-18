// 임포트 순서 : express -> body-parser (*중요)
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 5000

const config = require('./config/key');

const { User } = require('./models/User');

const mongoose = require('mongoose')
// MongoParseError: option usefindandmodify is not supported 에러 발생
// mongoose 6버전 이상에서 useNewUrlParser, useUnifiedTopology, useFindAndModify, useCreateIndex를 지원하지 않는다.
mongoose
    .connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

// Express 애플리케이션 객체를 생성한 후, 이 객체를 통해 app.use()를 통해 라우팅 설정, 미들웨어 추가, 서버 시작 등의 작업을 수행할 수 있다. 
// body-parser 미들웨어 추가
app.use(express.json()); // application/json, JSON 형식의 데이터 파싱
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded, URL-encoded 형식의 데이터 파싱

app.get('/', (req, res) => res.send('Hello World! 안녕하세용 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'));

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        const userInfo = await user.save();
        res.status(200).json({ success: true, userInfo });
    } catch (err) {
        res.json({ success: false, err });
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
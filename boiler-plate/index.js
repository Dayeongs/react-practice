const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const uri = "mongodb+srv://dayeong:zxcv1234@boilerplate.jw8priu.mongodb.net/?retryWrites=true&w=majority&appName=boilerplate"
// MongoParseError: option usefindandmodify is not supported 에러 발생
// mongoose 6버전 이상에서 useNewUrlParser, useUnifiedTopology, useFindAndModify, useCreateIndex를 지원하지 않는다.
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕하세용'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
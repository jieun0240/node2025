// Express 모듈 불러오기
const express = require('express');
const swagRouter = require('./routes/swag')

// Express 애플리케이션 생성
const app = express();
const port = 2007;

app.use(express.json())
app.use('/swag', swagRouter)


// 서버 실행 (2007번 포트에서 요청을 받음)
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/swag 에서 실행 중입니다.`);
});
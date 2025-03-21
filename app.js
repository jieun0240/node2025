// Express 모듈 불러오기
const express = require('express');

// Express 애플리케이션 생성
const app = express();
const port = 2007;

// 기본 라우트 설정
app.get('/swag', (req, res) => {
  res.send('get swag');
});

app.post('/swag', (req, res) => {
  res.send('post swag');
});


// 서버 실행 (2007번 포트에서 요청을 받음)
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}/swag 에서 실행 중입니다.`);
});
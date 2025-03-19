// Express 모듈 불러오기
const express = require('express');

// Express 애플리케이션 생성
const app = express();

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 실행 (3000번 포트에서 요청을 받음)
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
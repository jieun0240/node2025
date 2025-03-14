// http 모듈을 불러옵니다.
const http = require('http');

// 서버 생성 (함수 안에 호출되는 함수 = 콜백 함수(내부 함수))
const server = http.createServer((req, res) => {
  // 응답 헤더 설정
  // 200번대가 성공..? 그리고 'text/plain' 이거는 그냥 text로면 구성되어있음을 나타냄
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // 클라이언트에게 메시지 응답
  res.end('Hello, World!');
});

// 서버가 3000번 포트에서 요청을 받을 수 있도록 설정
server.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
// locallhost(127.0.0.1) -> Domain Name Service -> 우리가 아는 그 링크로
// DNS는 도메인 이름을 실제 인터넷에서 사용 가능한 IP 주소로 변환해주는 시스템임.


// Express 모듈 불러오기
const express = require('express');

// Express 애플리케이션 생성
const app = express();

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});

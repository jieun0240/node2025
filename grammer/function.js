// function 함수(매개변수) {
//   console.log('함수' + 매개변수)
// }

// 함수('호출')

// // arrow function1
// 익명함수 = (매개변수) => {
//   console.log('익명함수' + 매개변수);
// }
// // arrow function2 // 매개변수 하나일 때 사용
// 익명함수 = 매개변수 => {
//   console.log('익명함수' + 매개변수);
// }
// // arrow function3 // 한줄이거나 리턴
// 익명함수 = 매개변수 => console.log('익명함수' + 매개변수);

// 익명함수('swag')

const fruits = ['apple', 'banana', 'orange'];

for(let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

fruits.forEach(l =>console.log(l));

for(const l of fruits) {
  console.log(l);
}
//타입 변환

//숫자로
//(string->double 1.) Number의 생성자 사용
const numStr='33.3';
const num=Number(numStr); //Number 객체를 사용하지만, Number 객체의 인스턴스가 아니라 숫자 값을 만들어냄
const no_num=Number('hi'); //못만들면 NaN을 반환(숫자 아님!이란 의미)
console.log(num,no_num); //33.3, NaN
//(string->double 2.) parseInt, parseFloat 사용
const a=parseInt('16 volts',10); //두번째 인수는 몇진수 표현인지를 지정. 숫자인 부분까지만 변환하고 그 외는 무시
const b=parseInt('3a',16);
const c=parseFloat('15.5kph'); //parseFloat는 항상 10진수 표현으로 가정하고만 받음
console.log(a,b,c); // 16, 58, 15.5
//(date->double) Date.valueOf() 메서드 사용(유닉스 타임-1970/1/1 자정 이후 지난 누적 밀리초-으로 변환)
const d=new Date();
const ts=d.valueOf();
console.log(d,ts); //2019-01-09T21:30:33.119Z 1547069433119
//(boolean->double) 조건연산자 사용
const e=true;
const f=e?1:0;
console.log(e,f); //true 1



//문자열로
//(double->string 1.)그냥 +로 병합
//(double->string 2.)String.toString() 사용
const g=33.5;
const h=g.toString();
console.log(g+'',h); //"33.5" "33.5"
//참고: 배열에도 쓸 수있음
const arr=[1,true,'hello'];
console.log(arr.toString()) //"1,true,hello"



//불리언으로
//! 이용. 참같은 값은 false로, 거짓값은 값은 true로 바뀜. 이후 !를 한번 더 적용해 반전가능
//자세히는 5장 참고
const i=0; //falsy(거짓같은값..)임
const j=!i;
const k=!!i;
console.log(j,k); //true false

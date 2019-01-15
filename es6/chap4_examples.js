//for
//피보나치
for (let temp,i=0,j=1; j<30; temp=i,i=j,j=temp+i)
	console.log(j);

//바깥 변수로 제어
let s='3';
for(; s.length<10; s=' '+s); //밑에 statement가 없으면 ;을 달아줘야 한다.

for(let x=0.2;x<3.0;x+=0.2){
	console.log(x);
}

//for...in : 객체(오직 객체) 프로퍼티 순회
const player={name: 'Thomas', rank:'Midshipman', age:25};
for (let prop in player){
	if(!player.hasOwnProperty(prop)) continue;
	console.log(prop+': '+player[prop]);
}
//in은 객체의 key(만)를 가져온다. 아래는 출력
// name: Thomas
// rank: Midshipman
// age: 25

//for...of : iterable 순회 (파이썬 for..in..과 가장 비슷)
const hand=['diamond','diamond','club'];
for(let face of hand){
	console.log(face);
}
// diamond
// diamond
// club


//chap13.5 IIFE와 비동기적 코드

//setTimeout 내장함수
setTimeout(function(){console.log('hello');},1500); //1500ms 기다린후 앞 함수인수 실행

//try1: countdown
var i;
for(i=5; i>=0; i--){
	setTimeout(function(){console.log(i===0 ? 'go!' : i);}, (5-i)*1000);
}
//이렇게 만들면 안됨. for문이 먼저 6번 돌아버리고 i=-1인 채로 setTimeout의 함수가 실행되기 때문

//try2: countdown
//해결책: 중간에 스코프를 하나 더 만들자 (함수에 숫자를 넘기면 값으로 전달되므로)
function loopBody(j){
	setTimeout(function(){
		console.log(j===0 ? 'go!' : j);
	}, (5-j)*1000);
}
var j;
for (j=5; j>=0; j--){
	loopBody(j);
}
//

//try3: countdown
//한번 쓰고 말 루프라면? 익즉시실행되는 익명함수(IIFE)를 이용하자
var k;
for(k=5; k>=0; k--){
	(function(k){
		setTimeout(function(){
			console.log(k===0 ? 'go!' : k);
		}, (5-k)*1000);
	})(k);
}

//try4: countdown
//for문에 전역스코프 변수가 아니라 블록스코프 변수를 쓰자. 매우 간단히 해결된다
for(let l=5; l>=0; l--){ //<-var를 쓰거나 하면 안 됨(끌어올려지므로). l을 전역에 let으로 설정해도 안 됨.
	setTimeout(function(){console.log(l===0 ? 'go!' : l);}, (5-l)*1000);
}

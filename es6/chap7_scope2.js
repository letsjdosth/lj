//var
//1. var와 변수 호이스팅(hoisting)
//let(es6): 해당 변수 선언 전에는 존재하지 않음
//var(기존): 현재 스코프 안이라면 어디서든 사용할 수 있음 (심지어 선언하기 전에도!!! 정의가 끌어올려짐.)
//함수/전역스코프 전체를 살펴보고, var로 선언한 변수를 '선언만'(할당은x) 맨 위로 끌어올림. 이를 '호이스팅(hoisting)'이라고 함
//예1
console.log(y); //undefined <-3도 아니고 undefined이다! var y;까지만 끌어올려지기 때문. 때문에 암시적으로 undefined가 들어간다.
//console.log(x); //ReferenceError: x is not defined <-존재하지 않는다.
let x=3;
var y=3;
console.log(y); //3 <-9번째줄에서 값이 할당되었기 때문에 이제 해당 값을 출력한다.
console.log(x); //3 <-let은 선언과 함께 존재하기 시작한다.
//예2
if (xx!==3){ //이시점에서 xx는 undefined이다.
	console.log(yy); //undefined
	var yy=5; //이제 yy는 5이다
	if (yy===5){ //true
		var xx=3; //이제 xx는 3이다.
	}
	console.log(yy); //5
}
if (xx===3){ //true
	console.log(yy); //5
}
//주의: es6 이전에는 변수선언이 var밖에 없었기 때문에, typeof 연산자는 해당 변수가 해당 스코프에 선언되었는지 확인하는 '안전한' 방법이었음. 즉
if(typeof ho==='undefined'){
	console.log("'ho' doesn't exist or is undefined");
}else{
	console.log(ho);
}
var ho='hi';
//와 같은 방식은, 언제나 에러가 안 났음.
//하지만, es6에서 let이 생겼고 let은 끌어올려지지 않기 때문에, 해당 방식으로 스코프 전체를 확인하다간 에러가 나는 경우가 생긴다.
//
// if(typeof not_ho==='undefined'){ //ReferenceError: not_ho is not defined <-not_ho는 (위로 끌어올려지지 않아) 선언도 안되었으므로, 여기에서 곧바로 에러난다
// 	console.log("'not_ho' doesn't exist or is undefined");
// }else{
// 	console.log(not_ho);
// }
// let not_ho='hello';
//
//하지만 es6에서 let으로 하면, typeof를 변수 정의 확인을 할 이유가 없음. 그냥 let을 쓰자. (기존 js 표준 코드에서 es6으로 포팅시만 주의)

//2. var로 이름이 같은 변수 선언시 동작
//var는 스코프에 같은이름이 이미 있을 시, 새 선언임을 '무시'. 그냥 기존 스코프의 변수의 값/참조를 바꿔버린다.
var xxx=3;
if(xxx===3){
	var xxx=2; //<-새 선언처럼 보이지만 아니다! var는 무시되고 그냥 전역변수 xxx를 가져온 후 해당 값을 2로 바꾼다. 즉, xxx=2; 로 치환된다.
	console.log(xxx); //2
}
console.log(xxx); //2 <-!!!!!

//위의 1/2는 js의 변수가 다른언어의 변수와 매우 다르게 작동하는 모습을 보여줌. 다른언어 변수 스코프와 비슷하게 쓰고 싶으면, let을 쓸 것. (es6 이전에서는..대책x)



//함수 호이스팅
//함수선언도 끌어올려짐. 때문에 선언 전 호출 가능.
//
f(); //f <-기본적인 방식(function 명령을 맨 앞에 쓰는 방식)으로 선언된 함수는 함수선언뿐 아니라 정의(내용)까지 통째로 끌어올려진다.
function f(){
	console.log('f');
}
//단, 변수에 할당한 함수 표현식은 끌어올려지지 않음. 변수의 스코프 규칙을 따르게 됨.
//ff(); //ReferenceError: ff is not defined <-let 규칙대로 선언 이전엔 존재하진 않는다
let ff=function(){
	console.log('ff');
};
//fff(); //TypeError: fff is not a function <- var 규칙대로, 선언만 끌어올려지고 할당이 안 끌어올려져서, 이런 에러가 난다.
console.log(fff); //undefined
var fff=function(){
	console.log('fff');
};
ff(); //ff
fff(); //fff



//암시적 전역변수(impolicit global)와 strict mode
//es5에서는, var로 변수를 선언하는 것을 잊으면, js 인터프리터는 사용자가 전역 변수를 참조하려 한다고 간주하고, 
//해당 이름이 전역변수로 선언되어있는지 찾은 후, 존재하지 않으면 '스스로 만들었음'
//<-수많은 버그의 원인이 됨
//이를 막기 위해 strict mode를 도입함. 암시적 전역변수를 허용하지 않음.
//'use strict'; <-라는 문자열을 스코프 첫 한 행에 쓰면, 해당 스코프는 스트릭트 모드로 동작. 각 함수스코프 혹은 전역스코프에 적용가능
//스트릭트모드가 적용되기 이전 코드가 많으므로, 전역에서는 사용하지 않는것이 좋음.
//하지만, 함수마다 일일히 이를 명시하는것도 짜증남 -> 코드 전체를 warpper 함수에 넣고, 그 wrapper에 적용하는 등의 꼼수 가능
//예: IIFE 이용
(function(){
	'use strict';
	//이 블록 안에 전체 코드를 집어넣자
})();
//권장: 새로 짜는 코드는 strict mode에서 돌아가게 짤 것
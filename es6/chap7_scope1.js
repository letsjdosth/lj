//정적 스코프
//정의될 때 접근할 수 있는 식별자에는 계속 접근할 수 있지만, 호출할 때만 있는 식별자에는 접근할 수 없음.
//전역(global)/블록(block)/함수(function)에 적용
const x=3;
function f(){
	console.log(x);
	console.log(y);
}
{
	//새 블록: 새 블록 스코프
	const y=5;
	//f(); //ReferenceError: y is not defined
}

//스코프는 계층적
//전역스코프는 가장 아래에 깔려있는 스코프이며 (가려지지 않았다면) 모든 스코프에서 보임.
//자기 스코프보다 더 아래에서 선언된 변수들은 (가려지지 않았다면) 모두 다 보임. (아래 중첩 블록 스코프 예 2가지를 확인할 것)

//전역스코프에 의존하는 함수를 만들지 말 것. 전역변수 값이 달라짐에 따라 동작이 달라질 위험
//문제적인 예
let name='Irena';
let age=25;
function greet(){
	console.log(`Hello, ${name}!`);
}
function getBirthYear(){
	return new Date().getFullYear()-age;
}
greet(); // Hello, Irena!
console.log(getBirthYear()); // 1994
name='Irena2'; //함수가 의존하는 전역변수의 값을 바꾸면
greet(); // Hello, Irena2! <-동작이 바뀐다

//개선
function greet2(user){
	console.log(`Hello, ${user}!`);
}
function getBirthYear2(age2){
	return new Date().getFullYear()-age2;
}
greet2('Irena'); //Hello, Irena!
console.log(getBirthYear2(25)); //1994

//let, const는 블록스코프에서 식별자를 선언
//특정 위치에서만 변수를 쓸 경우, 독립 블록(즉, 제어문의 일부분으로 쓰이지 않지만 의도적으로 사용한 블록)을 써볼 수 있음.(현실적으로 별 쓸모는 없지만)
//블록을 나가면 안에서 선언한 식별자는 곧바로 사라짐
console.log('before block');
{
	console.log('inside block');
	const xx=3;
	console.log(x); //3
}
//console.log(`outside block; xx=${xx}`); //ReferenceError: xx is not defined

//중첩 블록 스코프
{
	//외부
	let xxx='blue';
	let yyy='red';
	console.log(xxx); // blue
	console.log(yyy); 
	{
		//내부
		let xxx=3;
		console.log(xxx); // 3 <-외부스코프의 같은 이름 변수는 가려진다. (실제로, 외부스코프의 xxx는 여전히 존재하나, 접근방법이 사라지는 것임.)
		console.log(yyy); // red <-외부스코프의 다른 이름 변수는 접근가능하다.
	}
	console.log(xxx); // blue <-내부 블록이 끝나 해당 스코프의 xxx는 지워지고, 기존 xxx가 다시 접근가능해진다.
}
console.log(typeof xxx); // undefined

//중첩 블록 스코프 2
{
	let x={color:'blue'};
	let y=x; //<-별명을 설정해 위 객체에 접근방법을 하나 더 만들고
	let z=3;
	{
		let x=5; //<-가려도
		console.log(x); // 5
		console.log(y.color); // blue <-접근가능하다. 즉, 외부 블록의 x가 덮어써지며 지워지는것이 아니라 스코프에 접근방법이 사라진 채로 여전히 남아있는 것임을 확인.
		y.color='red'; //<-객체 변경(참조변수이므로 메모리주소는 그대로 있고 그 안의 값이 바뀐다)
		console.log(z); // 3
	}
	console.log(x.color); // red //<-바뀌었다
	console.log(y.color); // red
	console.log(z); // 3
}
//결론: 스코프는 계층적!(scope chain) 외부에서 선언된 값/객체들을 다 가지고 있음. 단, 접근할수 있는지에 대한 것은 좀 다른 문제이며.. 숨겨지지 않았다면 접근가능하다.



//클로저(closure)
//함수가 특정 스코프에 접근할 수 있도록, 의도적으로 그 스코프에서 정의하는 경우, 해당 스코프를 클로저라고 부름.
//예1
let globalFunc;
{
	let blockVar='a';
	globalFunc=function(){
		console.log(blockVar);
	}; //이 블록 스코프와, 계층적으로 아래에 있는 전역 스코프가 이 함수의 클로저를 형성.
}
globalFunc(); // a <-스코프를 빠져나온 곳에서 호출했지만, 스코프는 '정적'이므로, 블록스코프의 변수를 계속 접근할 수 있다.
//이렇게 접근하는 함수가 있으면, js 인터프리터는 블록내 선언 변수를 가비지 콜렉팅하지 않고, 스코프를 계속 유지함.
//예2
let ff;
{
	let o={note:'Safe'};
	ff=function(){
		return o;
	};
}
let oRef=ff();
oRef.note='Not so safe after all!'; //일반적으로는 스코프 밖에 있어야 할 변수에 접근가능하도록 만들었다!



//즉시 호출하는 함수 표현식(IIFE. Immediately Invoked Function Expression)
//형태: (function(){바디})(); : 익명함수를 선언하고 곧바로 호출한다.
//장점: 내부에 있는 것들이 모두 자기만의 스코프를 가지지만, 원한다면 스스로 리턴을 통해 밖으로 내보낼 수 있음.
//예1
const message=(function(){
	const secret="I'm a secret!";
	return `The secret is ${secret.length} characters long.`;
})();
console.log(message); //The secret is 13 characters long.
//위의 함수 바디의 secret은 이제 영영 접근 불가능함.
//하지만, 리턴으로 length가 반환됨.
//이런 식으로, 즉시 만들어진 배열/객체/함수를 반환하는 경우가 많음
//예2
const fff=(function(){
	let count=0;
	return function(){
		return `I have been called ${++count} time(s).`;
	};
})(); //fff엔 결국 가장 안쪽의 function이 들어가며, 겉의 function은 해당 함수의 클로저로 유지됨. count는 클로저에 있고, 밖에서 접근이 불가능해짐.
console.log(fff()); // I have been called 1 time(s).
console.log(fff()); // I have been called 2 time(s).
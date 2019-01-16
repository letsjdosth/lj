function sayHello(){
	console.log("Hello, world!");
	console.log("!Hola mundo!");
	console.log("Hallo wereld!");
}
sayHello();

function getGreeting() {
	return "Hello, world!";
}
function getGreetings() {
	return ["Hello, world","!Hola mundo!","Hallo wereld!"];
}
//return이 없는데 값을 받으려 시도하면 undefined가 반환됨.

//객체로서의 함수
console.log(getGreeting(), getGreeting); //호출:(), 참조
const g=getGreeting; //할당
console.log(g()); // Hello, world!
const o={};
o.g=getGreeting; //객체 프로퍼티에도 할당가능하다. (메서드-처럼)
console.log(o.g()); // Hello, world!
const arr=[1,2,3];
arr[1]=getGreeting; //배열 안에도 할당가능하다.
arr[1](); // Hello, world!

//매개변수(argument or parameter)
function avg(a,b){
	return (a+b)/2;
}
console.log(avg(5,10)); // 7.5

//매개변수를 넘기는 방식
//원시타입의 경우: 값을 복사해 넘김(값으로 전달). 때문에 외부 변수는 변경불가
function f(x){
	console.log(`f 내부: x=${x}`);
	x=5;
	console.log(`f 내부: x=${x} (할당 후)`);
}
let x=3;
console.log(`f 호출 전: x=${x}`);
f(x);
console.log(`f 호출 후: x=${x}`);
// f 호출 전: x=3
// f 내부: x=3
// f 내부: x=5 (할당 후)
// f 호출 후: x=3 <-영향받지 않았다.

//참조타입(객체)의 경우: 참조를 넘김(참조로 전달). 때문에 메모리위치만 안바뀐다면 그 안의 내용은 변경가능.
function h(p){
	p.message=`f 안에서 수정함 (이전값:'${p.message}')`;
}
let p={message:"초기 값"};
console.log(`h 호출 전: p.message='${p.message}'`);
h(p);
console.log(`h 호출 후: p.message='${p.message}'`);
// f 호출 후: x=3
// h 호출 전: p.message='초기 값'
// h 호출 후: p.message='f 안에서 수정함 (이전값:'초기 값')' <-영향을 받았다.

//파이썬과 결과적으로는 같게 동작하나, 내부적으로는 좀 다름
//(파이썬은 무엇이든간에 참조의 복사본(별명)을 넘기고, 내부에서 무언가 변경을 시도할 경우, mutable이면 변경하고, immutable이면 객체를 따로 새로 만들고 별명의 참조만 수정한다.)

//외부객체를 변경하기 싫으면 내부에서 할당을 해야함. 하지만 여전히 주의점
function hh(pp){
	pp.message="hh에서 수정함"; //
	pp={message: "새로운 객체!"}; //<-pp(지역변수)에 새로운 객체를 할당한다. 여기에서 기존 pp에 대한 참조가 끊긴다.
	console.log(`f 내부: pp.message="${pp.message}"(할당 후)`); //74번째줄 결과
}
let pp={message:"초기값"};
console.log(`hh 호출 전: pp.message='${pp.message}'`);
hh(pp);
console.log(`hh 호출 후: pp.message='${pp.message}'`);
// hh 호출 전: pp.message='초기값'
// f 내부: pp.message="새로운 객체!"(할당 후)
// hh 호출 후: pp.message='hh에서 수정함' //<-64번째줄은 지역내 pp 할당 이전이므로, 매개변수를 통해 pp에 대한 참조에 있는 객체를 수정하게 된다.

//js에서는 매개변수가 함수를 결정하지 않음. 
//(자바처럼 매개변수에 수에 따라 함수를 다르게 취급하는 오버로딩 등이 불가능. 파이썬처럼 그냥 같은이름 함수는 언제나 한 객체임.)
//심지어 필요한 매개변수를 전달 안 해도 됨. 그러면 undefined가 넘어감.
function ff(x){
	return `in ff:x="${x}"`;
}
console.log(ff()); // in ff:x="undefined"

//매개변수 해체
//해체할당처럼 매개변수도 객체를 등을 통으로 넘길 수 있음
function getSentence({subject,verb,object}){ //객체를 해체한다면 중괄호
	return `${subject} ${verb} ${object}`;
}
const ooo={subject:"I", verb:"love", object:"JavaScript"};
console.log(getSentence(ooo)); //I love JavaScript

function getSentence2([subject,verb,object]){ //배열을 해체한다면 대괄호
	return `${subject} ${verb} ${object}`;
}
const aaa=["I","love","JavaScript"];
console.log(getSentence2(aaa)); //I love JavaScript

//확산 연산자 ... 를 이용한 추가 매개변수 이용
//파이썬 *args, **kwargs와 비슷
//더 좋은 방법이 있긴함(뒤에 소개)
//es5에서는 arguments라는 특수 변수를 사용해서 비슷하게 했으나, arguments는 배열비슷한 무언가(배열은 아닌..)라서 무조건 캐스팅 필요. 귀찮으니 ...를 쓰자.
function addPrefix(prefix, ...words){ //...를 이용한 변수는 무조건 맨 뒤에 있어야 한다. 뒤에 또다른 positional이 있으면 뭐가 어디까지인지 구별이 안 가기 때문(에러냄)
	const prefixedWords=[];
	for(let i=0; i<words.length; i++){
		prefixedWords[i]=prefix + words[i]; //<-해당 변수는 나머지 매개변수를 배열 요소의 형태로 가지고 있다.
	}
	return prefixedWords;
}
console.log(addPrefix("con","verse","vex")); //[ 'converse', 'convex' ]

//기본값
//es6 추가. 파이썬 문법과 완전히 동일
function defaultVal(a,b='default',c=3){
	return `${a}-${b}-${c}`;
}
console.log(defaultVal(5,6,7), defaultVal(5,6), defaultVal(5), defaultVal()); //5-6-7 5-6-3 5-default-3 undefined-default-3


//메서드
//객체의 프로퍼티인 함수 (차이는 이후에)
//기존 방식
const wall={
	name:"Wallace",
	bark: function(){
		return 'Woof!';
	}
};
//es6 추가 방식
const wall2={
	name:"Wallace",
	bark(){
		return 'Woof!';
	}
};
//혹은 21번째줄처럼 프로퍼티에 외부함수를 할당
console.log(wall.bark(), wall2.bark()); //Woof! Woof!

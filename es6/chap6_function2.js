//this
//함수에서 쓸 경우, 일반적으로는 해당 함수를 묶어 호출한 상위 객체를 돌려줌
//선언이 아니라 호출에 대고 평가함
//명세: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this
//제어불가능한 상황에 의존해 돌아가는 경우는 this 사용 자체를 피할 것
const o={
	name:'Wallace',
	speak(){
		return `My name is ${this.name}!`;
	}
};
speak=o.speak;
console.log(speak===o.speak);//true
console.log(o.speak()); //My name is Wallace! <-this는 o이다. o에 묶어서 speak를 호출했기 때문
console.log(speak()); //My name is undefined! <-....안 묶으면 undefined가 들어간다 (strict mode)(브라우저에서는 전역에서 기본적으로 this==window 임)

//this가 가리키는 대상이 헷갈리는 경우, 명확한 스코프 내에서 this를 다른 이름(보통 that,self 등)에 할당하여 사용
const oo={
	name:'Julie',
	greetBackwards: function(){
		const self=this; //<-oo.greetBackwards를 호출 시, 여기에서 this는 명확히 oo이다.
		function getReverseName(){
			let nameBackwards='';
			//console.log(self.name); //<-this를 여기에 추가하고 전역에서 oo.greetBackwards()를 불러보면, oo가 아닌 객체가 튀어나오는 것을 확인할 수 있다.
			for(let i=self.name.length-1; i>=0; i--){
				nameBackwards+=self.name[i];
			}
			return nameBackwards;
		}
		return `${getReverseName()} si eman ym ,olleH`;
	}
};
console.log(oo.greetBackwards()); //eiluJ si eman ym ,olleH



//익명 함수
//function(){} 의 형태. 이를 변수에 넣어 쓰거나, 아니면 표현식에 직접 가져다 반환값을 쓸 수 있음.
const h=function(){
	console.log('it is lambda!');
};
h(); //it is lambda!

//주의. 선언시 양쪽에 이름을 붙일수는 있으나, 전역에서 사용할 때에는 할당한 바깥 변수만을 사용해야 함.
const g=function f(){
	//...(f를 이용해 재귀호출 가능)
};
g();
//f(); //ReferenceError: f is not defined <-전역에서는 에러남



//화살표 표기법(es6)
//arg=>return 으로 함수선언
//항상 익명함수. 할당해 사용하거나 표현식에서 사용
//1. function이란 명령, 2. 매개변수 하나일시 매개변수 선언 괄호, 3. 함수 바디 표현식 한줄일시 중괄호 및 return명령어 생략가능
const f1=function(){return "hello!";};
const f1_ar= ()=>"hello!"; //표현식은 알아서 리턴된다.
console.log(f1(),f1_ar()); //hello! hello!

const f2=function(name){ return `Hello, ${name}!`;};
const f2_ar= name=>`hello, ${name}!`; //매개변수가 하나이므로, (name) 대신 name을 그냥 써도 된다.
console.log(f2('f2'),f2_ar('f2')); //Hello, f2! hello, f2!

const f3=function(a,b){return a+b;};
const f3_ar=(a,b)=>a+b;
console.log(f3(2,3),f3_ar(2,3)); //5 5

//일반 선언과의 중요한 차이점으로, this가 언제나 선언상의 맥락에서 정적으로 묶임. 때문에 self 등에 재할당이 필요없다.
//위의 예제 고쳐서 예시
const oo_ar={
	name:'Julie',
	greetBackwards: function(){
		const getReverseName= ()=>{ //<-화살표표기 사용
			let nameBackwards='';
			for(let i=this.name.length-1; i>=0; i--){ //<-이 this는, 언제나 oo_ar이 된다.
				nameBackwards+=this.name[i];
			}
			return nameBackwards;
		};
		return `${getReverseName()} si eman ym ,olleH`;
	}
};
console.log(oo_ar.greetBackwards()); //eiluJ si eman ym ,olleH
//그 외의 차이점으로, 
//객체 생성자로는 화살표 함수를 사용할 수 없음
//arguments 변수(python *args)는 사용 불가능 (단, 확산 연산자가 있으므로 못 써도 별로 상관 없음)



//call, apply, bind
//this가 무엇인지 맥락에 상관없이 지정하는 도구들
//1. call
//function.call(object,arg1,arg2,...)
const bruce={name:'Bruce'};
const madeline={name:'Madeline'};
function greet(){
	return `Hello, I'm ${this.name}!`;
}
console.log(greet()); // Hello, I'm undefined!
console.log(greet.call(bruce)); // Hello, I'm Bruce! <-call은 this로 사용할 객체를 넘기면, 해당 함수가 주어진 객체의 메서드인것처럼 사용할 수 있도록 해줌.
console.log(greet.call(madeline)); // Hello, I'm Madeline!


function update(birthYear, occupation){
	this.birthYear=birthYear;
	this.occupation=occupation;
}
update.call(bruce, 1949, 'singer'); //<-call의 첫 인자는 this로 사용할 객체, 이후에는 해당 함수에 인자로 전달.
update.call(madeline, 1942, 'actress');
console.log(bruce, madeline); //{ name: 'Bruce', birthYear: 1949, occupation: 'singer' } { name: 'Madeline', birthYear: 1942, occupation: 'actress' }

//2. apply
//function.apply(object,array)
update.apply(bruce, [1995,'actor']); //<-apply는 매개변수를 받는 방법을 제외하면 call과 같음. apply는 인자로 넘길 대상을 배열로 받음.
update.apply(madeline,[1918,'writer']);
console.log(bruce, madeline); //{ name: 'Bruce', birthYear: 1995, occupation: 'actor' } { name: 'Madeline', birthYear: 1918, occupation: 'writer' }
//참고: apply의 다른 쓰임: 일반 함수에 인자를 배열로 넘길때도 사용할 수 있음. 함수가 this를 쓰지 않는다면, 아무거나 넘겨도 상관 없음
const arr=[2,3,-5,15,7];
console.log(Math.min.apply(null,arr)); //-5
console.log(Math.max.apply(null,arr)); //15

//apply 대신, call에 확산연산자를 써서 배열을 넘겨도 완전히 같음.
const newBruth=[1940, 'martial artist'];
update.call(bruce, ...newBruth);
console.log(bruce); //{ name: 'Bruce', birthYear: 1940, occupation: 'martial artist' }
console.log(Math.min(...arr)); //-5
console.log(Math.max(...arr)); //15

//3. bind
//function.bind(object,arg1,...)
//대상 함수의 this값을 '영구히' 대상 객체로 묶은 새 함수를 돌려줌. 뒤 args가 있을경우 해당 매개변수의 값도 고정해버림.
const updateBruce=update.bind(bruce); //이제 updateBruth의 this는 언제나 bruce임. 
//선언에서의 this가 bruce로 아예 바뀐다고 생각. 즉,
// const updateBruce= function(birthYear, occupation){
// 	bruce.birthYear=birthYear;
// 	bruce.occupation=occupation;
// }
updateBruce(1904,'actor'); //기존 update와 마찬가지로 2개 인자를 받는다.
console.log(bruce); //{ name: 'Bruce', birthYear: 1904, occupation: 'actor' }
updateBruce.call(madeline,1274,'king'); //이제 this가 없으므로 첫 인자는 무시되고, 이후 인자는 updateBruce에 arg들로 전달된다.
console.log(bruce, madeline); //{ name: 'Bruce', birthYear: 1274, occupation: 'king' } { name: 'Madeline', birthYear: 1918, occupation: 'writer' }
//141번째 줄로 인해 bruce가 변했고, madeline은 변하지 않고 그대로이다.

//bind에 매개변수 사용시의 예
const updateBruce1949=update.bind(bruce,1949);
// const updateBruce1949= function(occupation){
//  birthYear=1949
// 	bruce.birthYear=birthYear;
// 	bruce.occupation=occupation;
// }
updateBruce1949('singer, songwriter');
console.log(bruce); //{ name: 'Bruce',  birthYear: 1949,  occupation: 'singer, songwriter' }

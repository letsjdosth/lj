//객체

//프로퍼티 나열
//주의: 순서가 보장되지 않음 (객체 자체가 프로퍼티에 순서가 없음)
const SYM=Symbol();
const o={a:1, b:2, c:3, [SYM]:4};
//for...in 사용
//객체의 key를 순회. 단, 키가 심볼인 프로퍼티는 포함되지 않음.
//(참고로 배열에는 일반적인 for나 forEach를 쓰는게 좋음)
for(let prop in o){ 
	if(!o.hasOwnProperty(prop)) continue;
	console.log(`${prop}: ${o[prop]}`);
}
// a: 1
// b: 2
// c: 3
//Object.keys 이용
//예1
console.log(Object.keys(o)); //[ 'a', 'b', 'c' ] <-키를 배열로 가져온다. 코드는 o.keys가 아니라 Object.keys(o) 이다...
Object.keys(o).forEach(prop=>console.log(`${prop}: ${o[prop]}`)); //결과배열을 이용한 나열
// a: 1
// b: 2
// c: 3
//예2: x로 시작하는 프로퍼티만
const o2={apple:1, xochit:2, balloon:3, guitar:4, xylophone:5};
Object.keys(o2).filter(prop=>prop.match(/^x/)).forEach(prop=>console.log(`${prop}: ${o2[prop]}`));
// xochit: 2
// xylophone: 5


//클래스(es6)
class Car{
	static getNextVin(){ //static method
		return Car.nextVin++; //static메소드에서 this는 인스턴스가 아니라 클래스 자체를 가르키게 되지만, 헷갈리므로 그냥 클래스 이름을 쓰자.
	}
	constructor(make,model){//생성자
		this.make=make; //this는 호출한 인스턴스를 가리킴.(python self)
		this.model=model; 
		this._userGears=['P','N','R','D'];
		this._userGear=this._userGears[0];
		this.vin=Car.getNextVin();
	}
	//js는 파이썬과 같이 클래스 메소드/프로퍼티에 대한 접근제어기능이 없음. 모든 프로퍼티에 전역에서 직접 접근 가능.
	//js에서도 밖에서 제어 할 수 없게 만들고 싶을 때 관습적으로 변수이름을 _로 시작해서 붙임. (실제로 숨겨지지는 않음)
	//정말 꼭 숨기고 싶다면, WeakMap 등을 이용해서 한번 더 감싸거나 해볼 수 있음.
	//게터세터는 js 문법차원에서 직접 지원
	get userGear(){
		return this._userGear;
	}
	set userGear(value){
		if(this._userGears.indexOf(value)<0)
			throw new Error(`Invalid gear: ${value}`);
		this._userGear=value;
	}
	shift(gear){//메소드
		this.userGear=gear;
	}
	static areSimilar(car1,car2){
		return car1.make===car2.make && car1.model===car2.model;
	}
	static areSame(car1,car2){
		return car1.vin===car2.vin;
	}
	toString(){ //object의 기본 메서드 중 toString 오버라이드 (파이썬 repr같은 역할)
		return `${this.make} ${this.model}: ${this.vin}`;
	}
	
}
Car.nextVin=0;

const car1=new Car('Tesla','Model S'); //인스턴스 생성. new가 필요함.
const car2=new Car('Mazda','3i');
const car3=new Car('Mazda','3i');
console.log(car1 instanceof Car); //true <-instanceof 연산자:해당 클래스인지 확인
console.log(car2 instanceof Array); //false
car1.shift('D');
car2.shift('R');
console.log(car1.userGear, car2.userGear); //D R

//참고사항
//js es6의 클래스는, 기존 es5 js의 함수를 이용해 겉만 꾸민것임. (원래 함수가 this를 쓸 수 있었으므로, class는 단축문법에 불과)
console.log(typeof Car);//function

//프로토타입과 동적 디스패치
//인스턴스에서 사용할 수 있는 메서드를 prototype method라 부르고, ClassName.prototype.method_name 으로 표기. (요즘엔 #을 이용해 ClassName#method_name으로도 표기)
//js에서 실제로 클래스가 구현되는 방식을 보여줌
console.log(Car.prototype.shift); //[Function: shift]
//prototype은 클래스 정의대로 생성자가 만들어낸 프로퍼티들을 말함. 따라서 클래스의 인스턴스는 (디스패치를 하지 않으면) 같은 프로토타입 공유
//new로 생성한 새 인스턴스는 해당 클래스의 prototype 프로퍼티에 접근할 수 있음. (참고: js는 내부적으로 생성자의 prototype 프로퍼티를 __proto__에 저장)
//객체의 프로퍼티나 메서드에 접근할 때, 1.인스턴스에서 해당 프로퍼티/메서드를 찾고 2.존재하지 않으면 객체의 프로토타입에서 해당 프로퍼티나 메서드를 찾음.
console.log(car1.shift===Car.prototype.shift); //true (class 선언의 것을 그대로 쓴다.)
car1.shift=function(gear){this.userGear=gear.toUpperCase();}; //car1 인스턴스에 해당 이름의 함수를 덮어쓰면 <-이를 동적 디스패치라고 함
car1.shift('d');
console.log(car1.userGear); //car1에서의 정의대로 동작.
console.log(car1.shift===Car.prototype.shift); //false. <-이제 class 선언의 것과는 다르다.

//static method (classmethod)
console.log(car1.vin, car2.vin, car3.vin); // 0 1 2
console.log(Car.areSimilar(car1,car2),Car.areSimilar(car2,car3)); // false true
console.log(Car.areSame(car1,car2),Car.areSame(car2,car3)); // false false

//toString(repr 역할)
console.log(car1.toString()); //Tesla Model S: 0

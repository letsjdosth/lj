//상속
class Vehicle{
	constructor(){
		this.passengers=[];
		console.log('Vehicle created.');
	}
	addPassenger(p){
		this.passengers.push(p);
	}
}
class Car extends Vehicle{
	constructor(){
		super(); //superclass 생성자 호출. 주의:서브클래스에서는 super()를 반드시 호출해야 함.(안그러면 에러 발생)
		console.log('Car created.');
	}
	deployAirbags(){
		console.log('BWOOSH!');
	}
}

const v=new Vehicle(); // Vehicle created.
v.addPassenger('Frank');
v.addPassenger('Judy');
console.log(v.passengers); // [ 'Frank', 'Judy' ]
const c=new Car(); // Vehicle created.// Car created.
c.addPassenger('Alice');
c.addPassenger('Cameron');
console.log(c.passengers); // [ 'Alice', 'Cameron' ]
// v.deployAirbags(); //없다
c.deployAirbags(); // BWOOSH!



//다형성
class Motorcycle extends Vehicle{}
const m=new Motorcycle();
console.log(c instanceof Car, //true
	c instanceof Vehicle, //true
	m instanceof Car, //false
	m instanceof Motorcycle, //true
	m instanceof Vehicle //true
);

//데이터 프로퍼티와 o.hasOwnProperty(x)
class Super{
	constructor(){
		this.name='Super';
		this.isSuper=true;
	}
}
Super.prototype.sneaky='not recommended!'; //예를 위해서일뿐, 평시에 prototype을 직접 건드려서 정의하지 말 것
class Sub extends Super{
	constructor(){
		super();
		this.name='Sub';
		this.isSub=true;
	}
}
const obj=new Sub();
for(let p in obj){ //프로퍼티 나열
	console.log(`${p}:${obj[p]}` + (obj.hasOwnProperty(p)?'':'(inherited)'));
}
//결과
// name:Sub
// isSuper:true <-상속을 통해 인스턴스에 정의되면 hasOwnProperty는 true를 돌려준다.(슈퍼클래스 생성자에서 정의되었으므로 서브클래스에서도 super()를 이용해 인스턴스에 정의)
// isSub:true
// sneaky:not recommended!(inherited) <-인스턴스가 아니라 프로토타입 체인에만 정의되면 hasOwnProperty는 false를 돌려준다.

//hasOwnProperty는 정말 데이터형 프로퍼티만 검사하고, 메소드 존재는 검사할수 없다(python hasattr과 다른 점. 파이썬 hasattr는 프로퍼티든 메소드든 다 찾는다.)

//다중상속, 믹스인, 인터페이스
//js는 다중상속 금지. 인터페이스 미지원
//믹스인으로 해결하도록 함
//예
class InsurancePolicy{} //가상의 보험정책
function makeInsurable(o){  //믹스인용 함수
	o.addInsurancePolicy=function(p) {this.insurancePolicy=p;};
	o.getInsurancePolicy=function() {return this.insurancePolicy;};
	o.isInsured=function(){return !!this.insurancePolicy;}; //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/논리_연산자(Logical_Operators)#Logical_NOT_(!)
}

makeInsurable(Car.prototype); //프로토타입에 믹스인
const car1=new Car();
car1.addInsurancePolicy(new InsurancePolicy());
console.log(car1.isInsured());//true
//프로토타입에 추가하면 관련 메소드가 모두 해당 클래스 정의에 추가되어 동작
//한 인스턴스에만 기능추가가 필요할 때에는 인스턴스를 makeInsurable에 넘길 수 있음.

//단, 믹스인 방식은 다중상속의 문제인 이름 충돌 문제를 해결해주지 않음. 알아서 잘 피해야함.
//또한 자바와같이 객체 타입을 이용한(instanceof) 클래스 확인 불가
console.log(car1.hasOwnProperty('insurancePolicy')); //true
console.log(car1.hasOwnProperty('isInsured')); //false <-method는 확인 불가-_-

//console.log(car1 instanceof insurable??);<-이런식의 전개 불가

//이름충돌문제의 야매 해결책
//기본 클래스의 속성 이름은 모두 str로, 믹스인 클래스의 요소 이름은 모두 Symbol로 사용
//심볼은 모두 고유함을 js가 보장
const ADD_POLICY=Symbol();
const GET_POLICY=Symbol();
const IS_INSURED=Symbol();
const _POLICY=Symbol();
function makeInsurable2(o){
	o[ADD_POLICY]=function(p){this[_POLICY]=p;};
	o[GET_POLICY]=function(){return this[_POLICY];};
	o[IS_INSURED]=function(){return !!this[_POLICY];};
}

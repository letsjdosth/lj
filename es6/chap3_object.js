//js의 내장 객체

//object
//본질적으로 컨테이너 (js에서 클래스는 따로 있는것 같음(es6 추가?) 하지만 이 객체도 OOP에 쓰는 듯)
//변경 가능 (mutable). 순서 보장 안 함
//파이썬의 dict 비슷

const obj={};
obj.color="yellow"; //property 혹은 member라 부름. let 안 써도 바로 선언할당됨
obj["not an identifier"]=3; //유효한 식별자 형식이 아니라면 대괄호에 넣어 쓸 것. 단, 이럴땐 .으로 접근이 안 됨
console.log(obj.color, obj["color"], obj["not an identifier"]); //yellow yellow 3 
//.으로 선언한 대상은, 대괄호에 넣어 접근 시 식별자를 스트링 취급해 넘겨야 함. 점연산자는 기본적으로 문자열 프로퍼티라고 생각할 것
//참고) 정식 명칭 .:멤버 접근 연산자(member access operator), []:계산된 멤버 접근 연산자(computed member access operator)
const SIZE=Symbol();
obj[SIZE]=8;//심볼을 사용해 선언할당
console.log(obj[SIZE]);//8
//참고) 키는 문자열이나 심볼만

const sam1={name:'Sam',age:4}; //선언과 동시에 프로퍼티 선언할당
const sam3={
	name:'Sam',
	classification:{
		kingdom:'Anamalia',
		phylum:'Chordata',
		class:'Mamalia',
		order:'Carnivoria',
		family:'Felidae',
		subfamily:'Felinae',
		genus:'Felis',
		species:'catus'
	}
};//내부에 또 객체를 넣을수 있음
console.log(sam3.classification.family); //Felidae
console.log(sam3.classification['family']); //Felidae
console.log(sam3["classification"].family); //Felidae
console.log(sam3["classification"][`family`]); //Felidae

//함수도 넣을 수 있음
sam3.speak=function(){return "Meow!";};
sam3.speak();

//프로퍼티 제거는 delete
delete sam3.classification;
delete sam3.speak;



//Number, String, Boolean 객체
//특별값(Infinity같은 것들) 저장 + 함수(메소드)형태 기능 제공
const s='hello';
console.log(s.toUpperCase()); //HELLO //일시적으로 String 객체를 만들고 메소드를 호출. 이후 객체를 파괴. (임시용<이라 생각)
s.rating=3;
console.log(s.rating); //undefined //객체는 임시용이었고 파괴되어서, 해당 값은 undefined가 됨. 아예 원시타입의 프로퍼티가 있다 생각하지 말 것.



//배열(array)
//순서 보존(링크드 리스트),indexed(0부터 시작), 동적(mutable), 여러 자료형 섞어 넣을 수 있음
//내부적으로 0+자연수가 키인 object로 구현되어 있음. 때문에 중간에 숫자가 아닌 키나 분수키 등을 사용해 프로퍼티를 만들 수 있으나.. 하지 말 것
//파이썬 리스트
const a1=[1,2,3,4];
const a2=[1,'two',3,null];
const a3=[
	'What the hammer? What the chain?',
	'In what furnace was thy brain?'];
const a4=[
	{name:'Ruby',hardness:'9'},
	{name:'Diamond',hardness:'10'},
	{name:'Topaz',hardness:'8'}];
const a5=[[1,3,5],[2,4,6]];

const arr=['a','b','c'];
console.log(arr.length); //3
console.log(arr[0],arr[arr.length-1]); //a c
arr[2]=3;
console.log(arr); //['a', 'b', 3]
//기타: 자바스크립트 배열에 마지막 요소 뒤 ,를 두는 것을 허용하고 인터프리터가 알아서 거름.
//단 구버전 브라우저는 에러를 뱉을 수 있고(ie...), 직렬화 포맷인 json(<애초에 자바스크립트 객체 표기법 의 약자이다)에서는 허용하지 않음



//날짜(Date)
//Date라는 날짜시간 처리용 객체가 내장되어 있음. (자바에서 가져옴. 막상 자바에서는 depreciate되었지만..)
//개판임..(라이브러리를 쓰자...chap15 참고)
const now=new Date();
console.log(now); //생성자에 인수를 안 넘기면 바로 생성시의 현재시간이 들어간다

const halloween=new Date(2018,9,31); //충격적이게도 월은(월만!!!) 0부터 시작해서 9는 10월이다
console.log(halloween);



//정규표현식(regexp)
//RegExp 객체 혹은 슬래시 2개 사이에 심볼을 넣는 리터럴 문법(chap 17)
const email=/\b[a-z0-9._-]+@[a-z_-]+(?:\.[a-z]+)+\b/;
const phone=/(:?\+1)?(:?\(\d{3}\)\s?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}/; //미국 전화번호



//맵(Map, WeakMap),셋(Set, WeakSet)
//(chap10)
//배열 기본
//선언및 할당
const arr1=[1,2,3];
const arr2=['one',2,"three"]; //타입이 같을 필요 없음
const arr3=[[1,2,3],['one',2,"three"]]; //배열을 포함한 배열 가능
const arr4=[{name:'Fred',type:'object',luckyNumbers:[5,7,13]},
	[{name:'Susan',type:'object'},{name:'Anthony',type:'object'}],
	1,
	function(){return 'arrays can contain functions too';},
	'three'
];
//접근
console.log(arr1[0],arr1[2], arr3[1], arr4[1][0]); //1 3 [ 'one', 2, 'three' ] { name: 'Susan', type: 'object' }
//배열의 length 메소드
console.log(arr1.length, arr4.length, arr4[1].length); //3 5 2
//추가 할당
arr1[4]=5;//<-원래 없는 자리에 넣으면
console.log(arr1); //node 출력: [ 1, 2, 3, <1 empty item>, 5 ] (접근시 undefined)
console.log(arr1.length); //5
console.log(arr2[10]);//<-접근만 해보면
console.log(arr2.length); //3 <-접근만으로 배열 길이가 늘어나지는 않는다.
//Array 생성자로 생성(거의 사용할 필요 없음)
const arr5=new Array(); //[] <-빈 배열
const arr6=new Array(1,2,3); // [ 1, 2, 3 ]
const arr7=new Array(2); // [ <2 empty items> ] <-2가 들어가는게 아니라 길이 2짜리 빈 배열이 만들어진다
const arr8=new Array('2'); //[ '2' ]
console.log(arr5,arr6,arr7,arr8); 

//배열 메소드
//주의: 어떤 메소드는 원래의 배열자체를 수정하고, 어떤 메소드는 원본은 내버려둔 채 새 배열을 만들어 반환함.
//전자는 (수정), 후자는 (사본)이라고 표기

//push,pop(배열 끝에서 넣고 뺌), unshift,shift(배열 맨 앞에서 넣고 뺌) (모두 수정)
//pop, shift로 제거시 제거값 반환됨.
const arr9=['b','c','d'];
arr9.push('e'); console.log(arr9); // [ 'b', 'c', 'd', 'e' ]
arr9.pop(); console.log(arr9); // (반환값 'e') [ 'b', 'c', 'd' ]
arr9.unshift('a'); console.log(arr9); // [ 'a', 'b', 'c', 'd' ]
arr9.shift(); console.log(arr9); //(반환값 'a') [ 'b', 'c', 'd' ]

//concat (배열 끝에 여러요소 추가) (사본)
console.log(arr9.concat(4,5,6));// [ 'b', 'c', 'd', 4, 5, 6 ]
console.log(arr9.concat([4,5,6]));// [ 'b', 'c', 'd', 4, 5, 6 ]
console.log(arr9.concat([4,5],6));// [ 'b', 'c', 'd', 4, 5, 6 ]
console.log(arr9.concat([4,[5,6]]));// [ 'b', 'c', 'd', 4, [ 5, 6 ] ] <-규칙: 배열은 1회만 분해한다
console.log(arr9);// [ 'b', 'c', 'd' ] <-원본은 그대로 있는것을 확인.

//slice(start,[end]) (사본)
//end 매개변수는 파이썬과 같이 바로 앞 인덱스까지 가져옴. end 매개변수 생략시 마지막까지 가져옴. 음수인덱스 가능(뒤에서부터 셈). step에 해당하는 인자는 없음
const arr10=[1,2,3,4,5];
console.log(arr10.slice(3));// [ 4, 5 ]
console.log(arr10.slice(2,4));// [ 3, 4 ]
console.log(arr10.slice(-2));// [ 4, 5 ] <-음수인덱스도 해당 인덱스부터 오른쪽으로 반환한다.
console.log(arr10.slice(1,-2));// [ 2, 3 ] <-음수인덱스도 해당 인덱스에서 왼쪽까지만 잘라 가져온다.
console.log(arr10.slice(-2,-1));// [ 4 ]

//splice(시작인덱스,제거할요소숫자,...추가요소) (수정)
//제거하지 않을때는 0을 넘김
//제거시 제거값 배열로 반환됨
const arr11=[1,5,7];
arr11.splice(1,0,2,3,4); console.log(arr11);// [ 1, 2, 3, 4, 5, 7 ]
arr11.splice(5,0,6); console.log(arr11);// [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(arr11.splice(1,2),arr11);// [ 2, 3 ] [ 1, 4, 5, 6, 7 ]
console.log(arr11.splice(2,1,'a','b'),arr11);// [ 5 ] [ 1, 4, 'a', 'b', 6, 7 ]

//copyWithin(붙여넣을 위치, 복사 시작 위치, [복사 끝낼 위치]) (es6) (수정)
//배열 요소를 복사해서 다른 위치에 붙여넣음.(기존 요소는 덮어씀)
const arr12=[1,2,3,4];
console.log(arr12.copyWithin(1,2)); // [ 1, 3, 4, 4 ] <-인덱스상 2 뒤인 [3,4]를 복사해서 인덱스 1에 붙인다.
console.log(arr12.copyWithin(2,0,2)); //[ 1, 3, 1, 3 ] <-(0,2)인 [1,3]을 복사해서 인덱스 2에 붙인다.
console.log(arr12.copyWithin(0,-3,-1)); //[ 3, 1, 1, 3 ] <-(-3,-1)인 [3,1]을 복사해서 인덱스 0에 붙인다.

//fill(채울 값, 시작위치, 끝위치) (es6) (수정)
const arr13=new Array(5).fill(1); console.log(arr13);// [ 1, 1, 1, 1, 1 ]
arr13.fill('a'); console.log(arr13);// [ 'a', 'a', 'a', 'a', 'a' ]
arr13.fill('b',1); console.log(arr13);// [ 'a', 'b', 'b', 'b', 'b' ]
arr13.fill('c',2,4); console.log(arr13);// [ 'a', 'b', 'c', 'c', 'b' ]
arr13.fill(5.5,-4); console.log(arr13);// [ 'a', 5.5, 5.5, 5.5, 5.5 ]
arr13.fill(0,-3,-1); console.log(arr13);// [ 'a', 5.5, 0, 0, 5.5 ]

//정렬
//reverse (수정)
const arr14=[1,2,3,4,5];
arr14.reverse();
console.log(arr14);
//sort (수정)
const arr15=[5,3,2,4,1];
arr15.sort();
console.log(arr15);
//sort는 함수를 받아 해당함수를 적용한 값을 기준으로 정렬할 수 있음(python sorted의 key와 비슷)
const arr16=[{name:'Suzanne'},{name:'Jim'},{name:'Trevor'},{name:'Amanda'}];
arr16.sort(); console.log(arr16); //<-바뀌지 않음.
// [ { name: 'Suzanne' },
//   { name: 'Jim' },
//   { name: 'Trevor' },
//   { name: 'Amanda' } ]
arr16.sort((a,b)=>a.name>b.name); console.log(arr16); //<-이름으로 알파벳순 정렬
// [ { name: 'Amanda' },
//   { name: 'Jim' },
//   { name: 'Suzanne' },
//   { name: 'Trevor' } ]
arr16.sort((a,b)=>a.name[1]<b.name[1]); console.log(arr16); //<-이름의 두번째글자를 가지고 알파벳 역순 정렬
// [ { name: 'Suzanne' },
//   { name: 'Trevor' },
//   { name: 'Amanda' },
//   { name: 'Jim' } ]

//검색
//indexOf : 찾고자하는것과 정확히 일치(===)하는 첫 요소의 인덱스 반환
//lastIndexOf : indexOf와 같으나 끝에서부터 역순으로 검색
//일치하는 값을 찾지 못하면 -1 반환. 첫 인자는 찾을 값, 두번째 인자는 시작인덱스.(중간부터 검색가능)
const o={name:'Jerry'};
const arr17=[1,5,'a',o,true,5,[1,2],'9'];
console.log(arr17.indexOf(5)); //1
console.log(arr17.lastIndexOf(5)); //5
console.log(arr17.indexOf('a')); //2
console.log(arr17.lastIndexOf('a')); //2
console.log(arr17.indexOf({name:'Jerry'})); //-1 //<-참조가 다르다(===는 참조변수일시 참조하는 대상의 메모리 위치 비교)
console.log(arr17.indexOf(o)); //3 //<-참조가 같다
console.log(arr17.indexOf([1,2])); //-1 //<-마찬가지로 참조변수
console.log(arr17.indexOf('9')); //7
console.log(arr17.indexOf(9)); //-1

console.log(arr17.indexOf('a',5)); //-1
console.log(arr17.indexOf(5,5)); //5
console.log(arr17.lastIndexOf(5,4)); //1
console.log(arr17.lastIndexOf(true,3)); //-1

//findIndex
//보조함수를 넘겨 검색조건 지정가능. 각 차례의 요소를 첫 매개변수로, 인덱스를 두번째 요소(선택)로 받고 반환값은 true/false여야.
//단, 시작 인덱스/방향 지정 불가. 앞에서부터 검색. 인덱스 반환/일치하는 값을 찾지 못하면 -1 반환
const arr18=[{id:5, name:'Judith'},{id:7, name:'Francis'}];
console.log(arr18.findIndex(o=>o.id===5)); //0
console.log(arr18.findIndex(o=>o.name==='Francis')); //1
console.log(arr18.findIndex(o=>o===3)); //-1
console.log(arr18.findIndex(o=>o.id===17)); //-1

//find : 조건에 맞는 요소 자체를 반환. 값을 찾지 못하면 undefined 반환
//보조함수를 넘겨 검색조건 지정가능. 각 차례의 요소를 첫 매개변수로, 인덱스를 두번째 요소(선택)로 받고 반환값은 true/false여야.
console.log(arr18.find(o=>o.id===5)); // { id: 5, name: 'Judith' }
console.log(arr18.find(o=>o.id===2)); // undefined

const arr19=[1,17,16,5,4,16,10,3,49];
console.log(arr19.find((x,i)=>i>2&&Number.isInteger(Math.sqrt(x)))); //4 (index 4의)

//기타:find/findIndex로 전달하는 함수의 this 수정하기
class Person{
	constructor(name){
		this.name=name;
		this.id=Person.nextId++;
	}
}
Person.nextId=0;
const jamie=new Person("Jamie"),
	juliet=new Person("Juliet"),
	peter=new Person("Peter"),
	jay=new Person("Jay");
const arr20=[jamie,juliet,peter,jay];

//옵션1: id를 직접 비교
console.log(arr20.find(p=>p.id===juliet.id)); //Person { name: 'Juliet', id: 1 }
//옵션2: this 이용. find의 2번재 인자는 넘긴 콜백함수의 this로 사용할 값임.
console.log(arr20.find(function(p){
	return p.id===this.id;
},juliet)); //Person { name: 'Juliet', id: 1 }

//some, every
//some은 조건에 맞는 요소를 찾으면 멈추고 곧바로 true 반환. 아니면 끝까지 순회한 후 false 반환
//every는 각 요소가 조건에 맞는지 검사하며 조건에 맞지 않으면 멈추고 즉시 false 반환. 아니면 끝까지 순회한 후 true 반환.
const arr21=[5,7,12,15,17];
console.log(arr21.some(x=>x%2===0)); //true (12)
console.log(arr21.some(x=>Number.isInteger(Math.sqrt(x)))); //false
const arr22=[4,6,16,36];
console.log(arr22.every(x=>x%2===0)); //true
console.log(arr22.every(x=>Number.isInteger(Math.sqrt(x)))); //false (6)
//마찬가지로 some, every의 2번재 인자는 콜백함수의 this로 사용할 값임.


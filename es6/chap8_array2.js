//배열 메소드(계속)
//map,filter,reduce (모두 사본)

//map(함수): 배열요소에 각각 해당함수 적용
//인자로 넘기는 콜백함수는 요소자체, 요소인덱스, 배열전체를 인덱스로 받음.(순서대로). 변환규칙에 해당하는 표현식을 리턴할 것.
const cart=[{name:'Widget',price:9.95},{name:'Gadget',price:22.95}];
const names=cart.map(x=>x.name);
const prices=cart.map(x=>x.price);
const discountPrices=prices.map(x=>x*0.8);
console.log(names,prices,discountPrices); //[ 'Widget', 'Gadget' ] [ 9.95, 22.95 ] [ 7.96, 18.36 ]

const newCart=names.map((x,i)=>({name:x, price:discountPrices[i]})); //참고: 객체를 만들시 괄호로 묶어주지 않으면, 인터프리터가 블록으로 판단해버림..
console.log(newCart); //[ { name: 'Widget', price: 7.96 },  { name: 'Gadget', price: 18.36 } ]

//filter(함수)
//마찬가지로 인자로 넘기는 콜백함수는 인자로 넘기는 콜백함수는 요소자체, 요소인덱스, 배열전체를 인덱스로 받음. 리턴이 true면 남기고, false면 버린다.
//카드 예
const cards=[];
for(let suit of ['H','C','D','S']){
	for(let value=1;value<=13;value++){
		cards.push({suit,value});
	}
}
console.log(cards.filter(c=>c.value===2));
// [ { suit: 'H', value: 2 },
//   { suit: 'C', value: 2 },
//   { suit: 'D', value: 2 },
//   { suit: 'S', value: 2 } ]
console.log(cards.filter(c=>c.suit==='D'));
// [ { suit: 'D', value: 1 },
//   { suit: 'D', value: 2 },
//   { suit: 'D', value: 3 },
//   { suit: 'D', value: 4 },
//   { suit: 'D', value: 5 },
//   { suit: 'D', value: 6 },
//   { suit: 'D', value: 7 },
//   { suit: 'D', value: 8 },
//   { suit: 'D', value: 9 },
//   { suit: 'D', value: 10 },
//   { suit: 'D', value: 11 },
//   { suit: 'D', value: 12 },
//   { suit: 'D', value: 13 } ]
console.log(cards.filter(c=>c.value>10));
// [ { suit: 'H', value: 11 },
//   { suit: 'H', value: 12 },
//   { suit: 'H', value: 13 },
//   { suit: 'C', value: 11 },
//   { suit: 'C', value: 12 },
//   { suit: 'C', value: 13 },
//   { suit: 'D', value: 11 },
//   { suit: 'D', value: 12 },
//   { suit: 'D', value: 13 },
//   { suit: 'S', value: 11 },
//   { suit: 'S', value: 12 },
//   { suit: 'S', value: 13 } ]
console.log(cards.filter(c=>c.value>10&&c.suit==='H'));
// [ { suit: 'H', value: 11 },
//   { suit: 'H', value: 12 },
//   { suit: 'H', value: 13 } ]

//map과 filter의 조합 예
function cardToString(c){
	const suits={'H':'\u2665', 'C':'\u2663', 'D':'\u2666', 'S':'\u2660'};
	const values={1:'A', 11:'J', 12:'Q', 13:'K'};
	for(let i=2; i<=10; i++) {
		values[i]=i;
	}
	return values[c.value]+suits[c.suit];
}
console.log(cards.filter(c=>c.value===2).map(cardToString)); //[ '2♥', '2♣', '2♦', '2♠' ]
console.log(cards.filter(c=>c.value>10&&c.suit==='H').map(cardToString)); //[ 'J♥', 'Q♥', 'K♥' ]


//reduce(함수,[초기값])
//순회하며 누적값을 계산하고 마지막 누적값을 리턴.
//인자로 넘기는 콜백함수는 '누적값', 현재 배열 요소, 요소인덱스, 배열전체를 인덱스로 받음.(순서대로)(첫 요소가 바뀌는것에 주의! 2번째 인자가 인덱스가 아니라 현재 배열요소라는것도 주의!)
//콜백의 리턴은 누적값이면 되나, 사실 명시적으로 리턴하지 않아도 됨(어차피 누적값이 다음 reduce 계산에 자동으로 넘어감)
//초기값은 옵션. 지정하지 않으면 배열의 첫 요소가 초기값이 되고 두번째 요소와의 계산부터 함수를 호출. (연산의 성질 및 상황에 따라 이용할 것)
//예
const arr=[5,7,2,4];
const sum=arr.reduce((a,x)=>a+=x, 0); console.log(sum); //18 (0+5+7+2+4)
const sum2=arr.reduce((a,x)=>a+=x); console.log(sum2); //18 (5+7+2+4)
//예2: 객체를 만들어보자
const words=["Beachball","Rodeo","Angel","Aardvark","Xylophone","November","Chocolate","Papaya","Uniform","Joker","Clover","Bali"];
const alphabetical=words.reduce((a,x)=>{
	if(!a[x[0]]){
		a[x[0]]=[];
	}
	a[x[0]].push(x);
	return a;
},{});
console.log(alphabetical);
// { B: [ 'Beachball', 'Bali' ],
//   R: [ 'Rodeo' ],
//   A: [ 'Angel', 'Aardvark' ],
//   X: [ 'Xylophone' ],
//   N: [ 'November' ],
//   C: [ 'Chocolate', 'Clover' ],
//   P: [ 'Papaya' ],
//   U: [ 'Uniform' ],
//   J: [ 'Joker' ] }
//예3: 평균/분산계산
const data=[3.3, 5, 7.2, 4, 12, 4,6, 10.3];
const stats=data.reduce((a,x)=>{
	a.N++;
	let delta=x-a.mean;
	a.mean+=delta/a.N;
	a.M2+=delta*(x-a.mean);
	return a;
},{N:0, mean:0, M2:0});
if (stats.N>2){
	stats.variance=stats.M2/(stats.N-1);
	stats.stdev=Math.sqrt(stats.variance);
}
console.log(stats);
// { N: 8,
//   mean: 6.475,
//   M2: 70.415,
//   variance: 10.059285714285716,
//   stdev: 3.171637702242442 }
//예3
const words2=["Beachball","Rodeo","Angel","Aardvark","Xylophone","November","Chocolate","Papaya","Uniform","Joker","Clover","Bali"];
const longwords=words2.reduce((a,w)=>w.length>6 ? a+" "+w : a, "").trim(); //(reduce 사용) 6글자 넘으면 누적값에 추가
console.log(longwords); //Beachball Aardvark Xylophone November Chocolate Uniform
const longwords2=words2.filter(w=>w.length>6).join(" "); //동일 예(filter+join 사용)
console.log(longwords2); //Beachball Aardvark Xylophone November Chocolate Uniform

//기타사항
//map,filter,reduce는 삭제되거나 정의되지 안은 요소에서 콜백함수를 호출하지 않음. 
//->배열선언시 배열을 undefined로 채운채 만들고 이후 값을 할당하는 상황이라면, 해당 함수를 쓰지 말 것 (es6이라면 fill 사용)
//->또한, 특정 배열에 해당 함수를 쓴다면, 그 배열 요소를 delete로 지우지 말 것.


//join(구분자)
//배열의 문자열 병합. 요소사이는 구분자가 추가됨.구분자의 기본값은 쉼표(,) (사본)
const arr2=[1,null,'hello','world',true,undefined];
delete arr2[3];
console.log(arr2.join()); //1,,hello,,true,
console.log(arr2.join('')); //1hellotrue
console.log(arr2.join('--')); //1----hello----true--


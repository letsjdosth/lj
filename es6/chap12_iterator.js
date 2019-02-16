//iterator

const book=[
"Twinkle, twinkle, little bat!",
"How I wonder what you're at!",
"Up above the world you fly,",
"Like a tea tray in the sky.",
"Twinkle, twinkle, little bat!",
"How I wonder what you're at!"
];
const it=book.values(); //배열을 이터레이터로 만들기. 기동(priming)되지 않은 새 독립적 이터레이터가 반환된다.
console.log(
	it.next(),// { value: 'Twinkle, twinkle, little bat!', done: false }
	it.next(),// { value: 'How I wonder what you\'re at!', done: false }
	it.next(),// { value: 'Up above the world you fly,', done: false }
	it.next(),// { value: 'Like a tea tray in the sky.', done: false }
	it.next(),// { value: 'Twinkle, twinkle, little bat!', done: false }
	it.next(),// { value: 'How I wonder what you\'re at!', done: false }
	it.next(),// { value: undefined, done: true }
	);
//순회가 끝나면 done이 true가 되고 값은 undeflined가 됨. 하지만 게속해서 next()를 호출 가능.(파이썬이 순회가 끝나면 StopIteration에러를 내는것과는 대조적)

//for...of의 구조
const it2=book.values();
let current = it2.next();
while(!current.done){
	console.log(current.value);
	current=it2.next();
}

//독립적
const it3=book.values();
const it4=book.values();
console.log(it3.next());// { value: 'Twinkle, twinkle, little bat!', done: false }
console.log(it3.next());// { value: 'How I wonder what you\'re at!', done: false }
console.log(it4.next());// { value: 'Twinkle, twinkle, little bat!', done: false }
console.log(it3.next());// { value: 'Up above the world you fly,', done: false }


//이터레이션 프로토콜
//파이썬에서 객체에 __iter__로 이터레이터를 반환하게 하고, 해당 이터레이터가__iter__, __next__를 구현해 이터레이터로 동작할 수 있게 만들듯
//자바스크립트에서는 객체에 Symbol.iterator로 이터레이터를 반환하게 하고, 해당 이터레이터가 value,done 프로퍼티, next메소드를 구현하면 이터레이터로 동작하도록 만들 수 있음
//예1.
class Log{
	constructor(){
		this.messages=[];
	}
	add(message){
		this.messages.push({message, timestamp:Date.now()});
	}
	[Symbol.iterator](){
		return this.messages.values(); //<-배열이므로 이터레이터를 반환한다
	}
}

const log=new Log();
log.add('first day at sea');
log.add('spotted whale');
log.add('spotted another vessel');
for(let entry of log){
	console.log(`${entry.message} @ ${entry.timestamp}`);
}
// first day at sea @ 1550333041382
// spotted whale @ 1550333041382
// spotted another vessel @ 1550333041382

//예2. 직접 만들경우
class Log_hand{
	constructor(){
		this.messages=[];
	}
	add(message){
		this.messages.push({message, timestamp:Date.now()});
	}
	[Symbol.iterator](){
		let i=0;
		const messages=this.messages;
		return {
			next() {
				if(i>=messages.length){
					return {value:undefined, done:true};
				}
				return {value:messages[i++], done:false};
			}
		}
	}
}

const log2=new Log_hand();
log2.add('first day at sea');
log2.add('spotted whale');
log2.add('spotted another vessel');
for(let entry of log2){
	console.log(`${entry.message} @ ${entry.timestamp}`);
}
// first day at sea @ 1550333249307
// spotted whale @ 1550333249307
// spotted another vessel @ 1550333249307


//순회용이 아닌 순차계산 이터레이터
//예: 피보나치
class FibonacciSequence{
	[Symbol.iterator](){
		let a=0, b=1;
		return {
			next(){
				let rval={value:b, done:false};
				b+=a;
				a=rval.value;
				return rval;
			}
		};
	}
}

const fib=new FibonacciSequence();
let i=0;
for(let n of fib){
	console.log(n);
	if(++i>9){
		break; //피보나치수열은 무한하므로.. for of문이 무한히 계속 계산됨. break로 앞만 보자.
	}
}
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
// 55

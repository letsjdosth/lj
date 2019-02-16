//generator
//js에도 yield를 이용해 실행을 밖에서 제어하고 밖과 통신하는 함수(:제너레이터)를 만들 수 있음
//파이썬이 def를 혼용하다 async로 갈아엎은(...)것과 달리 js는 처음부터 구분. function* 로 선언(화살표표기법은 없음)

function* rainbow(){
	yield 'red';
	yield 'orange';
	yield 'yellow';
	yield 'green';
	yield 'blue';
	yield 'indigo';
	yield 'violet';
}
const it=rainbow(); //iterator가 반환된다.
console.log(it.next(),it.next(),it.next(),it.next());
// { value: 'red', done: false } { value: 'orange', done: false } { value: 'yellow', done: false } { value: 'green', done: false }
console.log(it.next(),it.next(),it.next(),it.next());
// { value: 'blue', done: false } { value: 'indigo', done: false } { value: 'violet', done: false } { value: undefined, done: true }

for(let color of rainbow()){
	console.log(color);
}

//양방향 통신
function* interrogate(){
	const name=yield 'What is your name?'; //<-yield 오른쪽까지 진행후 멈춘다. 이후 값을 받아서 name에 대입
	const color=yield 'What is your favorite color';
	return `${name}'s favorite color is ${color}`;//<-return을 섞을수 있다.
}
const it2=interrogate();
console.log(it2.next());// { value: 'What is your name?', done: false }
console.log(it2.next('Ethan'));// { value: 'What is your favorite color', done: false } <-send할 내용은 그냥 next에 인수로 담아서 보내면 된다.
console.log(it2.next('orange'));// { value: 'Ethan\'s favorite color is orange', done: true } //마지막 리턴값이 value로 바로 반환된다. 자동으로 done:true가 된다.
//return값이 파이썬은 StopIteration 에러에 담겨서 나오나 js는 (이터레이터가 기본적으로 무한 지속되므로) 형식에 맞게 반환됨

//권장: return은 언제나 위의 방식대로 동작하나, 값 반환용으로는 쓰지 말 것. done을 true로 바꿔서 뒤 값이 다 씹힐 가능성 존재(for...of 등에서). 
//값을 반환할땐 yield로 반환하고, return은 경우에 따라 오직 중간에 종료하는 목적으로만 사용할 것.


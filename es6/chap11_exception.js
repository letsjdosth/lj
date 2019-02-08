//Error 객체
const err_obj=new Error('invalid email'); //<-자체로는 별 쓸데 없다. 맥락내에서의 메시지 전달용임.
function validateEmail(email){
	return email.match(/@/) ? email : new Error('invalid email:'+email);
}
const email='jain@doe.com';
const validatedEmail=validateEmail(email);
if(validatedEmail instanceof Error){
	console.error('Error: '+validatedEmail.message);
} else{
	console.log('Valid Email: '+validatedEmail);
}

//예외처리: try...catch...
//종류별로 잡기: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/try...catch
//catch(e if e instanceof ErrorName) 은 비표준이라서 동작할수도 안할수도.. catch문 안에서 if...else...는 확실히 동작
const email2=null;
try{
	const validatedEmail2=validateEmail(email2); //<-에러 발생 라인. validateEmail 함수에서 에러 발생 '즉시' 바로 catch문으로 넘어간다.
	// if(validatedEmail2 instanceof Error){ //<-실행 안된다.
	// 	console.error(`Error: ${validatedEmail2.message}`);
	// } else {
	// 	console.log(`Valid Email: ${validatedEmail2}`);
	// } 
} catch(err){
	console.error(`Error(handled): ${err.message}`);
}
//Error(handled): Cannot read property 'match' of null

//예외 일으키기: throw
//에러객체 말고 다른 객체나 숫자..문자열..등도 던질 수 있긴 함(이러지 말것ㅋㅋㅋ)
transfer=function(to,amount){to.account.balance+=amount;};
function billPay(amount, payee, account){
	if(amount>account.balance){
		throw new Error('insufficient funds');
	}
	account.transfer(payee,amount);
}

//에러 전파
//호출 스택(call stack)을 따라 상위로 전파
//예외시 상위호출스택 어디에서든 캐치 가능
//Error.stack은 전파경로를 보여줌.
function a(){
	console.log('a: calling b');
	b();
	console.log('a: done');
}
function b(){
	console.log('b: calling c');
	c();
	console.log('b: done')
}
function c() {
	console.log('c: throwing error');
	throw new Error('c error');
	console.log('c: done');
}
function d(){
	console.log('d: calling c');
	c();
	console.log('d.done');
}
try{
	a();
} catch(err) {
	console.log(err.stack);
}
// Error: c error //<-노드 실행결과 (다른환경에서 돌리면 코드파일 밑에 나름의 환경의 스택이 보여짐.)
//     at c (C:\newjsscript\lj\es6\chap11_exception.js:55:8)
//     at b (C:\newjsscript\lj\es6\chap11_exception.js:50:2)
//     at a (C:\newjsscript\lj\es6\chap11_exception.js:45:2)
//     at Object.<anonymous> (C:\newjsscript\lj\es6\chap11_exception.js:64:2)
//이하생략

try{
	d();
} catch(err) {
	console.log(err.stack);
}
// Error: c error
//     at c (C:\newjsscript\lj\es6\chap11_exception.js:55:8)
//     at d (C:\newjsscript\lj\es6\chap11_exception.js:60:2)
//     at Object.<anonymous> (C:\newjsscript\lj\es6\chap11_exception.js:69:2) 
//이하생략 (라인이 안맞는건 주석이 있기전에 돌려서..

//try..catch..finally..
//js는 try문이 완전히 실행되든, catch문으로 넘어가 실행되든, 마지막에 finally 블록이 마지막에 무조건 실행될것을 보장
try{
	console.log('this line is executed...');
	throw new Error('whoops');
	console.log('this line is not executed...');
} catch(err) {
	console.log('there was an error...');
} finally {
	console.log('...always executed');
	console.log('perform cleanup hear');
}
// this line is executed...
// there was an error...
// ...always executed
// perform cleanup hear

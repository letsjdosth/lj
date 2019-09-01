//비동기 프로그래밍 1
//callback
//순번이 될 때 내가 미리 넘겨둔 함수를 실행
//이때 넘겨둔 함수를 '콜백'이라 부름

//setTimeout(callbk,time)
//콜백을 time밀리초 이후 호출
console.log('Before timeout: '+ new Date());
function f() {
	console.log('After timeout: ' + new Date());
}
setTimeout(f, 30*1000); //30초 기다림. 이후 f 실행. 이때 f가 콜백
console.log('I happen after setTimeout!');
console.log('Me too!');

// Before timeout: Wed Feb 20 2019 18:12:56 GMT+0900 (대한민국 표준시)
// I happen after setTimeout!
// Me too!
// After timeout: Wed Feb 20 2019 18:13:56 GMT+0900 (대한민국 표준시)
//<-setTimeout이 비동기적으로 실행되기때문에 블로킹하지 않음
//따라서, 기다리는 동안 아래 코드가 먼저 실행되고 이후 시간이 지난 후 콜백 f가 실행됨

//setInterval(callbk, time)
//콜백을 time밀리초마다 주기적으로 호출
//리턴은 interval_id. 이를 clearInterval에 넘기면 멈춤.
const start=new Date();
let i=0;
const interval_id=setInterval(function(){
	let now=new Date();
	if(now.getMinutes() !== start.getMinutes() || ++i>10) //<-종료조건
		return clearInterval(interval_id);
	console.log(`${i}: ${now}`);
}, 5*1000); //<-5초마다 위 익명콜백 실행

// 1: Wed Feb 20 2019 18:26:44 GMT+0900 (대한민국 표준시)
// 2: Wed Feb 20 2019 18:26:49 GMT+0900 (대한민국 표준시)
// 3: Wed Feb 20 2019 18:26:54 GMT+0900 (대한민국 표준시)
// 4: Wed Feb 20 2019 18:26:59 GMT+0900 (대한민국 표준시)

//scope 문제
//콜백은 자신을 선언한 스코프에 있는 것에 접근함. 때문에 콜백이 실제 실행되는 순간의 스코프를 고려해야만 함
function error_countdown(){
	let i; //<-for문 밖 countdown func 스코프에 선언하면
	console.log('Countdown:');
	for(i=5; i>=0; i--){
		setTimeout(function(){ //<-블로킹하지 않으므로 for문이 먼저 모조리 실행되어 i=-1이 되고
			console.log(i===0 ? 'GO!' : i); //<-이후 -1이 매초 나온다...
		}, (5-i)*1000);
	}
}
error_countdown();
//비동기 함수는 비는 시간에 권한을 위임할 뿐, 권한을 받은 순간에는 동기적으로 실행됨
//또한 콜백으로도 보통 동기적인 함수를 넘기므로, 동기적으로 실행됨.

//매개변수를 포함해 함수 안에서 만든 변수는 무언가가 접근할 수 있는 한 계속 존재한다는것을 기억하면
function countdown(){
	console.log('Countdown:');
	for(let i=5; i>=0; i--){ //<-for 블록에서 선언하면
		setTimeout(function(){
			console.log(i===0 ? 'GO!' : i); //<-순간적으로는 i가 6개 존재하게되고 의도한 동작이 됨
		}, (5-i)*1000);
	}
}
countdown();

//오류 우선 콜백 (error-first callback)
//콜백의 단점인 예외처리 어려움을 완화하기 위한 디자인 패턴
//콜백의 첫 매개변수로 에러 객체를 받도록 함. null이나 undefined이면 무에러, 참 같은 값이면 에러
//콜백은 에러 매개변수를 체크하고, 그에 맞게 반응. 에러면 에러처리 후 콜백을 빠져나옴.
const fs=require('fs');
const fname='may_or_may_not_exist.txt';
fs.readFile(fname, function(err,data){
	if(err) return console.error(`error reading file ${fname} : ${err.message}`);
	console.log(`${fname} contents: ${data}`);
});

//콜백 헬(callback hell)
//중첩 콜백은 끔찍한 코드가 됨
const fs=require('fs');
fs.readFile('a.txt', function(err,dataA){
	if(err) console.error(err);
	fs.readFile('b.txt', function(err,dataB){
		if(err) console.error(err);
		fs.readFile('c.txt', function(err,dataC){
			if(err) console.error(err);
			setTimeout(function(){
				fs.writeFile('d.txt', dataA+dataB+dataC, function(err){
					if(err) console.error(err);
				});
			}, 60*1000);
		});
	});
});

//문제1
//단순 에러기록을 넘어 에러를 직접 내고 이에대한 처리를 한다면 더 끔찍해짐. 
//try...catch블록은 같은 함수안에서만 동작함. 때문에 에러처리를 각 익명콜백 내에서 해줘야하므로, 
//추가로 2배의 블록이 만들어짐....
//문제2
//콜백이 아예 호출되지 않거나, 콜백이 두번 호출되거나 하는 경우를 방지할 수 없음
//js 인터프리터는 콜백이 정확히 몇번 호출되는지 보장하지 않음
//이를 해결할 수는 있지만, 코드가 더 지저분해짐

//비동기 프로그래밍 2
//promise
//콜백을 이용해 추상화한 레이어.
//프라미스 기반 비동기함수를 호출 시, Promise 인스턴스(객체)를 반환.
//단 한번 실행되는것을 보장. 성공(fulfilled)/실패(rejected)를 결정(settle)하는것을 보장.
//객체가 리턴되므로, 이를 처리할 곳에 마음대로 넘겨 처리할 수 있음.

//프라미스 생성
//resolve(성공시), reject(실패시)를 인수로 받는 콜백(함수)을 생성자로 넘겨 
//새 Promise 인스턴스를 만들면 됨
function countdown(seconds){
	return new Promise(function(resolve,reject){
		for(let i=seconds; i>=0; i--){
			setTimeout(function(){
				if(i===13) return reject(new Error('Oh my god'));//<-실패 신호
				if(i>0) console.log(i + '...');
				else resolve(console.log('GO!')); //<-성공 신호
			}, (seconds-i)*1000);
		}
	});
}

//프라미스 사용
countdown(5); //<-프라미스 객체 무시할 시. 이래도 동작은 잘 함

countdown(5).then( //<-then 핸들러. 바로 성공 콜백과 에러 콜백을 받음.
	function(){
		console.log('countdown completed successfully.');
	},
	function(err){
		console.log('countdown experienced an error : ' + err.message);
	}
);
// 5...
// 4...
// 3...
// 2...
// 1...
// GO!
// countdown completed successfully.

p=countdown(13);//<-할당후 처리
p.then(function(){
	console.log('countdown completed successfully.');
});
p.catch(function(err){ //<-catch 핸들러도 지원
	console.log('countdown experienced an error : ' + err.message);
})
// countdown experienced an error : Oh my god
// 12... //<-!!!!!!!!!!!계속 실행된다!
// 11...
// 10...
// 9...
// //생략
// 1...
// GO!
//Promise에 넘긴 함수에서의 resolve, reject 호출이 넘긴 함수를 멈추지 않음.
//단지 상태만 관리함. 때문에, 멈추게 하려면 추가적으로 컨트롤하는 코드가 필요.
//상태만 리턴하지, 기본적으로는 진행상황을 하나도 알려주지 않음.



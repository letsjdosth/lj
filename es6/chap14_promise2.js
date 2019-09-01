//이벤트
//EventEmitter 노드 내장모듈
//특정 이벤트가 일어나면, emitter가 알림.
//함수와 써도 되지만, 기본 설계는 클래스와 함께 사용하도록 되어있음
const EventEmitter=require('events').EventEmitter;
class Countdown extends EventEmitter {
	constructor(seconds, superstitious){
		super();
		this.seconds=seconds;
		this.superstitious=!!superstitious;
	}
	go(){
		const countdown=this; //<-참고: 콜백안에서 this는 값이 달라짐.\
		const timeoutIds=[]; //<-예약콜백 보관
		return new Promise(function(resolve, reject){
			for(let i=countdown.seconds; i>=0; i--) {
				timeoutIds.push(setTimeout(function(){
					if(countdown.superstitious && i===13){
						timeoutIds.forEach(clearTimeout);//<-대기중인 타임아웃 모두 취소
						return reject(new Error('Oh my god'));
					}
					countdown.emit('tick', i); //<-'tick'이라는 이름의 이벤트 발생시키기
					if(i===0) resolve();
				}, (countdown.seconds-i)*1000));
			}
		});
	}
}
const c = new Countdown(5);
c.on('tick', function(i){
	if(i>0){
		console.log('c: ' + i + '...');
	}
});
c.go()
	.then(function(){
		console.log('c: GO!');
	}).catch(function(err){ //<-체인으로 연결가능
		console.error('c: '+err.message);
	})

const d = new Countdown(15, true)
	.on('tick', function(i){
		if(i>0) console.log('d: ' + i + '...');
	});
d.go()
	.then(function(){ //<-체인으로 연결가능
		console.log('GO!');
	})
	.catch(function(err){
		console.error('d: '+err.message);
	})

//프라미스 체인
//프라미스가 완료되면 다른 프라미스를 또 반환하는 함수를 즉시 호출가능
function launch(){
	return new Promise(function(resolve,reject){
		if(Math.random() < 0.5) return;//<-0.5에 확률로 이륙 실패하는 로켓.. 이렇게 리턴하면 프로미스가 settle되지 않는다.
		console.log('Lift off!');
		setTimeout(function(){
			resolve('In orbit!');
		}, 2*1000);
	});
}

function addTimeout(fn, timeout){ //미결정상태를 해결하자. 타임아웃 도입.
	if(timeout===undefined) timeout=1000;
	return function(...args) {
		return new Promise(function(resolve, reject){
			const tid=setTimeout(reject, timeout, new Error('promise timed out'));
			fn(...args)
				.then(function(...args){
					clearTimeout(tid);
					reject(...args);
				});
		});
	}
}

const e = new Countdown(5)
	.on('tick', i=>console.log('e: '+i+'...'));
e.go()
	.then(addTimeout(launch, 11*1000)) //<-프로미스 launch를 또 부르자! (addTimeout은 그를 감싸는 타임아웃 장치)
	.then(function(msg){ //<-launch가 resolve되면 resolve의 인수값이 리턴된다. 출력하자
		console.log('e: '+msg);
	})
	.catch(function(err){
		console.error('e: Houston, we have a problem... : ' + err.message);
	})
//5...
//4...
//3...
//2...
//1...
//Lift off!
//In orbit! //<-2초 뒤


//체인으로 엮을 시, 어느 프로미스에서 예외가 나든 상관없이 catch가 다 잡는다.
const f = new Countdown(16, true)
	.on('tick', i=>console.log('f: '+i+'...'));
f.go()
	.then(addTimeout(launch))
	.then(function(msg){
		console.log('f: '+msg);
	})
	.catch(function(err){ 
		console.error('f: Houston, we have a problem... : ' + err.message);
	})
//16...
//15...
//14...
//'Houston, we have a problem....'
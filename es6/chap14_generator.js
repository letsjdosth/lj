//generator

//예1. 파일3개 읽고 1분뒤 합쳐서 다른 파일에 쓰기
//먼저 오류 우선 콜백의 프라미스화
function nfcall(f,...args){
	return new Promise(function(resolve, reject){
		f.call(null, ...args, function(err, ...args){
			if(err) return reject(err);
			resolve(args.length<2 ? args[0] : args);
		});
	});
}
//setTimeout의 프라미스화
function ptimeout(delay){
	return new Promise(function(resolve, reject){
		setTimeout(resolve, delay);
	});
}
//generator runner
function grun(g){
	const it=g();
	(function iterate(val){
		const x=it.next(val);
		if(!x.done) {
			if(x.value instanceof Promise){
				x.value.then(iterate).catch(err=>it.throw(err)); //<-iterate를 재귀적으로 호출한다.
			} else {
				setTimeout(iterate, 0, x.value); //<-js 인터프리터의 빠른 메모리 회수를 위한 테크닉
			}
		}
	})();
}
//이제 직관적인 코드를 쓸 수 있다!
function* theFutureIsNow() {
	// const dataA = yield nfcall(fs.readFile, 'a.txt');
	// const dataB = yield nfcall(fs.readFile, 'b.txt');
	// const dataC = yield nfcall(fs.readFile, 'c.txt');
	let data;
	try {
		yield Promise.all([
			nfcall(fs.readFile, 'a.txt'), nfcall(fs.readFile, 'b.txt'), nfcall(fs.readFile, 'c.txt')
		]);
	} catch(err) {
		console.error('Unable to read one or more input files: ' + err.message);
		throw err;
	}
	yield ptimeout(60*1000);
	try {
		yield nfcall(fs.writeFile, 'd.txt', data[0]+data[1]+data[2]);
	} catch(err) {
		console.error('Unable to write output file: ' + err.message);
		throw err;
	}
}
grun(theFutureIsNow);
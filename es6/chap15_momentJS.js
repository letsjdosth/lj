//Moment.js 라이브러리
//날짜를 적극적으로 조작할 필요가 있을 시 기본 Date 객체를 쓰는것보다 훨씬 나음
const moment=require('moment-timezone');

//타임존 명시
const d = new Date(Date.UTC(2016, 4, 27)); //utc의 경우 Date 메서드를 이용해 직접생성
const d2 = moment.tz([2016, 3, 27, 9, 19], 'America/Los_angeles').toDate(); //이외 타임존의 경우 moment.tz를 사용해 Date객체 생성.
const d3 = moment.tz([2016, 3, 27, 9, 19], 'Asia/Seoul').toDate(); //마찬가지로 월은 0부터 시작한다

//시간 전송시: 유닉스에포치(utc)+json 이용
//Date 인스턴스는 날짜 저장시 유닉스에포치(utc)로 저장하므로, 그냥 전송해도 안전.
const before = {d: new Date()};
console.log(before.d instanceof Date); //true
const json=JSON.stringify(before); //<-직렬화시 unix epoch(utc)로 json에 기록됨
const after=JSON.parse(json);
console.log(after.d instanceof Date); //false <-제이슨 명세에 날짜라는 데이터 타입이 정의되지는 않음
console.log(typeof after.d); //string <-하지만 스트링이므로, 복구가능
console.log(new Date(after.d));

//format
const origin_date = new Date(Date.UTC(1930, 4, 10));
console.log( //기본 Date의 method
	origin_date.toLocaleDateString(), //1930-5-10
	// origin_date.toLocaleFormat(), <-deprecated
	origin_date.toLocaleTimeString(), //09:00:00
	origin_date.toTimeString(), //09:00:00 GMT+0900 (GMT+09:00)
	origin_date.toUTCString() //Sat, 10 May 1930 00:00:00 GMT
);
console.log( //momentJS의 메소드
	moment(origin_date).format('YYYY-MM-DD'), //1930-05-10
	moment(origin_date).format('YYYY-MM-DD HH:mm'), //1930-05-10 09:00
	moment(origin_date).format('YYYY-MM-DD HH:mm Z'), //1930-05-10 09:00 +09:00
	moment(origin_date).format('YYYY-MM-DD HH:mm [UTC]Z'), //1930-05-10 09:00 UTC+09:00
	moment(origin_date).format('YYYY년 MM월 DD일 HH:mm'), //1930년 05월 10일 09:00
	moment(origin_date).format('dddd, MMMM [the] Do, YYYY'), //Saturday, May the 10th, 1930
	moment(origin_date).format('h:mm a') //9:00 am
);
//참고: https://momentjs.com/timezone/docs/#/data-formats/

//Date객체 요소 접근
console.log(
	origin_date.getFullYear(), //1930
	origin_date.getMonth(), //4 <-5월
	origin_date.getDate(), //10
	origin_date.getDay(), //6 <-토요일 (1:월~7:일)
	origin_date.getHours(), //9
	origin_date.getMinutes(), //0
	origin_date.getSeconds(), //0
	origin_date.getMilliseconds() //0
);
console.log( //UTC기준 메서드
	origin_date.getUTCFullYear(), //1930
	origin_date.getUTCMonth(), //4
	origin_date.getUTCDate() //10
);

//비교 및 연산
const d4 = new Date(1996, 2, 1);
const d5 = new Date(2009, 4, 27);
console.log(d4>d5, d4<d5); //false true <-Unix Epoch 숫자로 비교함. 숫자에 쓸 수 있는 연산 그대로 사용가능

const msDiff = d5-d4; //417744000000(밀리초)
const daysDiff = msDiff/1000/60/60/24; //4835(일)

const dates=[];
const min = new Date(2017, 0, 1).valueOf();
const delta = new Date(2020, 0, 1).valueOf() - min;
for(let i=0; i<10; i++){
	dates.push(new Date(min + delta*Math.random()));
}
dates.sort((a,b)=>b-a); //정렬. 넘긴 함수에 의해 unix epoch 값이 큰 것부터 작은 순으로 정렬된다.
console.log(dates);
// [ 2019-10-26T15:51:45.370Z,
//   2019-10-17T08:02:31.103Z,
//   2019-10-11T13:51:58.719Z,
//   2019-08-29T19:20:01.809Z,
//   2019-04-21T18:34:57.172Z,
//   2018-11-13T09:38:08.275Z,
//   2018-10-12T10:48:47.647Z,
//   2018-02-27T05:37:16.763Z,
//   2017-07-17T08:12:36.017Z,
//   2017-03-10T05:18:09.537Z ]
dates.sort((a,b)=>a-b); //거꾸로 작은 것부터 큰 것으로 정렬
console.log(dates);
// [ 2017-03-10T05:18:09.537Z,
//   2017-07-17T08:12:36.017Z,
//   2018-02-27T05:37:16.763Z,
//   2018-10-12T10:48:47.647Z,
//   2018-11-13T09:38:08.275Z,
//   2019-04-21T18:34:57.172Z,
//   2019-08-29T19:20:01.809Z,
//   2019-10-11T13:51:58.719Z,
//   2019-10-17T08:02:31.103Z,
//   2019-10-26T15:51:45.370Z ]

//momentJS 연산 메소드
let m=moment(); //현재
m.add(3,'days'); //3일 뒤
m.subtract(2,'years'); //2년 전, 3일 지난 날짜
m.moment(); //리셋
m.startOf('year'); //올해 1월 1일
m.endOf('month'); //올해 1월 31일
m.add(10,'hours').subtract(3,'days').endOf('month'); //<-체인 가능

//상대 날짜
moment().subtract(10,'seconds').fromNow(); //10초 전
moment().subtract(5,'minutes').fromNow(); //5분 전
moment().subtract(8,'hours').fromNow();
moment().subtract(300,'days').fromNow();
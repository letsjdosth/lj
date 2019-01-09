//js의 원시 타입(primitive)들
//불변(immutable).(변경시 새로 만든다)

//변수(variable)
let currentTempC=22; //선언 및 할당. let은 선언시에 1번만. (let은 es6의 새 키워드. 기존버전에선 var만.(차이가 있다고 함))
currentTempC=22.5; //값 변경 가능
let targetTempc, room1="conference_room_a", room2="lobby"; //동시 선언. 
//targetTempc는 선언만 되고 값이 안 들어감(undefined를 받게됨.) room1, room2는 각각 = 뒤에 값이 들어감.



//상수(constant)(new es6)
const ROOM_TEMP_C=21.5, MAX_TEMP_C=30; //동시 선언
//값 변경 불가
//컨벤션: 상수엔 보통 대문자와 언더바만



//식별자(identifier) : 변수,상수,함수 이름
//리터럴(literal) :  (값을 만드는 방법 중,) 프로그램 안에서 값을 직접 지정해 만드는 방법. 
//예로, 위의 22는 숫자형 리터럴. "lobby"는 문자형 리터럴.



//숫자 : 더블(부동소수점)밖에 없음. (int가 없다.. 때문에 정수계산도 부정확할 수 있음)
//계산이 중요한 작업은 js에서 하지 말 것
//숫자형 리터럴은 4가지 (10진수/2진수/8진수/16진수)+기타 숫자 관련 플레이스홀더
let count=10; //<-더블!
const blue=0x0000ff; //16진수
const umask=0o0022; //8진수
const roomTemp=21.5; //10진수
const c=3.0e6; //지수 표기. 3.0*10^6
const e=-1.6e-19; //지수 표기. -1.6*10^-19
const inf=Infinity; //무한대
const ninf=-Infinity; //음의 무한대
const nan=NaN; //숫자가 아님

//Number 객체 프로퍼티
const small=Number.EPSILON; //1에 더했을 때 1과ㅏ 구분되는 결과를 만드는 가장 작은 값 //2.220446049250313e-16
const bigInt=Number.MAX_SAFE_INTEGER; //표현가능한 가장 큰 정수
const minInt=Number.MIN_SAVE_INTEGER; //표현가능한 가장 작은 정수
const max=Number.MAX_VALUE; //표현가능한 가장 큰 수
const min=Number.MIN_VALUE; //표현가능한 가장 작은 수
const nInf2=Number.NEGATIVE_INFINITY; //-Infinity
const nan2=Number.NaN; //NaN
const inf2=Number.POSITIVE_INFINITY; // Infinity



//문자열(string)
//기본 유니코드임
//스트링은 기본적으로 '',""로 감쌈(파이썬과 동일 동작). 특수한 경우 ``(백틱,es6) 사용(탬플릿 등)
//html 관련 사용시엔 왠만하면 작은따옴표'' 사용(html 안에 ""를 써야하기 때문)
//이스케이프시 역슬래시 \ 사용
const dialog='Sam looked up, and said "hello, old friend!", as Max worked in.';
const imperative="Don't do that!";
const dialog2='He looked up and said "don\'t do that!" to Max.';

const newline="line1\nline2";
const carriage_return="Windows line 1\r\nWindows line2";
const tab='Speed:\t60kph';
const dollar='\$'; //es6
const elsethings="\' \" \\ \`"; // ' " \ `(es6)

const unicode_codepoint="De Morgan's law: \u2310(P\u22c0Q)\u21D4(\u2310P)\u22c1(\u2310Q)"; //16진수 코드포인트 입력
const latin1_codepoint="\xc9p\xe9e is fun, but foil is more fun.";

//concatenation
let currentTemp=19.5;
const message='the current temperature is '+currentTemp+'\u00b0C'; //es6 이전은 오직 +로 연결하는 방법 뿐
const message2=`the current temperature is ${currentTemp}\u00b0C`; //es6에선 백틱 사용 시 문자열 안에 ${variable} 로 해당 값을 집어넣을 수 있음
const message3='the current temperature'+`is ${currentTemp}`+'\u00b0C'; //+와 백틱을 섞어써도 된다

//여러줄 쓰기
const multiline="line1\nline2";
const multiline_multirepr=
"line1\n\
line2";//\는 줄바꿈 문자 이스케이프
const backtick_multiline=`line1
line2`;//백틱 사용시 있는 그대로 적용됨. (파이썬 """같은 느낌)
//하지만 매우 들여쓰기를 해치므로, 그냥 개행문자와 +로 이으며 들여쓰기를 맞출 것
const plus_multiline='line1\n'+
	'line2\n'+
	'line3';

//기타: js는 인터프리터가 묵시적 캐스팅을 매우 많이 하는 편.
// 3+'30'; //330 (앞 3이 스트링 취급됨)
// 3*'30'; //90 (뒤 30이 숫자 취급됨)
//절대 섞어쓰지 말것



//불리언(boolean)
let heating=true;
let cooling=false; //대소문자빼고는 파이썬과 같음. (절대 따옴표에 넣지 말 것)



//심볼(symbol)
//es6 도입. 유일한 토큰 (다른 어떤 심볼과도 동일하지 않음을 보장)
//그 외에는 원시 값의 특징을 모두 가짐.
const RED=Symbol("The color of a sunset!");
const ORANGE=Symbol("The color of a sunset!");
RED===ORANGE; //false



//null, undefined
//js의 특별타입
//둘다 존재하지 않음을 나타냄
//null은 프로그램에게 허용된 데이터 타입. 값을 모르거나 적용할 수 없는 경우엔 null
//undefined는 js 자체에서 사용하는 타입(쓸수는 있으나, 특정 경우가 아니면 쓰지 말아야 함). 미할당 변수의 동작을 고의로 흉내내야 할 때
//둘 중 뭘 쓸지 모르겠으면 null을 넣는 것을 권장
let currentTemp5; //<-undefined가 들어간다
const targetTemp5=null; //값을 모르면 null을 넣자
currentTemp5=19.5;
currentTemp5=undefined;//비권장

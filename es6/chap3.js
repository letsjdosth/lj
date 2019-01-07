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
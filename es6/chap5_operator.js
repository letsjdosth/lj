//산술연산자: +-*/% ++ -- 에 추가로 부호바꾸는용도의 -+
//전위/후위연산자 ++,--
let x=2;
const r1=x++ + x++; // 2+3 (x는 4가 되고 끝난다)
const r2=++x + ++x; // 5+6
const r3=x++ + ++x; // 6+8
const r4=++x + x++; // 9+9 (x는 10이 되고 끝난다)
console.log(r1,r2,r3,r4); //5 11 14 18

let y=10;
const r5=y-- + y--; // 10+9 (y는 8이 되고 끝난다)
const r6=--y + --y; // 7+6
const r7=y-- + --y; // 6+4
const r8=--y + y--; // 3+3 (y는 2가 되고 끝난다)
console.log(r5,r6,r7,r8); //19 13 10 6
//주의: ++,--는 내부에 파묻혀있을경우 버그 나기 쉬움
//주의: 후위연산자는 할당연산자보다 낮은 우선순위로 동작한다


//비교연산자
// 관계 비교) >,>=,<,<=
// 일치) ===, !== : 원시타입의 경우 타입+값이 같은지, 참조타입의 경우 같은 객체를 가리키는지 비교. 참조타입의 경우 python is와 비슷하지만 특수값(NaN) 등은 이를 사용할 수 없다는 점에서 차이 있음.
// 동등) ==, != : 같은 값을 갖도록 변환할 수 있는지 비교. python ==(값비교)보다 느슨하다. js 특유의 관대한 암묵적 캐스팅때문에 더 유연하게(엉망으로..) 작동하기 때문
// 그냥 동등비교연산자를 쓰지 말 것. 엿같은 결과가 나올 가능성이 많다(특히 0, 빈 문자열, null, undefined가 섞일 때.. 절대로 쓰지 말것)
const n=5; //원시 타입
const s='5'; //원시 타입
console.log(n===s, n!==s); //false true <-타입이 다름
console.log(n===Number(s), n!==Number(s)); //true false <-원시타입이므로 같은타입 같은값이면 같게 된다.
console.log(n==s, n!=s); //true false //<-변환해서 같으면 같다. 이런 사용은 권장하지 않음. 캐스팅 원칙을 제대로 알고있지 않으면 버그의 원인이 된다.

const a= {name: 'an object'};
const b= {name: 'an object'}; //<-객체이므로 값이 같아도 메모리가 다르면 다르다고 판단한다.
console.log(a===b, a!==b); //false true //<-(위 설명)
console.log(a==b, a!=b); //false true //<-객체는 js인터프리터가 암묵적캐스팅을 하지 않는다.

console.log(NaN===NaN,NaN==NaN); //false, false <-이런점에서 python is와는 다르다
console.log(isNaN(NaN)); //true <-전용 비교함수 사용

//주의: js 숫자는 모두 더블. 때문에 더블 형식으로 제대로 나타낼 수 없는 값으로 비교연산 시 엉망의 결과가 나옴
const n03=0.1+0.1+0.1;
console.log(n03===0.3); //false(!!!!) <-0.1이 더블로 제대로 나타내지지 않는 값이기 때문. (이런거 루프 조건으로 쓰면 망한다..)
console.log(n03); //0.30000000000000004
//대안: EPSILON을 이용한 느슨한 비교. 두개의 더블이 같다고 할만큼 가까운지 검사하자.
console.log(Math.abs((n03)-0.3)<Number.EPSILON); //true


//문자열 병합 +
console.log('hello'+' world!'); //hello world!
console.log(3+5+"8","3"+5+8); //88 358
//규칙: 왼쪽부터 더해감. 숫자 아닌 문자를 만나면 그때부터 '문자열로' 왼쪽을 캐스팅해 병합.
//46번째 줄의 첫 인자에서, 3+5는 숫자 더하기를 하고 이후 "8"을 만나서 3+5의 8을 "8"로 캐스팅한 후 "88"을 만들었다
//두번째 인자는 처음부터 문자이므로, 바로 오른쪽을 문자열로 캐스팅하고 "3"+"5"를 병합해 "35"를, 이후 ,"35+"8"을 병합해 "358"이 된다.


//논리연산자 &&(and) ||(or) !(not) 3종. (xor 등은 없어서 조합해 써야함.)
//순서는 not and or 순
//불리언에만 적용할수 있는것은 아님. 다른 타입에 논리연산시 규칙을 가지고 캐스팅됨.
//거짓:false, 거짓같은값(논리연산시 false가 됨): undefined, null, 0 ,NaN, ''(빈 문자열)
//참:true, 참같은값:위의 거짓같은값을 제외한 모든 값. 주의할 값으로는-> 모든 객체(valueOf()가 false여도), 배열(빈 배열 포함), ' '(공백만 있는 문자열), "false"(string)
//빈 배열은 참같은 값으로 취급되지만, []==false 는 또 true가 나옴(...) 빈 배열을 안전하게 false로 취급하고 싶을 시, arr.length(=0)을 사용)
console.log([]==false); //true

//중요: &&,||은 왼쪽부터 단축 평가(값을 확정할 수 있을시 이후 스킵)됨.
//중요: &&,||은 논리 결과를 결정한 값이 반환됨. 즉, 참같은값/거짓같은값을 섞어 쓰고 그것이 결과를 결정했다면, true,false가 아닌 해당 값이 반환됨.
let skipIt=true;
let xx=0;
let result=skipIt||xx++;
console.log(result,xx); //true, 0 (<-skipIt이 true이므로 or 연산은 뒤에 뭐가 오든 true. 따라서 js인터프리터는 뒤를 건너뛴다. 따라서 ++가 실행되지 않음.)
skipIt=false;
result=skipIt||xx++;
console.log(result,xx); //0, 1 (<-이번 or을 평가할때는 xx까지 봐야 한다. 평가 이후 xx가 증가한다.)(xx를 보고난 후 xx에 의해 논리연산 결과가 결정되었으므로, xx의 값인 0을 반환)

let doIt=false;
let yy=0;
result=doIt&&yy++;
console.log(result,yy); //false,0 (<-doIt이 false이므로 and는 뒤에 뭐가 오든 false. 따라서 또 건너뛰고, ++는 실행되지 않는다)
doIt=true;
yy=0;
result=doIt&&yy++;
console.log(result,yy); //0, 1 (<-이번 and 평가시에는 끝까지 봐야 한다.)(yy를 보고난 후 yy에 의해 논리연산 결과가 결정되었으므로, yy의 값인 0을 반환)

// ||의 반환값이 결정인자라는 것을 이용하는 유용한 패턴
let suppliedOptions=null;
let options= suppliedOptions||{name:'Default'};
console.log(options); //{ name: 'Default' }
suppliedOptions={name:'jun'};
options= suppliedOptions||{name:'Default'};
console.log(options);//{ name: 'jun' }
// 할당시 ||을 이용하고 뒤에 기본값을 적용해, 할당이 주 목적인 if문을 간결하게 대체할 수 있다.


//조건연산자 (조건? 참일때:거짓일때)
const t_or_f=false;
const res_if=t_or_f ? "did it!" : "didn't do it";
console.log(res_if); //didn't do it
//표현식이므로, 다른 표현식과 결합해 편하게 사용 가능
//또한 (흐름제어가 아닌) 단순 '값을 얻는 것'이 목적일 경우, if(){}else{}보다 조건3항연산자를 이용해 표현식을 쓰는것이 언제나 나음.


//쉼표연산자
//(표현식,표현식) 형태
//차례대로 표현식을 평가 후, 두번째 표현식의 결과를 반환.
//여러 표현식을 실행하되, 값으로 표현한 것은 마지막 표현식의 결과뿐일 떄 사용
//우선순위가 매우 낮으므로, 언제나 괄호를 사용하는 것을 권장
let xxx=0,yyy=10,zzz;
zzz=(xxx++,yyy++);
console.log(xxx,yyy,zzz); //0, 11, 10 (뒤의 ++는 평가후 동작한다)


//비트연산자 &|^~ (and,or,xor,not) << >> >>>(왼쪽 쉬프트, 부호따라가는 오른쪽 쉬프트, 0으로채우는 오른쪽 쉬프트)
//우선순위는 not, and, xor, or 순
//^는 거듭제곱이 아니라 비트 xor이다
console.log(0b1010&0b1100,0b1010|0b1100,0b1010^0b1100,~0b1010); //8(0b1000) 14(0b1110) 6(0b0110) -11(보수. a가 양수일때 ~a는 -a-1이 된다.))
console.log(0b1010<<1, 0b1010<<2); //20(0b000010100) 40(0b000101000) (a<<n은 a*2^n가 된다)
console.log(22>>1, 22>>>1); //11 11 (a>>>n은 a/(2^n)이 된다. >>는 마지막자리에 따라 부호가 바뀔 수 있으니 주의)


//typeof
//뒤 피연산자의 타입을 반환..하나 엉망으로 반환함....
//연산자이므로 괄호 안 써도 된다 (써도 상관은 없음)
console.log(typeof undefined, typeof null, typeof {}, typeof function(){}, typeof [], typeof true, typeof "", typeof Symbol(), typeof 1);
//undefined object(!!!!!!!) object function object boolean string symbol number
//typeof null은 object가 나옴 (null이 원시타입임에도 불구하고...) 이는 버그 수준의 반환값이나, 이미 이를 이용하는 코드가 많이 생겨서..그냥 이렇게 쓰기로 명세에...


//void
//뒤를 평가후 undefined를 반환.
console.log(void 0); //undefined


//할당
//=, 복합할당 +=,-=,*=,/=, %=, <<=, >>=, >>>=, &=, |=, ^=
//오른쪽->왼쪽 평가. 왼쪽에는 값을 가질 수 있는 요소여야 함.(const는 선언이지 엄밀히는 할당이 아님)
//자체가 표현식이므로, 다시 할당 가능
let v,v0;
v=v0=9.8; //v0가 9.8이 되고, 이후 v가 9.8이 된다

const nums=[3,5,15,7,5];
let nn,ii=0;
while((nn=nums[ii])<10 && ii++<nums.length){
	console.log(`Number less than 10: ${nn}.`);
}
console.log(`Number greater than 10 found: ${nn}.`);
console.log(`${nums.length-ii-1} Numbers remain.`);
// Number less than 10: 3.
// Number less than 10: 5.
// Number greater than 10 found: 15.
// 2 Numbers remain.


//해체 할당(destructuring assignment)
//1. 객체 해체 할당
const obj={bb:2, cc:3, dd:4};
const {aa,bb,cc}=obj; //주의: 객체의 프로퍼티명과 해체할당할 변수 이름이 완전히 일치해야 한다.
console.log(aa,bb,cc); //undefined 2 3 (dd를 추가해 출력해보면, dd가 선언이 안되었다는 에러가 난다.)

const obj2={ee:3,ff:4,gg:5};
let ee,ff,gg;
//{ee,ff,gg}=obj; //error (<-선언/할당 분리해서 해체할당시 괄호를 꼭 써야 한다. 안 그러면 블록statement으로 해석함.)
({ee,ff,gg}=obj2); //괄호를 할당문 좌우 전체에 씌워야함
console.log(ee,ff,gg); //3 4 5

//2. 배열 해체 할당
//배열은 프로퍼티가 없으므로, 순서대로 대응됨
const arr=[1,2,3];
let [hh,kk,ll]=arr; //배열 해체시 변수 이름은 마음대로 정해도 된다.
console.log(hh,kk,ll); //1 2 3

//길이가 안맞으면, 뒤는 버려짐.(확산 연산자 ...를 이용하면 남은 요소를 한 배열에 넣을 수 있음)
const arr2=[4,5,6,7,8];
let [mm,oo,...rest]=arr2;
console.log(mm,oo,rest); //4 5 [ 6, 7, 8 ]

//응용: 변수 값 서로 바꾸기
let pp=5, qq=10;
[pp,qq]=[qq,pp];
console.log(pp,qq); //10 5


//기타 연산자: in(프로퍼티 존재), new(객체 인스턴스화), instanceof(프로토타입 체인 테스트), ...(확산), delete(삭제), 접근: .(점),[](대괄호)


//탬플릿 문자열 응용: ${} 안엔 표현식을 받으므로, 값을 즉석에서 계산해 넣을 수 있음
const roomTempC=21.5;
let currentTempC=19.5;
const message=`The current temperature is `+ `${currentTempC-roomTempC}\u00b0C different than room temperature.`;
const fahrenheit=`The temperature is ${currentTempC*9/5+32}\u00b0F`;
console.log(message,'\n',fahrenheit);
// The current temperature is -2°C different than room temperature.
//  The temperature is 67.1°F
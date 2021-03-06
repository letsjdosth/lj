//날짜와 시간

//Unix Epoch: 1970년 1월 1일 0시 0분 0초(utc)로부터 몇밀리초가 지났는지로 시간을 표현
//js Date는 내부적으로는 유닉스 에포치 사용.
const d = new Date();
console.log(d); //출력시 기본은 그레고리력 출력
console.log(d.valueOf()); //유닉스 에포치 출력
//노드 
// 2019-02-25T13:36:51.412Z
// 1551101811412
//엣지
// Mon Feb 25 2019 22:37:40 GMT+0900 (대한민국 표준시)
// 1551101860057

//만드는 4가지 방법
//1.
new Date; //현재 날짜
//2.
new Date(2015, 0); //2015년 1월 1일 0시 //월은 0부터 시작함!주의!
new Date(2015, 1); //2015년 2월 1일 0시;
new Date(2015, 1, 14); //2015년 2월 14일 0시
new Date(2015, 1, 14, 13); //2015년 2월 14일 오후 1시
new Date(2015, 1, 14, 13, 30); //2015년 2월 14일 오후 1시 30분
new Date(2015, 1, 14, 13, 30, 5); //2015년 2월 14일 오후 1시 30분 5초
//3.
new Date(0); //1970년 1월 1일 0시 0분 0초
new Date(1000); //1970년 1월 1일 0시 0분 1초
new Date(1463443200000);
new Date(-365*24*60*60*1000); //1969년 1월1 일 0시 0분 0초 <-기준시간 이전 날짜는 음수표기
//4.
new Date('June 14, 1903'); //Sun Jun 14 1903 00:00:00 GMT+0900 (대한민국 표준시) <-지역표준시로 자동으로 적용됨.
new Date('June 14, 1903 GMT-0000'); //[date] Sun Jun 14 1903 09:00:00 GMT+0900 (대한민국 표준시)

//문제점: 같은 코드가 현재 지역의 표준시에 따라 출력이 달라짐.-_- (내부적으로는 unix epoch - utc로 저장하나, 출력시 운영체제 설정에 맞춰서 변환함)
//하지만 출력 타임존을 명시할 방법이 없음. 이는 세계 동시 서비스에서 매우 짜증나는 동작을 하게 함


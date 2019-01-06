$(document).ready(function(){ //브라우저가 html 코드를 모두 불러왔는지 확인. 이후 {} 안 실행.
	'use strict'; //js 인터프리터가 아래 코드를 더 '엄격하게' 처리

	paper.install(window); //전역스코프에 paper.js를 설치
	paper.setup(document.getElementById('mainCanvas')); //mainCanvas에 연결
	
	//원 그리기
	/*
	var c;
	for(var x=25; x<400; x+=50){ //초기값;제한조건(참일때 돔);증가분
		for(var y=25; y<400; y+=50){
			c=Shape.Circle(x,y,20); //x,y,radius
			c.fillColor='green';
		}
	}
	*/

	//hello world 원 만들기
	var c=Shape.Circle(200,200,80);
	c.fillColor='black';
	var text=new PointText(200,200);
	text.justification='center';
	text.fillColor='white';
	text.fontSize=20;
	text.content='hello world';

	//클릭하면 원 그려지게 하기
	var tool=new Tool(); //paper의 비동기 이벤트 처리 객체
	tool.onMouseDown=function(event){ //onMouseDown은 이벤트 핸들러로, 해당 이벤트가 발생할 때마다 뒤 적절한 보고 후 함수를 호출
		//var c=Shape.Circle(event.point.x, event.point.y, 20); //event.point.x, ..y로 클릭 위치가 보고되어 넘어온다
		var c=Shape.Circle(event.point, 20); //(!)js는 넘겨받은 매개변수를 바탕으로 적절히 추론한다. #튜플 언패킹..같은건지 어떤건지..모르겠움(나중에)
		c.fillColor='green';
	}


	paper.view.draw(); //실제로 그리기

	console.log('main.js loaded');
})
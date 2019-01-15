//제어문 예제

//보조 함수(helper)
function rand(m,n){
	return m+Math.floor((n-m+1)*Math.random());
}
function randFace(){
	return ['crown','anchor','heart','spade','club','diamond'][rand(0,5)]; 
	//앞의 []는 배열이고, 뒤의 []는 인덱스 접근자(배열의 대괄호 접근자)이다. 즉, randFace는 6가지 모양중 하나를 랜덤으로 뽑게 됨
}


let funds=50;
let round=0;

while(funds>1 && funds<100){ //funds가 0펜스가 되거나 100펜스 이상이 되면 게임을 끝냅니다.
	round++;
	console.log(`round: ${round}`);
	console.log(`starting funds: ${funds}p`);
	//돈을 겁니다. 이 판에 걸 돈의 총량을 먼저 랜덤으로 뽑습니다.
	//(특수)7펜스가 나오면, 가지고 있는 모든 돈을 털어 하트에 겁니다
	//아니면 랜덤으로 돈의 일부를 다시 뽑아 랜덤으로 뽑힌 모양에 겁니다.
	const bets={crown:0, anchor:0, heart:0, spade:0, club:0, diamond:0};
	let totalBet=rand(1,funds);
	if(totalBet===7){
		totalBet=funds;
		bets.heart=totalBet;
	} else if(totalBet===13) {
		console.log('Unlucky! Skip this round...');
		continue;
	} else {
		let remaining=totalBet;
		do{
			let bet=rand(1, remaining);
			let face=randFace();
			bets[face]=bets[face]+bet;
			remaining=remaining-bet;
		} while(remaining>0);
	}
	funds=funds-totalBet;
	console.log('\tbets: '+Object.keys(bets).map(face=>`${face}: ${bets[face]}p`).join(',')+`(total: ${totalBet} pence)` );
	
	//주사위를 굴립니다
	const hand=[];
	for (let roll=0; roll<3; roll++){
		hand.push(randFace());
	}
	console.log(`\thand: ${hand.join(',')}`);

	//그림을 맞췄으면 돈을 가져옵니다
	let winnings=0;
	for (let die=0; die<hand.length; die++){
		let face=hand[die];
		if (bets[face]>0){
			winnings=winnings+bets[face];
		}
	}
	funds=funds+winnings;
	console.log(`\twinnings: ${winnings}p`);
	console.log(`\tending funds: ${funds}p`);
}

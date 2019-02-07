//map
const u1={name:'Cynthia'};
const u2={name:'Jackson'};
const u3={name:'Olive'};
const u4={name:'James'};
const userRoles=new Map(); //맵 생성
userRoles.set(u1,'User'); //맵에 요소 등록시 set 메소드 이용. key,value 순임
userRoles.set(u2,'User').set(u3,'Admin'); //체인 가능. 혹은 Map 생성시 생성자에 배열을 넘겨도 됨.

console.log(userRoles.get(u2));// User
console.log(userRoles.has(u1),userRoles.get(u1));// true 'User'
console.log(userRoles.has(u4),userRoles.get(u4));// false undefined <-없으면 undefined 반환

userRoles.set(u1,'Admin'); //<-덮어씌워진다.
console.log(userRoles.get(u1)); //Admin

console.log(userRoles.size); //3
console.log(userRoles.keys(),userRoles.values(),userRoles.entries());
//[Map Iterator] { { name: 'Cynthia' }, { name: 'Jackson' }, { name: 'Olive' } } 
//[Map Iterator] { 'Admin', 'User', 'Admin' } 
//[Map Iterator] {  [ { name: 'Cynthia' }, 'Admin' ],  [ { name: 'Jackson' }, 'User' ],  [ { name: 'Olive' }, 'Admin' ] }
//순회 예(for...of...)
for(let u of userRoles.keys()){
	console.log(u.name);
}
// Cynthia
// Jackson
// Olive
for(let r of userRoles.values()){
	console.log(r);
}
// Admin
// User
// Admin
for(let [u,r] of userRoles.entries()){ //참고로 of 뒤에 그냥 userRoles를 넣으면, userRoles.entries()가 순회됨.
	console.log(`${u.name}:${r}`);
}
// Cynthia:Admin
// Jackson:User
// Olive:Admin
//배열자체로 가져올때는 확산연산자 이용
console.log([...userRoles.values()]);

userRoles.delete(u2); //등록된 요소 삭제
console.log(userRoles.size); //2

userRoles.clear(); //맵 초기화
console.log(userRoles.size); //0


//weakmap
//파이썬 WeakKeyDictionary처럼 키의 가비지콜렉션을 막지 않는 map. 추가로 다음 제약
//1. 키는 반드시 객체 2.weakmap은 이터러블이 아님 3.clear() 없음
const SecretHolder=(function(){
	const secrets=new WeakMap();
	return class{
		setSecret(secret){
			secrets.set(this,secret);
		}
		getSecret(){
			return secrets.get(this);
		}
	}
})();
const a=new SecretHolder();
const b=new SecretHolder();
a.setSecret('secret A');
b.setSecret('secret B');
console.log(a.getSecret(), b.getSecret()); //secret A secret B


//set
//중복 비허용
const roles=new Set();
roles.add('User'); //추가
roles.add('Admin');
console.log(roles,roles.size);// Set { 'User', 'Admin' } 2
roles.add('User');
console.log(roles.size);// 2 <-중복추가 안 됨
roles.delete('Admin'); //<-반환값이 있음. 해당 값이 존재하고 삭제 성공했다면 true, 해당 값이 존재하지 않았다면 false
console.log(roles); //Set { 'User' }


//weakset
//파이썬 WeakSet과 마찬가지로 포함한 요소의 가비지콜렉션을 막지 않는 set. 단 다음 제약
//1. 객체만 포함가능 2. 이터러블 아님
const naughty=new WeakSet();
const children=[{name:'Suzy'}, {name:'Derek'}];
naughty.add(children[1]);
for(let child of children){
	if(naughty.has(child)){
		console.log(`Coal for ${child.name}`);
	} else {
		console.log(`Present for ${child.name}!`);
	}
}
// Present for Suzy!
// Coal for Derek

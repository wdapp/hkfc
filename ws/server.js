var WebsocketServer = require('ws').Server;
var http = require('http');
var players = require('./players');
var cards = require('./cards');
var compareCard = require('./compareCard');
var express = require('express');
var app = express();

// http.createServer(function (request, response) {

// 	response.writeHead(200, {'Content-Type':'text/plain;charset=utf-8'});
// 	response.header("Access-Control-Allow-Origin", "*");
// 	var s = JSON.stringify(players);

// 	response.end(s);

// }).listen(8888);
//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
app.get('/', function (req, res) {
	res.send(players);
})

var server = app.listen(8888, function () {

	var host = server.address().address
	var port = server.address().port

// console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
// console.log(cards);
// console.log(cards[0].num);
// console.log(cards[0].name);
// console.log(cards[0].type);

var nowCards = [];

// for(var i=0;i<cards.length;i++){
// 	nowCards.push(cards[i]);
// }


var players = [
{
	name: '燃烧吧，蛋蛋儿军',
	gold: '',
	id:0,
	photoIdx: 0
},
{
	name: '地方政府',
	gold: '',
	id:0,
	photoIdx: 1
},
{
	name: '手机超人',
	gold: '',
	id:0,
	photoIdx: 2
},
{
	name: '天灵灵，地灵灵',
	gold: '',
	id:0,
	photoIdx: 3
},
{
	name: '哟哟，切克闹',
	gold: '',
	id:0,
	photoIdx: 4
}
];
var numb1 = -1;
var numb2 = -1;
var numb3 = -1;
var numb4 = -1;
var numb5 = -1;

var num1 = -1;
var num2 = -1;
var num3 = -1;
var num4 = -1;
var num5 = -1;
var num6 = -1;
var num7 = -1;
var num8 = -1;
var num9 = -1;
var num10 = -1;

var equality = [];
var equ = true;
var difference = 0;

var maxPeople = 1;
var ply = [];
var ready = false;
var ONE_BY_ONE = 0;
var status = {
	id:1,
	game:"开始游戏",
play:false,//选择开关
tip:"等待",//等待
select:"genzhu",//全下 弃牌 
star:false,//是否开始游戏
first:1,//第一个选择的人。过 下注 放弃 梭哈等
cards:[],
allcards:[],
clientNumb:0,
compareCard:[],//要比的牌
compareNum: [
[],
[],
[],
[],
[]
	],//牌数值数组
	allNum:0,
	chips:10,
	gold:[1000,1000,1000,1000,1000],
	allGold:0,
	allSelect:[0,0,0,0,0],
	allow:[true,true,true,true,true]

};
//玩家加入大厅
var wss = new WebsocketServer({
	port:3001
})

// console.log(compareCard({
// 	type:"pian",
// 	num:11,
// 	name:"J"
// },
// {
// 	type:"pian",
// 	num:12,
// 	name:"Q"
// },
// {
// 	type:"hei",
// 	num:14,
// 	name:"A"
// }))

var sockets = [];
var client = [];

var initGame = true;//第一次初始化开关
wss.on("connection",function(wx){
sockets.push(wx);//记录每一个客户端
console.log("当前服务端玩家数组："+sockets);

// console.log("客户端id："+wx._ultron.id);//进入房间id


console.log("当前服务端玩家数："+sockets.length);


ply.push(players[sockets.length-1]);//记录每一个 客户端中的.玩家信息 用户名，金币等
//分发入座信息
console.log("当前入座玩家数组:");
console.log(ply);

for(var i=0;i<ply.length;i++){
	sockets[i].send(JSON.stringify(ply));

}
	//找自己
	for(var i=0;i<sockets.length;i++){
		if(sockets[i] == wx){

			//初始化id
			sockets[i].send("自己"+(i+1));
			break;
		}
	}

	wx.on("message",function(msg){
		var obj = JSON.parse(msg);
		console.log(obj.id);console.log("向服务端发出请求");

	//收到消息
	if(obj.id==1){
		console.log("id1:");
		console.log(msg);
	//
	updateClient(client,1);
	client.push(JSON.parse(msg));

	selecting(1);

}else if(obj.id==2){
	console.log("id2:");
	console.log(msg);
	//
	updateClient(client,2);
	client.push(JSON.parse(msg));

	selecting(2);

}else if(obj.id==3){
	console.log("id3:");
	console.log(msg);
	//
	updateClient(client,3);
	client.push(JSON.parse(msg));

	selecting(3);

}else if(obj.id==4){
	console.log("id4:");
	console.log(msg);
	//
	updateClient(client,4);
	client.push(JSON.parse(msg));

	selecting(4);

}else if(obj.id==5){
	console.log("id5:");
	console.log(msg);
	//
	updateClient(client,5);
	client.push(JSON.parse(msg));

	selecting(5);

}
console.log("client:");
console.log(client);

	//判断准备人数
	var zhunbei = 0;
	for(var i=0;i<client.length;i++){
		if(client[i].ready==true&&client[i].length!=0){
			zhunbei++;
			console.log("准备人数"+zhunbei);
			if(zhunbei==sockets.length){
				ready=true;
			}else{
				ready=false;
			}
		}
	}

		//判断开始游戏
		if(ready&&sockets.length>=2&&status.star==false){
		//开始游戏。发送游戏状态。	
		console.log("开始游戏");
		status.clientNumb = client.length;
		status.allNum = 1;
		ONE_BY_ONE = 0;
		status.star = true;//标记开始游戏
		status.allSelect = [0,0,0,0,0];
		status.chips = 10;

		for(var i=0;i<client.length;i++){
			status.gold[i]-=status.chips;
			status.allGold+=status.chips;
		}

		for(var i=0;i<cards.length;i++){
			nowCards.push(cards[i]);
		}
		console.log("洗牌,共牌张"+nowCards.length);


	}


		//开始游戏状态
		if(status.star){
			console.log("剩下的发牌库");
			console.log(nowCards);


			//给所有人发全局消息
			if(initGame){
				console.log("首发----------------");
				for(var i=0;i<sockets.length;i++){

					firestCatCards(i);
				}

				firstSelect();//计算出牌权

				console.log("发牌前status");
				console.log(status);

				//玩家交互
				status.allow = [true,false,true,true,true];

				status.allNum = 0;

				for(var i=0;i<sockets.length;i++){

				//首次发牌
				sockets[i].send("status"+JSON.stringify(status));
			}
		}else{

			console.log("继续选择-----------");

			console.log(status.allSelect);

			if(equ==true){

				ONE_BY_ONE++;
				console.log("共"+client.length+"人,"+ONE_BY_ONE+"已经做出选择");

				status.first++;
				if(status.first>client.length){
					status.first = 1;
				}
			}else{
				console.log("下注不均，进行跟注或放弃");
			}

			if(ONE_BY_ONE>=client.length){

				for (var i = 0; i < client.length; i++) {
					if(status.allSelect[i]!=status.chips){

						equality.push(i);
					}
				}

				if(equality.length!=0){
					console.log("剩下 id 人 进行跟注或放弃选择");
					console.log(equality);

					equ=false;
					status.allow[0] = false;
					status.allow[1] = false;
					status.allow[3] = false;

					status.first = equality[0]+1;
					// difference = status.chips - status.allSelect[0];

					equality=[];
				}else{
					equ=true;

					status.allow = [true,true,true,true,true];
					status.allow[0] = true;
					status.allSelect = [0,0,0,0,0];

					ONE_BY_ONE=0;
					status.game = "fapai";
				status.allNum++;//第几回合

				console.log("第"+status.allNum+"回合");

				if(status.allNum<4){
					for(var i=0;i<sockets.length;i++){
						CatCards(i);
					}

				firstSelect();//计算出牌权
				console.log("继续发牌-----------");

			}else{
				firstSelect();//计算出牌权

				status.game = "游戏结束"+status.first+"号玩家胜利";

				status.gold[status.first-1] += parseInt(status.allGold);
				status.allGold = 0;
			}

		}



	}else{
		status.game = "select";

	}


	for(var i=0;i<sockets.length;i++){

		sockets[i].send("status"+JSON.stringify(status));
	}


}
			initGame = false;//初始化游戏第一次发牌发两张

		}


	})

	function selecting(index){
		for(var i=0;i<client.length;i++){
			if(client[i].id == index){
				var obj = client[i];
			}
		}

		console.log("发消息的玩家对象");
		console.log(obj);
		switch(obj.select){
			case 'suoha':
			status.allow[0] = false;
			status.allow[3] = false;

			status.chips = parseInt(obj.gold[obj.id-1]);
			status.gold[obj.id-1]-=parseInt(obj.gold[obj.id-1]);
			status.allGold+=parseInt(obj.gold[obj.id-1]);

			status.allSelect[obj.id-1] = parseInt(obj.gold[obj.id-1]);//添加 id 本次下注多少
			break;
			case 'genzhu':

			if(equ==true){
				status.allow[0] = false;
				status.gold[obj.id-1]-=parseInt(status.chips);
				status.allGold+=parseInt(status.chips);
				console.log(obj.id);

				status.allSelect[obj.id-1] = parseInt(status.chips);
			}else{

		
				difference = status.chips - status.allSelect[obj.id-1];

				status.allow[0] = false;
				status.gold[obj.id-1]-=parseInt(difference);
				status.allGold+=parseInt(difference);
				console.log(obj.id);

				status.allSelect[obj.id-1] = parseInt(status.chips);
			}
			
			break;
			case 'jiazhu':
			status.allow[0] = false;
			//如果有人加注 其他人只能跟注 或 放弃。不能梭哈 加注 过
			status.allow[1] = false;
			status.allow[3] = false;


			status.chips+=10;
			status.gold[obj.id-1]-=parseInt(status.chips);
			status.allGold+=parseInt(status.chips);

			status.allSelect[obj.id-1]=(parseInt(status.chips));
			break;
			case 'guo':
			// status.gold[obj.id-1]-=status.chips;
			// status.allGold+=status.chips;
			
			break;
			case 'fangqi':
			obj.delcli = false;
			
			break;
		}
	}

	function firstSelect(){
		//选择权
		if(status.allNum!=5){
			if(initGame){
				for(var i=0;i<status.allcards.length;i++){
					if(i%2!=0){
						status.compareCard.push(status.allcards[i]);
					}
				}
			}else{
				console.log("从第x个元素开始");
				console.log(2*client.length+parseInt((status.allNum-2)*client.length));
				for(var i=2*client.length+parseInt((status.allNum-2)*client.length);i<status.allcards.length;i++){
					status.compareCard.push(status.allcards[i]);
				}
				console.log("当前比较牌数组");
				console.log(status.compareCard);

			}
		}else{

			for(var i=0;i<2*client.length;i++){
				if(i%2==0){
					status.compareCard.push(status.allcards[i]);
				}
			}

			console.log("当前比较牌数组");
			console.log(status.compareCard);

		}


		switch(status.allNum){
			case 1:
			for(var i=0;i<client.length;i++){

				status.compareNum[status.allNum-1].push(compareCard(status.compareCard[i]));

			}
			break;
			case 2:

			for(var i=0;i<client.length;i++){
				status.compareNum[status.allNum-1].push(compareCard(status.compareCard[i],status.compareCard[i+client.length]));
			}
			break;
			case 3:
			for(var i=0;i<client.length;i++){
				status.compareNum[status.allNum-1].push(compareCard(status.compareCard[i],status.compareCard[i+client.length],status.compareCard[i+2*client.length]));
			}
			break;
			case 4:
			for(var i=0;i<client.length;i++){
				status.compareNum[status.allNum-1].push(compareCard(status.compareCard[i],status.compareCard[i+client.length],status.compareCard[i+2*client.length],status.compareCard[i+3*client.length]));
			}
			break;
			case 5:
			for(var i=0;i<client.length;i++){
				status.compareNum[status.allNum-1].push(compareCard(status.compareCard[i],status.compareCard[i+client.length],status.compareCard[i+2*client.length],status.compareCard[i+3*client.length],status.compareCard[i+4*client.length]));
			}
			break;
		}

		console.log("牌型大小:------------");
		console.log(status.compareNum);

		maxPeople = status.compareNum[status.allNum-1][0];
		for(var i=0;i<status.compareNum.length;i++){
			if(maxPeople<status.compareNum[status.allNum-1][i]){
				maxPeople = status.compareNum[status.allNum-1][i];
			}
		}	
		for(var i=0;i<status.compareNum[status.allNum-1].length;i++){
			if(maxPeople==status.compareNum[status.allNum-1][i]){
				console.log("出牌人ID");
				console.log((i+1));
				status.first=(i+1);
				break;
			}
		}

	}



function CatCards(i){//发牌
	switch((i+1)){
		case 1:
		status.cards = [];

		this.numb1 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.numb1]);
		status.allcards.push(nowCards[this.numb1]);
		nowCards.splice(this.numb1,1);

		console.log(this.numb1);
		break;
		case 2:
		status.cards = [];

		this.numb2 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.numb2]);
		status.allcards.push(nowCards[this.numb2]);
		nowCards.splice(this.numb2,1);

		console.log(this.numb2);
		break;
		case 3:
		status.cards = [];

		this.numb3 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.numb3]);
		status.allcards.push(nowCards[this.numb3]);
		nowCards.splice(this.numb3,1);

		console.log(this.numb3);
		break;
		case 4:
		status.cards = [];

		this.numb4 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.numb4]);
		status.allcards.push(nowCards[this.numb4]);
		nowCards.splice(this.numb4,1);

		console.log(this.numb4);
		break;
		case 5:
		status.cards = [];

		this.numb5 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.numb5]);
		status.allcards.push(nowCards[this.numb5]);
		nowCards.splice(this.numb5,1);

		console.log(this.numb5);
		break;

	}

	console.log("发完牌,当前张数"+nowCards.length);
	console.log(status);
}


function firestCatCards(i){//发牌
	switch((i+1)){
		case 1:
		status.cards = [];

		this.num1 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num1]);
		status.allcards.push(nowCards[this.num1]);
		nowCards.splice(this.num1,1);

		this.num2 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num2]);
		status.allcards.push(nowCards[this.num2]);
		nowCards.splice(this.num2,1);

		break;
		case 2:
		status.cards = [];

		this.num3 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num3]);
		status.allcards.push(nowCards[this.num3]);
		nowCards.splice(this.num3,1);

		this.num4 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num4]);
		status.allcards.push(nowCards[this.num4]);
		nowCards.splice(this.num4,1);
		break;
		case 3:
		status.cards = [];

		this.num5 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num5]);
		status.allcards.push(nowCards[this.num5]);
		nowCards.splice(this.num5,1);

		this.num6 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num6]);
		status.allcards.push(nowCards[this.num6]);
		nowCards.splice(this.num6,1);
		break;
		case 4:
		status.cards = [];

		this.num7 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num7]);
		status.allcards.push(nowCards[this.num7]);
		nowCards.splice(this.num7,1);

		this.num8 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num8]);
		status.allcards.push(nowCards[this.num8]);
		nowCards.splice(this.num8,1);
		break;
		case 5:
		status.cards = [];

		this.num9 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num9]);
		status.allcards.push(nowCards[this.num9]);
		nowCards.splice(this.num9,1);

		this.num10 = parseInt(Math.random()*nowCards.length);
		status.cards.push(nowCards[this.num10]);
		status.allcards.push(nowCards[this.num10]);
		nowCards.splice(this.num10,1);
		break;

	}

	console.log("发完牌,当前张数"+nowCards.length);
	console.log(status);
}

function updateClient(cli,k){
	for(var i=0;i<cli.length;i++){
		if(cli[i].id==k){
			cli.splice(i,1);
			break;
		}
	}
}




wx.on('close',function(){

	for(var i=0;i<sockets.length;i++){
		if(sockets[i] == this){
			status.clientNumb = 0;
			ONE_BY_ONE=0;
			ready=false;
			status.star = false;
			initGame = true;
			status.allcards = [];
			status.allNum = 0;
			status.compareCard = [];
			status.compareNum = [
			[],
			[],
			[],
			[],
			[]
			];
			status.gold = [1000,1000,1000,1000,1000];
			status.chips = 10;
			status.allSelect=[0,0,0,0,0];
			status.allow = [true,true,true,true,true];
			status.allNum = 0;
			difference = 0;
			equ = true;

			// nowCards = cards;
			nowCards = [];
			sockets.splice(i,1);//玩家推出，删除客户端
			client.splice(i,1);
			players[i].id = 0;
			ply.splice(i,1);
			console.log("当前服务端玩家数"+sockets.length);
			break;
		}
	}

})

})
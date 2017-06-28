

// var xmlhttp=null;
// var players = null;
// if (window.XMLHttpRequest)
//   {// code for Firefox, Opera, IE7, etc.
//   xmlhttp=new XMLHttpRequest();
//   }
// else if (window.ActiveXObject)
//   {// code for IE6, IE5
//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//   }

//   xmlhttp.onreadystatechange=function change()
// {
// if (xmlhttp.readyState==4&&xmlhttp.status==200)
//   {// 4 = "loaded"
//     var obj = JSON.parse(xmlhttp.response);
    
//     players=obj.players;

//   }
// };

// xmlhttp.open("GET","http://localhost:8888",false);
// xmlhttp.send(null);



var players = [
	{
		name: '燃烧吧，蛋蛋儿军',
		gold: 3000,
		photoIdx: 0
	},
	{
		name: '地方政府',
		gold: 2000,
		photoIdx: 1
	},
	{
		name: '手机超人',
		gold: 1500,
		photoIdx: 2
	},
	{
		name: '天灵灵，地灵灵',
		gold: 500,
		photoIdx: 3
	},
	{
		name: '哟哟，切克闹',
		gold: 9000,
		photoIdx: 4
	},
	{
		name: '学姐不要死',
		gold: 5000,
		photoIdx: 5
	},
	{
		name: '提百万',
		gold: 10000,
		photoIdx: 6
	}
];


var players = null;


module.exports = {
	players: players
};
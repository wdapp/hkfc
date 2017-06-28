// var xmlhttp=null;

// function loadXMLDoc(url)
// {
// if (window.XMLHttpRequest)
//   {// code for Firefox, Opera, IE7, etc.
//   xmlhttp=new XMLHttpRequest();
//   }
// else if (window.ActiveXObject)
//   {// code for IE6, IE5
//   xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//   }

//   xmlhttp.onreadystatechange=change;
//   xmlhttp.open("GET",url,true);
//   xmlhttp.send(null);
// }

// function change()
// {
// if (xmlhttp.readyState==4&&xmlhttp.status==200)
//   {// 4 = "loaded"
//     var obj = JSON.parse(xmlhttp.response);
//     return obj.players;

//   }
// };

// loadXMLDoc("http://localhost:8888");
// var s = change();    

// // module.exports = loadXMLDoc;
// module.exports = s;
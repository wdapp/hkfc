function compareCard(a,b,c,d,e){
		var sum = 0;//记录牌的大小值
		switch(arguments.length){//一张牌      两张牌 三张牌 四张牌 五张牌
			case 1:
			console.log("一张牌大小值");

			sum+=arguments[0].num*10;
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(arguments[i].type=="hei"){
						sum+=4;
					}else if(arguments[i].type=="hong"){
						sum+=3;
					}else if(arguments[i].type=="hua"){
						sum+=2;
					}else if(arguments[i].type=="pian"){
						sum+=1;
					}
				}
				return sum;
				break;
			case 2://两张牌
			console.log("二张牌大小值");
			console.log(arguments);
			if(arguments[0].num==arguments[1].num){//如果是对
				sum+=100;

				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(arguments[i].type=="hei"){
						sum+=15;
					}else if(arguments[i].type=="hong"){
						sum+=7;
					}else if(arguments[i].type=="hua"){
						sum+=3;
					}else if(arguments[i].type=="pian"){
						sum+=1;
					}
				}

				var max = arguments[0].num;//对几？
				for(var i=1;i<arguments.length;i++){
					if(max<arguments[i].num){
						max = arguments[i].num;
					}
				}
				sum+=max+150;

			}else{

				var max = arguments[0].num;//不是对，找到最大的牌
				for(var i=1;i<arguments.length;i++){
					if(max<arguments[i].num){
						max = arguments[i].num;
					}
				}
				sum+=max+30;

				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(arguments[i].type=="hei"){
						sum+=15;
					}else if(arguments[i].type=="hong"){
						sum+=7;
					}else if(arguments[i].type=="hua"){
						sum+=3;
					}else if(arguments[i].type=="pian"){
						sum+=1;
					}
				}

			}


			return sum;
			break;
			case 3://三张牌
			console.log("三张牌大小值");

			if(arguments[0].num==arguments[1].num==arguments[2].num){
				sum+=arguments[0]+300;
					for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
						if(arguments[i].type=="hei"){
							sum+=15;
						}else if(arguments[i].type=="hong"){
							sum+=7;
						}else if(arguments[i].type=="hua"){
							sum+=3;
						}else if(arguments[i].type=="pian"){
							sum+=1;
						}
					}
				}else{
					for(var i=0;i<arguments.length-1;i++){//如果不是葫芦，找对
						for(var j=i+1;j<arguments.length;j++){

							if(arguments[i].num==arguments[j].num){
								sum+=arguments[i].num*14+150;

							for(var s=0;s<arguments.length;s++){//如果相同看花色 黑红花片
								if(arguments[i].type=="hei"){
									sum+=15/14;
								}else if(arguments[s].type=="hong"){
									sum+=7/14;
								}else if(arguments[s].type=="hua"){
									sum+=3/14;
								}else if(arguments[s].type=="pian"){
									sum+=1/14;
								}
							}	
							//找到另一张单牌//比单张
							for(var k=0;k<arguments.length;k++){
								if(k!=i&&k!=j){
									sum+=arguments[k].num;
								}
							}

						}

					}
				}

			}



			var max = arguments[0].num;
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(max<arguments[i].num){
						max = arguments[i].num;
						sum += arguments[i].num;
					}
				}
				var maxDown = 0;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==max){
						maxDown = i;
					}
				}
				if(arguments[maxDown].type=="hei"){
					sum+=15;
				}else if(arguments[maxDown].type=="hong"){
					sum+=7;
				}else if(arguments[maxDown].type=="hua"){
					sum+=3;
				}else if(arguments[maxDown].type=="pian"){
					sum+=1;
				}



				return sum;
				break;
				case 4:
				console.log("四张牌大小值");

			//四张牌 800
			//同花顺 700
			//炸。600
			//同花 500 
			//顺400

			//葫芦   单。花色 300
			//两对 比花色 200 
			//一对 比单牌 比对单牌花色. 100
			//高牌 比较最大的一张。比较花色

			if(arguments[0].type==arguments[1].type==arguments[2].type==arguments[3].type){
				sum+=500;//同花
				for(var i=0;i<arguments.length;i++){//顺本身大小
					sum+=arguments[i].num;
				}
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(arguments[i].type=="hei"){
						sum+=15;
					}else if(arguments[i].type=="hong"){
						sum+=7;
					}else if(arguments[i].type=="hua"){
						sum+=3;
					}else if(arguments[i].type=="pian"){
						sum+=1;
					}
				}
				var arr = [];//顺
				for(var i=0;i<arguments.length-1;i++){
					arr.push(arguments[i].num);
				}
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(arr[i]>arr[j]){
							var t = arr[i];
							arr[i] = arr[j];
							arr[j] = t;
						}
					}
				}
				var s = 0;
				for(var i=0;i<arr.length-1;i++){
					if(arr[i]-a[i+1]==1){
						s++;
					}
				}
				if(s==3){
					sum+=700;
				}

			}else if(arguments[0].num==arguments[1].num==arguments[2].num==arguments[3].num){//炸
				sum+=600;//炸
				for(var i=0;i<arguments.length;i++){//炸本身大小
					sum+=arguments[i].num;
				}
			}else{

				var arr = [];//顺
				for(var i=0;i<arguments.length-1;i++){
					arr.push(arguments[i].num);
				}
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(arr[i]>arr[j]){
							var t = arr[i];
							arr[i] = arr[j];
							arr[j] = t;
						}
					}
				}
				var s = 0;
				for(var i=0;i<arr.length-1;i++){
					if(arr[i]-a[i+1]==1){
						s++;
					}
				}
				if(s==3){
					sum+=400;
				}
				for(var i=0;i<arguments.length;i++){//顺本身大小
					sum+=arguments[i].num;
				}

				var z = 0;
				var indexof = 0;
				for(var i=0;i<arguments.length-1;i++){
					for(var j=i+1;j<arguments.length;j++){
						if(arguments[i].num==arguments[j].num){
							z++;
							indexof = arguments[i].num;
						}
					}
				}	
				if(z==3){//葫芦
					sum+=300;
					//葫芦本身大小
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num==indexof){
							sum+=arguments[i].num;
						}
					}

					//找到单张和花色
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num!=indexof){
							sum+=arguments[i].num;
						}
					}

					for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
						if(arguments[i].type=="hei"){
							sum+=15;
						}else if(arguments[i].type=="hong"){
							sum+=7;
						}else if(arguments[i].type=="hua"){
							sum+=3;
						}else if(arguments[i].type=="pian"){
							sum+=1;
						}
					}


				}
				if(z==2){//两对
					sum+=200;

					// var arr = [];
					for(var i=0;i<arguments.length-1;i++){
						for(var j=i+1;j<arguments.length;j++){
							if(arguments[i].num==arguments[j].num){
								// arr.push(arguments[i]);
								sum+=arguments[i].num+20;
							}
						}
					}	


					for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
						if(arguments[i].type=="hei"){
							sum+=15;
						}else if(arguments[i].type=="hong"){
							sum+=7;
						}else if(arguments[i].type=="hua"){
							sum+=3;
						}else if(arguments[i].type=="pian"){
							sum+=1;
						}
					}
					// var d = 0;
					// for(var i=0;i<arguments.length;i++){
					// 	if(arguments[i].num!=arr[0].num&&arguments[i].num!=arr[1].num){
					// 		d = arguments[i];
					// 	}

					// }


				}

				if(z==1){//一对
					sum+=100;
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num==indexof){
							sum+=arguments[i].num+50;
						}
					}


					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num!=indexof){
							sum+=arguments[i].num;
						}
					}



					for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
						if(arguments[i].type=="hei"){
							sum+=15;
						}else if(arguments[i].type=="hong"){
							sum+=7;
						}else if(arguments[i].type=="hua"){
							sum+=3;
						}else if(arguments[i].type=="pian"){
							sum+=1;
						}
					}
				}

			}

			return sum;

			break;
			case 5:
			console.log("五张牌大小值");

			//五张牌
			//同花顺 700
			//炸。600
			//同花 500 
			//顺400
			//葫芦   单。花色 300
			//两对 比花色 200 
			//一对 比单牌 比对单牌花色. 100
			//高牌 比较最大的一张。比较花色


			if(arguments[0].type==arguments[1].type==arguments[2].type==arguments[3].type==arguments[4].type){
				sum+=500;//同花
				for(var i=0;i<arguments.length;i++){//顺本身大小
					sum+=arguments[i].num;
				}

				var max = arguments[0].num;
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(max<arguments[i].num){
						max = arguments[i].num;
					}
				}
				var maxDown = 0;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==max){
						maxDown = i;
					}
				}
				if(arguments[maxDown].type=="hei"){
					sum+=15;
				}else if(arguments[maxDown].type=="hong"){
					sum+=7;
				}else if(arguments[maxDown].type=="hua"){
					sum+=3;
				}else if(arguments[maxDown].type=="pian"){
					sum+=1;
				}

				var arr = [];//顺
				for(var i=0;i<arguments.length-1;i++){
					arr.push(arguments[i].num);
				}
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(arr[i]>arr[j]){
							var t = arr[i];
							arr[i] = arr[j];
							arr[j] = t;
						}
					}
				}
				var s = 0;
				for(var i=0;i<arr.length-1;i++){
					if(arr[i]-a[i+1]==1){
						s++;
					}
				}
				if(s==4){
					sum+=700;
				}

			}else{

				var arr = [];//顺
				for(var i=0;i<arguments.length-1;i++){
					arr.push(arguments[i].num);
				}
				for(var i=0;i<arr.length-1;i++){
					for(var j=i+1;j<arr.length;j++){
						if(arr[i]>arr[j]){
							var t = arr[i];
							arr[i] = arr[j];
							arr[j] = t;
						}
					}
				}
				var s = 0;
				for(var i=0;i<arr.length-1;i++){
					if(arr[i]-a[i+1]==1){
						s++;
					}
				}
				if(s==4){
					sum+=400;
				}
				for(var i=0;i<arguments.length;i++){//顺本身大小
					sum+=arguments[i].num;
				}

				var z = 0;
				var indexof = 0;
				for(var i=0;i<arguments.length-1;i++){
					for(var j=i+1;j<arguments.length;j++){
						if(arguments[i].num==arguments[j].num){
							z++;
							indexof = arguments[i].num;
						}
					}
				}	

				if(z==4){//炸
						sum+=600;//炸
				for(var i=0;i<arguments.length;i++){//炸本身大小
					sum+=arguments[i].num;
				}

				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==indexof){
						sum+=arguments[i].num;
					}
				}

				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num!=indexof){
						sum+=arguments[i].num;
						if(arguments[i].type=="hei"){
							sum+=15;
						}else if(arguments[i].type=="hong"){
							sum+=7;
						}else if(arguments[i].type=="hua"){
							sum+=3;
						}else if(arguments[i].type=="pian"){
							sum+=1;
						}

					}
				}


			}
				if(z==3){//葫芦
					sum+=300;
					//葫芦本身大小
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num==indexof){
							sum+=arguments[i].num;
						}
					}

					var doble = [];
					//找到对
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num!=indexof){
							sum+=arguments[i].num;
							doble.push(arguments[i].num);
						}
					}

					if(doble[0].num==doble[1].num){
						sum+=arguments[0].num+10;
						sum+=arguments[1].num+10;
					}

					if(doble[0].num!=doble[1].num){
						
						if(arguments[0].num>arguments[1].num){
							sum+=arguments[0].num;

							if(arguments[0].type=="hei"){
								sum+=15;
							}else if(arguments[0].type=="hong"){
								sum+=7;
							}else if(arguments[0].type=="hua"){
								sum+=3;
							}else if(arguments[0].type=="pian"){
								sum+=1;
							}

						}else{
							sum+=arguments[1].num;

							if(arguments[1].type=="hei"){
								sum+=15;
							}else if(arguments[1].type=="hong"){
								sum+=7;
							}else if(arguments[1].type=="hua"){
								sum+=3;
							}else if(arguments[1].type=="pian"){
								sum+=1;
							}

						}
					}


				}
				if(z==2){//两对
					sum+=200;

					var arr = [];
					for(var i=0;i<arguments.length-1;i++){
						for(var j=i+1;j<arguments.length;j++){
							if(arguments[i].num==arguments[j].num){
								arr.push(arguments[i]);
								sum+=arguments[i].num;
							}
						}
					}
					var d = 0;	
					for(var i = 0;i<arr.length;i++){
						if(arguments[i].num!=arr[0].num&&arguments[i].num!=arr[1].num){
							d = arguments[i].num;
							sum+=d;
							if(arguments[i].type=="hei"){
								sum+=15;
							}else if(arguments[i].type=="hong"){
								sum+=7;
							}else if(arguments[i].type=="hua"){
								sum+=3;
							}else if(arguments[i].type=="pian"){
								sum+=1;
							}
						}
					}


					var max = arguments[0].num;
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(max<arguments[i].num){
						max = arguments[i].num;
					}
				}
				var maxDown = 0;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==max){
						maxDown = i;
					}
				}
				if(arguments[maxDown].type=="hei"){
					sum+=15;
				}else if(arguments[maxDown].type=="hong"){
					sum+=7;
				}else if(arguments[maxDown].type=="hua"){
					sum+=3;
				}else if(arguments[maxDown].type=="pian"){
					sum+=1;
				}

			}

				if(z==1){//一对
					sum+=100;
					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num==indexof){
							sum+=arguments[i].num+50;
						}
					}

					for(var i=0;i<arguments.length;i++){
						if(arguments[i].num!=indexof){
							sum+=arguments[i].num;
						}
					}

					var max = arguments[0].num;
				for(var i=0;i<arguments.length;i++){//如果相同看花色 黑红花片
					if(max.num<arguments[i].num){
						max.num = arguments[i].num;
					}
				}
				var maxDown = 0;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==max){
						maxDown = i;
					}
				}
				if(arguments[maxDown].type=="hei"){
					sum+=15;
				}else if(arguments[maxDown].type=="hong"){
					sum+=7;
				}else if(arguments[maxDown].type=="hua"){
					sum+=3;
				}else if(arguments[maxDown].type=="pian"){
					sum+=1;
				}
			}
			if(z==0){

				var max = arguments[0].num;
				for(var i=0;i<arguments.length;i++){//单张 找最大值的花色。和所有值的和
					if(max<arguments[i].num){
						max = arguments[i].num;
						sum += arguments[i].num;
					}
				}
				var maxDown = 0;
				for(var i=0;i<arguments.length;i++){
					if(arguments[i].num==max){
						maxDown = i;
					}
				}
				if(arguments[maxDown].type=="hei"){
					sum+=15;
				}else if(arguments[maxDown].type=="hong"){
					sum+=7;
				}else if(arguments[maxDown].type=="hua"){
					sum+=3;
				}else if(arguments[maxDown].type=="pian"){
					sum+=1;
				}

			}

		}

		return sum;

		break;

	}
}


module.exports = compareCard;

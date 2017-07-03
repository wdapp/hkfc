//游戏初始化
var players = require('PlayerData').players;
var Decks = require('Decks');
var Types = require('Types');
var ActorPlayingState = Types.ActorPlayingState;
var Fsm = require('game-fsm');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        playerAnchors: {
            default: [],
            type: cc.Node
        },

        mySocket: cc.Node,//玩家数据
        readyBtn:cc.Label,
        info:cc.Label,
        info1:cc.Label,
        info2:cc.Label,
        info3:cc.Label,
        info4:cc.Label,
        info5:cc.Label,
        cardPrefab:cc.Prefab,
        backCard:cc.Prefab,
        sf: {
            default:[],
            type:cc.SpriteFrame
        },

        gold: {
            default:[],
            type:cc.Label
        },

        allbtn: {
            default:[],
            type:cc.Node
        },

        playerPrefab: cc.Prefab,
        dealer: cc.Node,
        inGameUI: cc.Node,
        betUI: cc.Node,
        assetMng: cc.Node,
        audioMng: cc.Node,
        turnDuration: 0,
        betDuration: 0,
        totalChipsNum: 0,
        totalDiamondNum: 0,
        numberOfDecks: {
            default: 1,
            type: 'Integer'
        }
    },

    statics: {
        instance: null
    },

    // use this for initialization
    onLoad: function () {

        this.gameObj = { 
            delcli:true,
            ready:false,
            id:0,
        first:0,//--
        select:"zhunbei",
        cards:[],
        allcards:[],
        clientNum:0,
        cardsNum:0,
        gold:[1000,1000,1000,1000,1000],
        allGold:0,
        allSelect:[],
        allow:[]


    };

    this.firstSendCard = true;
    this.btnDisable = false;
    this.allCard = [];
    this.cardInt = 0;
    this.cardPosition = [];
    this.pos = 2;
    this.allPlayer = [];
    this.chuangjianyici = true;

    this.infoArr = [];
    this.infoArr.push(this.info1);
    this.infoArr.push(this.info2);
    this.infoArr.push(this.info3);
    this.infoArr.push(this.info4);
    this.infoArr.push(this.info5);

    this.obj= null;
    this.seatDown = false;
    Game.instance = this;
    this.inGameUI = this.inGameUI.getComponent('InGameUI');
    this.assetMng = this.assetMng.getComponent('AssetMng');
    this.audioMng = this.audioMng.getComponent('AudioMng');
    this.betUI = this.betUI.getComponent('Bet');
    this.inGameUI.init(this.betDuration);
    this.betUI.init();
    this.dealer = this.dealer.getComponent('Dealer');
    this.dealer.init();

        //
        this.player = null;
        var that = this;
        // players = this.mySocket.getComponent('Socket').mpl;
        this.mySocket.getComponent('Socket').socket.onmessage = function(msg){
            cc.log("服务器传过来的公共信息:");
            cc.log(msg);
            if(msg.data.substr(0,6)!="status"){

                if(msg.data.substr(0,2)!="自己"){
                    var arr = JSON.parse(msg.data);

                    console.log("接收服务器广播:");console.log(arr);

                    players = arr;

                 that.createPlayers("no");//渲染玩家
             }else{

               that.gameObj.id = msg.data.substr(2);

                 that.createPlayers("my");//渲染玩家
             }
         }else{
            that.obj = JSON.parse(msg.data.substr(6));

            cc.log("全局信息");cc.log(that.obj);


            that.gameObj.allcards = that.obj.allcards;
            that.gameObj.clientNum = that.obj.clientNum;
            that.gameObj.gold = that.obj.gold;
            that.gameObj.allGold = that.obj.allGold;
            that.gameObj.allSelect = that.obj.allSelect;
            that.gameObj.allow = that.obj.allow;
            that.gameObj.allNum = that.obj.allNum;

            for(var i=0;i<that.obj.cards.length;i++){
                that.gameObj.cards.push(that.obj.cards[i]);
            }


            cc.log("我的牌:");cc.log(that.gameObj);

                //更新全局消息 开始游戏
                that.info.string = that.obj.game;
                that.info.fontsize = 18;


                // for(var i=0;i<allPlayer;i++){

                // }

// that.playerNode
that.playerNode.getChildByName('stakeOnTable').getChildByName('bg').getChildByName('stakeNum').getComponent(cc.Label).string = "";
that.playerNode.getChildByName('playerInfo').getChildByName('namePlate').getChildByName('stakeNum').getComponent(cc.Label).string = "";

                //更新金币显示
                // that.playerNode.getChildByName('stakeOnTable').getComponent(cc.Label).string = 888;//.string = this.gameObj.cards[0].name;

                that.gold[0].string = that.gameObj.gold[0];

                that.gold[1].string = that.gameObj.gold[1];

                that.gold[2].string = that.gameObj.gold[2];

                that.gold[3].string = that.gameObj.gold[3];

                that.gold[4].string = that.gameObj.gold[4];

                //全部筹码
                that.gold[5].string = that.gameObj.allGold;


                //更新玩家状态
                for(var i=0;i<that.infoArr.length;i++){
                    if(that.obj.first!=(i+1)){
                        that.infoArr[i].string = that.obj.tip;
                    }else{
                        that.infoArr[i].string = "选择";
                    }
                }

                if(that.firstSendCard){
                   //更新显示牌图片
                   // that.gameObj.cardsNum = that.gameObj.allcards.length;

                   that.cardInt = 0;
                   that.initCard();
                   that.firstSendCard = false;
               }else{
                if(that.obj.game=="fapai"){
                    that.cardInt = 0;
                    that.ContinueSendCard();    
                }



            }


            that.gameObj.first=that.obj.first;

            if(that.gameObj.id==that.obj.first){
              that.btnDisable = true;
          }


      }

  };


        // shortcut to ui element
        // this.info = this.inGameUI.resultTxt;
        this.totalChips = this.inGameUI.labelTotalChips;

        // init logic
        this.decks = new Decks(this.numberOfDecks);
        this.fsm = Fsm;
        this.fsm.init(this);

        // start
        this.updateTotalChips();

        this.audioMng.playMusic();



    },
    ContinueSendCard:function(){
        cc.log("再次发牌-------------------------------");
        var y = 250;
        var x = 320-this.pos*35;
            //刷新台面上的牌
            for(var i=this.gameObj.cardsNum;i<this.gameObj.allcards.length;i++){


                // if(this.gameObj.id == ((i-this.gameObj.cardsNum)+1)){

                    var newStar = cc.instantiate(this.cardPrefab);
                    this.node.addChild(newStar,10000);
                            newStar.getChildByName('point').getComponent(cc.Label).string = this.gameObj.allcards[i].name;//.string = this.gameObj.cards[0].name;

                            switch(this.gameObj.allcards[i].type){
                                case "hei":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[0];//.string = this.gameObj.cards[0].name;

                            break;
                            case "hong":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[1];//.string = this.gameObj.cards[0].name;

                            break;
                            case "hua":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[2];//.string = this.gameObj.cards[0].name;

                            break;
                            case "pian":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[3];//.string = this.gameObj.cards[0].name;

                            break;
                        }

                    // }

                    this.allCard.push(newStar);

                    if((i-this.gameObj.cardsNum)+1==2){
                        y = 100;
                    }
                    if((i-this.gameObj.cardsNum)+1==3){
                        y = -50;
                        x = 200-this.pos*35;
                    }
                    if((i-this.gameObj.cardsNum)+1==4){
                        y = 100;
                        x = -160-this.pos*35;
                    }
                    if((i-this.gameObj.cardsNum)+1==5){
                        y = 250;
                        x = -160-this.pos*35;
                    }

                    newStar.setPosition(-x,y);
                    // this.cardInt +=35;

                }


                this.gameObj.cardsNum = this.gameObj.allcards.length;
                this.pos++;
            },
            initCard:function(){
                cc.log("首发-------------------------------");

                this.gameObj.cardsNum = this.gameObj.allcards.length;

            //清空所有牌
            for(var i=0;i<this.allCard.length;i++){
                this.allCard[i].destroy();
            }

            var y = 250;
            var x = 320;
            //刷新台面上的牌
            for(var i=0;i<this.gameObj.allcards.length;i++){

                if(i%2==0){

                    if(2*(this.gameObj.id-1)+1 == (i+1)){

                        var newStar = cc.instantiate(this.cardPrefab);
                        this.node.addChild(newStar,10000);
                            newStar.getChildByName('point').getComponent(cc.Label).string = this.gameObj.allcards[i].name;//.string = this.gameObj.cards[0].name;

                            switch(this.gameObj.allcards[i].type){
                                case "hei":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[0];//.string = this.gameObj.cards[0].name;

                            break;
                            case "hong":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[1];//.string = this.gameObj.cards[0].name;

                            break;
                            case "hua":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[2];//.string = this.gameObj.cards[0].name;

                            break;
                            case "pian":
                            newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[3];//.string = this.gameObj.cards[0].name;

                            break;
                        }


                    }else{

                        var newStar = cc.instantiate(this.backCard);
                        this.node.addChild(newStar,10000);
                        
                    }

                }else{
                    var newStar = cc.instantiate(this.cardPrefab);
                    this.node.addChild(newStar,10000);
                newStar.getChildByName('point').getComponent(cc.Label).string = this.gameObj.allcards[i].name;//.string = this.gameObj.cards[0].name;

                switch(this.gameObj.allcards[i].type){
                    case "hei":
                newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[0];//.string = this.gameObj.cards[0].name;

                break;
                case "hong":
                newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[1];//.string = this.gameObj.cards[0].name;

                break;
                case "hua":
                newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[2];//.string = this.gameObj.cards[0].name;

                break;
                case "pian":
                newStar.getChildByName('suit').getComponent(cc.Sprite).spriteFrame = this.sf[3];//.string = this.gameObj.cards[0].name;

                break;
            }


        }



        this.allCard.push(newStar);

        if(i==2){
            y = 100;
            this.cardInt = 0;
        }
        if(i==4){
            y = -50;
            this.cardInt = 0;
            x = 200;
        }
        if(i==6){
            y = 100;
            this.cardInt = 0;
            x = -160;
        }
        if(i==8){
            y = 250;
            this.cardInt = 0;
            x = -160;
        }

        newStar.setPosition(-x+this.cardInt,y);
        this.cardInt +=35;



    }


},

addStake: function (delta) {
    cc.log(delta);

    if(this.btnDisable){

        this.btnDisable  = false;
        switch(delta){
            case 10000:

            if(this.gameObj.allow[1]){
               cc.log("梭哈");
               this.gameObj.select = "suoha";
               cc.log("选择");
               cc.log(this.gameObj);
               this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));
           }else{
            cc.log('不能梭哈');
            this.btnDisable  = true;

        }


        break;
        case 5000:

        cc.log("跟注");
        this.gameObj.select = "genzhu";
        cc.log("选择");
        cc.log(this.gameObj);
        this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));

        break;
        case 2000:
        if(this.gameObj.select!='suoha'){
            if(this.gameObj.allow[3]){

                cc.log("加注");
                this.gameObj.select = "jiazhu";
                cc.log("选择");
                cc.log(this.gameObj);
                this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));
            }else{
                cc.log("不能加注");
                this.btnDisable  = true;

            }
        }else{
            cc.log("已经梭哈");
            
        }

        break;
        case 1000:
        cc.log("放弃");
        this.gameObj.select = "fangqi";
        cc.log("选择");
        cc.log(this.gameObj);
        this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));
        break;
    }

}
},

resetStake: function() {
    if(this.btnDisable){
        this.btnDisable  = false;

        if(this.gameObj.select!='suoha'){

            cc.log("过");
            cc.log("选择");
            cc.log(this.gameObj);
            if(this.gameObj.allow[0]){

                this.gameObj.select = "guo";

                this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));
            }else{
                cc.log("不能过");
                this.btnDisable  = true;

            }

        }else{
            cc.log("梭哈了");
        }


    }


        // this.totalChipsNum += this.player.stakeNum;
        // this.player.resetStake();
        // this.updateTotalChips();
    },

    updateTotalChips: function() {
        this.totalChips.string = this.totalChipsNum;
        // this.player.renderer.updateTotalStake(this.totalChipsNum);
    },
    //创建玩家
    createPlayers: function (ply) {

        if(this.chuangjianyici){
            // this.chuangjianyici = false;


            var s = 0;
            if(players.length>=5){
                s=5;
            }else{
                s=players.length;
            }


            for (var i = 0; i < s; ++i) {

               if(this.seatDown){
                if(i!=s-1){
                    continue;
                }
            }

            this.playerNode = cc.instantiate(this.playerPrefab);

            this.allPlayer.push(this.playerNode);

            console.log("----------------------------");
            console.log(this.allPlayer);
            var anchor = this.playerAnchors[i];
            var switchSide = (i <= 2);
            anchor.addChild(this.playerNode);
            this.playerNode.position = cc.p(0, 0);

            var playerInfoPos = cc.find('anchorPlayerInfo', anchor).getPosition();
            var stakePos = cc.find('anchorStake', anchor).getPosition();
            var actorRenderer = this.playerNode.getComponent('ActorRenderer');

            actorRenderer.init(players[i], playerInfoPos, stakePos, this.turnDuration, switchSide,ply);


            if (i === 2) {
                this.player = this.playerNode.getComponent('Player');
                this.player.init();
            }
        }
        this.seatDown = true;

    }
},

    // UI EVENT CALLBACKS

    // 玩家要牌
    hit: function () {
        this.player.addCard(this.decks.draw());
        if (this.player.state === ActorPlayingState.Bust) {
            // if every player end
            this.fsm.onPlayerActed();
        }

        this.audioMng.playCard();

        //if (this.dealer.state === ActorPlayingState.Normal) {
        //    if (this.dealer.wantHit()) {
        //        this.dealer.addCard(this.decks.draw());
        //    }
        //    else {
        //        this.dealer.stand();
        //    }
        //}
        //
        //if (this.dealer.state === ActorPlayingState.Bust) {
        //    this.state = GamingState.End;
        //}
        this.audioMng.playButton();
    },

    // 玩家停牌
    stand: function () {
        this.player.stand();

        this.audioMng.playButton();

        // if every player end
        this.fsm.onPlayerActed();
    },

    //
    deal: function () {//准备
        // this.fsm.toDeal();
        // this.audioMng.playButton();
        cc.log("准备");
        if(!this.gameObj.ready){
            this.gameObj.ready=!this.gameObj.ready;
            cc.log(this.gameObj);
            this.mySocket.getComponent('Socket').socket.send(JSON.stringify(this.gameObj));
            this.readyBtn.string = "已准备";
        }



    },

    //
    start: function () {
        //this.fsm.toBet();
        this.audioMng.playButton();
    },

    // 玩家报到
    report: function () {
        this.player.report();

        // if every player end
        this.fsm.onPlayerActed();
    },

    quitToMenu: function () {
        cc.director.loadScene('menu');
    },

    // FSM CALLBACKS

    onEnterDealState: function () {
        this.betUI.resetTossedChips();
        this.inGameUI.resetCountdown();
        this.player.renderer.showStakeChips(this.player.stakeNum);
        this.player.addCard(this.decks.draw());
        var holdCard = this.decks.draw();
        this.dealer.addHoleCard(holdCard);
        this.player.addCard(this.decks.draw());
        this.dealer.addCard(this.decks.draw());
        this.audioMng.playCard();
        this.fsm.onDealed();
    },

    onPlayersTurnState: function (enter) {
        if (enter) {
            this.inGameUI.showGameState();
        }
    },

    onEnterDealersTurnState: function () {
        while (this.dealer.state === ActorPlayingState.Normal) {
            if (this.dealer.wantHit()) {
                this.dealer.addCard(this.decks.draw());
            }
            else {
                this.dealer.stand();
            }
        }
        this.fsm.onDealerActed();
    },

    // 结算
    onEndState: function (enter) {
        if (enter) {
            this.dealer.revealHoldCard();
            this.inGameUI.showResultState();

            var outcome = this._getPlayerResult(this.player, this.dealer);
            switch (outcome) {
                case Types.Outcome.Win:
                this.info.string = 'You Win';
                this.audioMng.pauseMusic();
                this.audioMng.playWin();
                    // 拿回原先自己的筹码
                    this.totalChipsNum += this.player.stakeNum;
                    // 奖励筹码
                    var winChipsNum = this.player.stakeNum;
                    if (!this.player.state === Types.ActorPlayingState.Report) {
                        if (this.player.hand === Types.Hand.BlackJack) {
                            winChipsNum *= 1.5;
                        }
                        else {
                            // 五小龙
                            winChipsNum *= 2.0;
                        }
                    }
                    this.totalChipsNum += winChipsNum;
                    this.updateTotalChips();
                    break;

                    case Types.Outcome.Lose:
                    this.info.string = 'You Lose';
                    this.audioMng.pauseMusic();
                    this.audioMng.playLose();
                    break;

                    case Types.Outcome.Tie:
                    this.info.string = 'Draw';
                    // 退还筹码
                    this.totalChipsNum += this.player.stakeNum;
                    this.updateTotalChips();
                    break;
                }
            }

            this.info.enabled = enter;
        },

    // 下注
    onBetState: function  (enter) {
        if (enter) {
         this.decks.reset();
           // this.player.reset();
           this.dealer.reset();
           this.info.string = '请下注';
           this.inGameUI.showBetState();
           this.inGameUI.startCountdown();

           this.audioMng.resumeMusic();
       }
       this.info.enabled = enter;
   },

    // PRIVATES

    // 判断玩家输赢
    _getPlayerResult: function (player, dealer) {
        var Outcome = Types.Outcome;
        if (player.state === ActorPlayingState.Bust) {
            return Outcome.Lose;
        }
        else if (dealer.state === ActorPlayingState.Bust) {
            return Outcome.Win;
        }
        else {
            if (player.state === ActorPlayingState.Report) {
                return Outcome.Win;
            }
            else {
                if (player.hand > dealer.hand) {
                    return Outcome.Win;
                }
                else if (player.hand < dealer.hand) {
                    return Outcome.Lose;
                }
                else {
                    if (player.bestPoint === dealer.bestPoint) {
                        return Outcome.Tie;
                    }
                    else if (player.bestPoint < dealer.bestPoint) {
                        return Outcome.Lose;
                    }
                    else {
                        return Outcome.Win;
                    }
                }
            }
        }
    },

});

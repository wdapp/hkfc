cc.Class({
    extends: cc.Component,

    properties: {
        socket:"",
        mpl:"123",
        game: cc.Node,//game实例
    },

    // use this for initialization
    onLoad: function () {
        var that = this;
        //玩家加入游戏
        this.socket = new WebSocket("ws://localhost:3001");
        this.socket.onopen = function(){
            console.log("网页连接成功");
        }

        this.socket.onmessage = function(msg){
            console.log(msg);
            that.mpl = msg.data;

        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

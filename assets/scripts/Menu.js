var ss = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        audioMng: cc.Node,

        scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        // var socket = new WebSocket("ws://localhost:3001");
        // socket.onopen = function(){
        //     console.log("网页连接成功");
        // }
        // var that = this;
        // socket.onmessage = function(msg){
        //     console.log(msg.data);
        //     ss = msg.data;

        //     that.scoreDisplay.string =  ss;
        // }

        
        this.audioMng = this.audioMng.getComponent('AudioMng');
        this.audioMng.playMusic();
        cc.director.preloadScene('table', function () {
            cc.log('Next scene preloaded');
        });
    },

    playGame: function () {
        

        cc.director.loadScene('table');

    },

    // called every frame
    update: function (dt) {

    },
});

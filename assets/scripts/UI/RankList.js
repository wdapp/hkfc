var players = require('PlayerData').players;

module.exports = cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        prefabRankItem: cc.Prefab,
        rankCount: 0
    },

    // use this for initialization
    onLoad: function () {
        // this.content = this.scrollView.content;
        // this.populateList();

        
    },

    populateList: function() {
        var s = 0;
        if(players.length>=5){
            s=5;
        }else{
            s=players.length;
        }

        for (var i = 0; i < s; ++i) {
            var playerInfo = players[i];
            var item = cc.instantiate(this.prefabRankItem);
            item.getComponent('RankItem').init(i, playerInfo);
            this.content.addChild(item);
        }
    },

    // called every frame
    update: function (dt) {

    },
});


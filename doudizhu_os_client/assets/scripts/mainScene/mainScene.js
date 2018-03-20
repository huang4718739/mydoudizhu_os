import global from './../mainScene/global'
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad:function () {
        //初始化socket
        global.socket.init();
    },

    //点击按钮
    buttonClick(event,customData){
        switch (customData){
            case 'wxlogin':
                console.log('wx loginBtn Click !');
                global.socket.login(
                    global.tianba.playerData.uniqueID,
                    global.tianba.playerData.nickName,
                    global.tianba.playerData.avatarUrl,
                    global.tianba.playerData.uid,
                    global.tianba.playerData.houseCardCount,
                    function (err,data) {
                        if(err){
                            console.log('登录失败 : '+ err);
                        }
                        else
                        {
                            console.log('登录成功  : '+ JSON.stringify(data));
                        }

                    });
                break;
            default:
                break;

        }

    }
});


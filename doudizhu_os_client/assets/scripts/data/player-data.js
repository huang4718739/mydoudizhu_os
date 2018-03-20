const PlayerData = function () {
    let that = {};

    that.uid = '1';
    for(let i=0 ;i<7; i++)
    {
        that.uid += Math.floor(Math.random() * 10);
    }

    that.uniqueID = '10000';
    for(let i=0 ;i<7; i++)
    {
        that.uniqueID += Math.floor(Math.random() * 10);
    }

    that.nickName = '小黄'+Math.floor(Math.random()*10);
    that.avatarUrl = 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=295549863,3877376279&fm=85&s=17A9F9054C9B50CA223834F003007070';
    that.houseCardCount = Math.random()*10;


    that.wxLoginSuccess = function (data) {
      that.uniqueID = data.uniqueID;
      that.nickName = data.nickName;
      that.avatarUrl = data.avatarUrl;
    };

    that.loginSuccess = function (data) {
        console.log('data = '+JSON.stringify(data));
    };
    return that;
}
export default PlayerData;
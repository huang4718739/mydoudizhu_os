//启动socet监听端口
const socket = require('socket.io');
const app = socket('3000');

//数据库
const mydb = require('./utility/db');
const config = require('./config');
mydb.connect(config.mysqlConfig);

//玩家
const playerController = require('./game/player');

//测试代码
//mydb.checkPlayer('1000',function (err,cb) {
//});

//插入数据测试
// mydb.insertPlayerInfo({
//     unique_id:'1000001',
//     uid:'1200000',
//     nick_name:'小东',
//     avatar_url:'www.baidu.com',
//     house_card_count:5
// });

//更新数据测试
// mydb.updatePlayerInfo('unique_id','1000001',{
//     nick_name:'小红',
//     avatar_url:'www.baidu.com',
//     house_card_count:5
// });

//

//-----------------------------响应消息
//连接消息
app.on('connection',function (socket) {

   console.log('a user connected');

   socket.emit('welcome','hello world!');

   socket.on('notify',function (res) {
       console.log('a user login = ' + JSON.stringify(res));

       let notifyData = res.data;
       let callBackIndex = res.callBackIndex;
       let msg = res.msg;

       switch (msg)
       {
           case 'login':
               //检查用户是否存在
               mydb.checkPlayer(notifyData.uniqueID,function (err,data) {
                   if(err)
                   {
                       console.log('err : '+err);
                   }else
                   {
                       if(data.length === 0)
                       {
                           //不存在
                           console.log('不存在该用户.');
                           //插入
                           mydb.insertPlayerInfo({
                               unique_id:notifyData.uniqueID,
                               uid:notifyData.uid,
                               nick_name:notifyData.nickName,
                               avatar_url:notifyData.avatarUrl,
                               house_card_count:notifyData.houseCardCount
                           });
                           //创建玩家
                           playerController.createPlayer(socket,{
                               uid:notifyData.uid,
                               nickName:notifyData.nickName,
                               avatarUrl:notifyData.avatarUrl,
                               houseCardCount:5,
                               callBackIndex:callBackIndex
                           });
                       }else
                       {
                           //存在,则更新数据
                           mydb.updatePlayerInfo('unique_id',res.uniqueID,{
                               nick_name:notifyData.nickName,
                               avatar_url:notifyData.avatarUrl
                           });
                           //创建玩家
                           playerController.createPlayer(socket,{
                               uid:data.uid,
                               nickName:notifyData.nickName,
                               avatarUrl:notifyData.avatarUrl,
                               houseCardCount:5,
                               callBackIndex:callBackIndex
                           });

                       }
                   }
               });
               break;
           default:
               break;
       }


   });
});

console.log(' listsen on 3000 ');
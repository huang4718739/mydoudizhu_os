import defines from './../mainScene/defines'
const SocketController  = function () {

    let that ={};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1;


    that.init = function () {
        console.log('socket init ~~~');
        _socket = io(defines.serverUrl);

        //监听服务器返回的notify消息
        _socket.on('notify',function (data) {
            console.log('客户端 接收 服务端 notify 返回数据 = '+JSON.stringify(data));

            //拉起回调
            let callBackIndex = data.callBackIndex;
            let cb = _callBackMap[callBackIndex];
            if(cb){
                cb(null,data);
            }
        });
    };

    //notify 发送给服务器，没有回调
    const notify = function (msg,data) {
        console.log('客户端向服务端发起请求(notify): msg = '+msg);
        _socket.emit('notify',{
            msg:msg,
            callBackIndex:_callBackIndex,
            data:data
        });
        _callBackIndex++;
    };

    //发送给服务器的消息，有回调
    const request = function (msg,data,cb) {
        _callBackMap[_callBackIndex] = cb
        notify(msg,data);
    };


    //向服务器提交(登录)数据
    that.login = function (unique,nickname,avatar,uid,houseC,cb) {
        request('login',{
                uniqueID:unique,
                nickName:nickname,
                avatarUrl:avatar,
                uid:uid,
                houseCardCount:houseC,
            },cb);
    };
    return that;
};
export default SocketController;
const Player = function (socket, data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _house_card_count = data.houseCardCount;
    let _callBackIndex = data.callBackIndex;
    _socket.emit('notify',{msg:'login',callBackIndex:_callBackIndex,data:'welCome'});
    return that;
}

let _player_List = [];
exports.createPlayer = function (socket,data) {
  console.log('Create Player Data : '+JSON.stringify(data));
  let  player = Player(socket,data);
  _player_List.push(player);
};
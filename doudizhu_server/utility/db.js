//连接数据库
const mysql = require('mysql');
let client = undefined;
const query = function (sql, cb) {
    console.log('query =' + sql);
    client.getConnection(function (err,connection) {
        if (err)
        {
            console.log('connection mysql err = ' + err);
            cb(err);
            throw err;
        }else
        {
            connection.query(sql,function (connerr,result,fileds) {
                if(connerr)
                {
                    console.log('query err = '+connerr);
                    cb(connerr);
                }else
                {
                    cb(null,result);
                }
                connection.release();
            });
        }
    });
};

//连接
exports.connect = function (config) {
    client = mysql.createPool(config);
};

//---------查找取出玩家数据
exports.checkPlayer = function (uniqueID,cb) {
    //查找玩家数据
    let sql = 'select * from t_PlayerInfo where unique_id =' + uniqueID +';';
    query(sql,function (err,data) {
        if(err){
            console.log('Check PlayerInfo err = '+err);
        }
        console.log('Check PlayerInfo Sueccess  = ' + JSON.stringify(data));
        cb(err,data);
    });
};

//---------插入数据
const insertSql = function (table,data) {//拼接
    let sql = 'insert into '+ table;
    let keyStr = ' (';
    let values = ' values(';
    for(let i in data)
    {
        keyStr += i+',';
        values += "'"+data[i]+"'"+',';
    }
    keyStr = keyStr.substring(0,keyStr.length-1);
    values = values.substring(0,values.length-1);
    sql+= keyStr +') ' + values +')';
    return sql;
}
exports.insertPlayerInfo = function (data) {
    //插入
    let sql = insertSql('t_PlayerInfo',data);
    console.log('insert sql = '+sql);
    query(sql,function (err,res) {
        if(err){
            console.log('Insert PlayerInfo err = ' + err);
        }else
        {
            console.log('Insert PlayerInfo Sueccess = ' + JSON.stringify(res));
        }
    });
    
}

//---------更新数据
const updateSql = function (table,mainKey,mainValue,data) {
    console.log('update data = '+data);
    let sql = 'update '+ table +' set' +' ';
    for (let i in data)
    {
        sql += i+'='+"'"+data[i]+"'"+','
    }
    sql = sql.substring(0,sql.length-1);
    sql += ' where '+mainKey+'='+"'"+mainValue+"'";
    return sql;
}
exports.updatePlayerInfo = function (mainKey,mainValue,data) {
    let sql = updateSql('t_PlayerInfo',mainKey,mainValue,data);
    console.log('update sql = '+sql);
    query(sql,function (err,res) {
        if(err){
            console.log('Update PlayerInfo err = ' + err);
        }else
        {
            console.log('Update PlayerInfo Sueccess = ' + JSON.stringify(res));
        }
    });
}
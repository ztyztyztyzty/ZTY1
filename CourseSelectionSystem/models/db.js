exports.enter = enter;
exports.user = user;
//登录
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
// 查询指定条件的数据
function enter(data,callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("userinfo").find(data).toArray(function (err, result) {
            if (err) throw err;
            callback(result);//把数据传递给控制器
            db.close();
        });
    });
}
function user(data,callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("userinfo").find({"name":data}).toArray(function (err, result) {
            if (err) throw err;
            callback(result);//把数据传递给控制器
            db.close();
        });
    });
}
// 查询所有课程
exports.findcourse = findcourse;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
function findcourse(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("allcourse"). find().toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
           callback(result);
            db.close();
        });
    });
}
//退选
exports.delet = delet;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
function delet(data,callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user");// 查询条件
        dbo.collection("choosecourse").deleteOne(data,function(err, obj) {
            if (err) {
                callback("-1")
            }
            else    callback("1")
            db.close();
        });
    });
}

//
exports.chosen = chosen;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
function chosen(data,callback) {
        MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
            if (err) throw err;
            var dbo = db.db("user");
            dbo.collection("choosecourse").find(data).toArray(function (err, arr) {
                if (err) throw err;
                callback(arr);
                db.close();

            })
        })

}


//修改个人信息
exports.updata = updata;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
function updata(name,data,callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        var wherestr = {"name":name};
        var updatastr = {$set:data};
        dbo.collection("userinfo").updateOne(wherestr,updatastr,function (err,ree) {
            if(err){
                callback("-1");
            }
            else {
                callback("1");
            }
            db.close();
        })
    })

}




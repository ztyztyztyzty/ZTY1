let db = require("../models/db");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/user";
//显示登录页面
exports.showIndex = (req,res)=>{
    res.render("index.ejs")
}

//退出登录
exports.relogin = (req,res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect("/enter")
    })
}


//显示主页面
exports.showMain = (req,res)=>{
    db.findcourse(function (arr) {
        res.render("mainSystem.ejs",{"arr":arr,"username":req.session.username})
    })

}
//显示我的页面
exports.showMyself = (req,res)=>{
    res.render("myInformation.ejs",{"name":req.session.username });
}


//显示已选课程页面
exports.showChosen = (req,res)=>{
    db.chosen(req.body.username,function (arr) {
        res.render("chosencourse.ejs", {"arr": arr, "username": req.session.username})
    })
}


//显示课程表
exports.showTimetable = (req,res)=>{
    db.chosen(req.session.username,function (arr) {
        var lessons=new Array;
        for(var i=0;i<55;i++){
            lessons[i]="'coursename':'','teacher':'','place':''"
        }
        for(var i=0;i<arr.length;i++){
            lessons[arr[i].coord]=arr[i];
        }
        res.render("timetable.ejs",{"lessons":lessons})
    })
}


//显示个人资料
exports.showInformation= (req,res) =>{
    db.user(req.session.username,function (arr) {
        res.render("information.ejs",{"arr":arr,"username":req.session.username})
    })

}


//修改密码页面
exports.showChange=(req,res)=>{
    res.render("change.ejs",{"username":req.session.username})
}

//登录逻辑
exports.enter = (req,res) =>{
    db.enter(req.body,function (arr) {
        if(arr.length>0){
           req.session.username = arr[0].name;
            res.json({code:200,msg:"登录成功"})
        }
        else {
            res.json({code:400,msg:"登录失败"})
        }
    })
}

// 显示注册页面
exports.showRegister = (req,res)=> {
        res.render("register.ejs")
}

exports.register = (req,res)=>{
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("userinfo").find({"name":req.body.name}).toArray((err,data)=> {
                if (err) throw err;
                if (data.length > 0) {
                res.json({code: 400, msg: "用户名已存在"});
                db.close();
            }
            else {
                dbo.collection("userinfo").insertOne(req.body,()=> {
                    if (err) throw err;
                    res.json({code: 200, msg: "注册成功"});
                    db.close();
                })
            }
        })
    })
}
exports.addcourse = (req,res)=> {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("choosecourse").find(req.body).toArray((err,data)=> {
            if (err) throw err;
            if (data[0]!=undefined) {
                var errcourse = req.body.coursename;
                res.json({code:400,msg:errcourse+"选过了"});
                db.close();
            }
            else {
                dbo.collection("choosecourse").insertOne(req.body,()=> {
                    if (err) throw err;
                    var success = req.body.coursename;
                    res.json({code: 200, msg:success+"选课成功"});
                    db.close();
                })
            }
        })
    })
}

//删除已选课程
exports.deletcourse = (req,res)=> {
    db.delet(req.body,function (arr) {
        if(arr[0]==undefined){
            res.json({code:400,msg:"退选失败"})
        }
        else{
            res.json({code:200,msg:"退选成功"})
        }
    })

}

//修改个人信息
exports.updata= (req,res)=>{
    var name = req.session.username;
    console.log(req.body);
    db.updata(name,req.body,function (arr) {
        if(arr == "-1"){
            res.json({code:400,msg:"更新失败"})
        }
        else {
            res.json({code:200,msg:"修改成功"})
        }
    })
}




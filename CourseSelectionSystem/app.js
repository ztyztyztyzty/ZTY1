//express 启动外部服务器
let express = require("express");
var bodyParser = require('body-parser');
let app = express(); // 创建一台服务器
let course = require("./controllers/courseSelection");//引入控制器
var session = require('express-session');

//配置body-parser
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());
//通过req.body得到客户端传递的数据
app.use(session({
    secret:'recommend 128 bytes random string',
    cookie:{maxAge:20*60*1000},
    resave:true,
    saveUninitialized:true
}))

// 托管静态资源
app.use(express.static("public"));

// 处理客户端的请求
app.set("view engine","ejs");

app.get("/enter",course.showIndex);
app.get("/register",course.showRegister);
app.get("/main",course.showMain);
app.get("/myself",course.showMyself);
app.get("/timetable",course.showTimetable);
app.get("/chosen",course.showChosen);
app.get("/relogin",course.relogin);
app.get("/information",course.showInformation);
app.get("/change",course.showChange);


app.post("/login",course.enter);
app.post("/register",course.register);
app.post("/add",course.addcourse);
app.post("/delete",course.deletcourse);
app.post("/updata",course.updata);


// 监听一个端口
app.listen(3030,()=>{
    console.log("奥利给！~")
});


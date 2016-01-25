var fs = require("fs");
var mysql = require("mysql");
function start(response, postData){
    response.writeHead(200, {"Content-Type" : "text/html"});
    fs.createReadStream("./www/index.html").pipe(response);
};
function chat(response, postData){
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mxg102030',
        database: 'chat',
        port: 3306
    });
    postData = JSON.parse(postData);
    if(postData.msg != ""){
        conn.connect();
        conn.query("insert into msg values(NULL, \""+postData.user+ "\",\""+ postData.msg +"\");", function(err, rows, fields){
            if(err){
                console.log(err);
            }
        });
        console.log("user="+postData.user+"; msg="+postData.msg+";");
    } 
    response.writeHead(200);
    var arr = new Array;
    conn.query("select * from msg order by id desc limit 5", function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            for(var i = 0; i<rows.length; i++){
                arr[i] = {"user" : rows[i].user, "msg" : rows[i].msg};
            }
            var content = JSON.stringify(arr);
            response.write(content);
            response.end();
        }
    });
    conn.end();
    
};

exports["/"] = start;
exports["start"] = start;
exports["/chatroom/chat"] = chat;
(function(){
    var ajax = new XMLHttpRequest();
    var form = document.querySelector("#form");
    var user = document.querySelector("#user");
    var msg = document.querySelector("#msg");
    var resText = "";
    var msgdisplay = document.querySelector("#msgdisplay");
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4){
            if(ajax.status >=200 && ajax.status < 300 || ajax.status == 304){
                resText = JSON.parse(ajax.responseText);
                if(resText){
                    msgdisplay.innerHTML = "";
                    for(var i=resText.length-1, res; res = resText[i--];){
                        console.log("user="+res.user+"; msy="+res.msg+"。");
                        var p = document.createElement("p");
                        p.innerHTML = res.user + ": " + res.msg;
                        msgdisplay.appendChild(p);
                    }
                }
            }else{
                console.log(ajax.status);
            }
        }
    };
    form.addEventListener("submit",function(e){
        e.preventDefault();
        if(msg.value.length >49){
            alert("输入的信息不应大于50个字符！");
            return;
        }
        ajax.open("post", "chat", true);
        var content = {
            "user" : user.value,
            "msg" : msg.value
        };
        ajax.send(JSON.stringify(content));
        msg.value = "";
    },false);
    
    ajax.open("post", "chat", true);
    var content = {
        "user" : user.value,
        "msg" : ""
    };
    ajax.send(JSON.stringify(content));
    setInterval(function(){
        ajax.open("post", "chat", true);
        var content = {
            "user" : user.value,
            "msg" : ""
        };
        ajax.send(JSON.stringify(content));
        console.log("5s");
    },5000);
})();
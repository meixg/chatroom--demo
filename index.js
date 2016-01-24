var server = require("./server");
var router = require("./router");
var handle = require("./handler");

server.start(router.route,handle);
console.log("Server started");
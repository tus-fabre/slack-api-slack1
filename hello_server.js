'use strict';

/*
 * [FILE] hello_server.js
 *
 * [DESCRIPTION]
 *  Lesson 1 - 第1章の章末問題の解答例
 * 
 * [NOTE]
 */

const http = require('http');

const { currentTime } = require('./functions/current_time');
const env = require('dotenv').config();
const nodeEnv=process.env.NODE_ENV;
if (nodeEnv == 'development') {
    console.log("開発モードで起動します");
    console.log(env.parsed);
}

const hostname = '127.0.0.1';
const port = process.env.PORT;
let datetime = currentTime();

const server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    let message = '<h1>こんにちは！</h1>';
    message += '<br/><h2>現在の時刻：' + datetime + '</h2>';
    response.end(message);
    if (nodeEnv == 'development') console.log(response);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/*
 * END OF FILE
 */
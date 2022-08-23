'use strict';

/*
 * [FILE] app.js
 *
 * [DESCRIPTION]
 *  Lesson 2a - メッセージリスナーを定義する
 * 
 * [NOTE]
 */
const { currentTime } = require('./functions/current_time');
const env = require('dotenv').config();
const nodeEnv=process.env.NODE_ENV;
if (nodeEnv == 'development') {
  console.log("開発モードで起動します");
  console.log(env.parsed);
}

console.log("アプリを起動します");
let datetime = currentTime();
console.log("現在の時刻", datetime);

const { App } = require('@slack/bolt');
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

/*
 * [MESSAGE LISTENER] hello
 *
 * [DESCRIPTION]
 *  メッセージ'hello'を受け取ったときに起動する関数
 * 
 * [INPUTS]
 *  command - 利用しない
 * 
 * [OUTPUTS]
 *  respond - 'こんにちは <ユーザー名>!'
 *
 * [NOTES]
 *  イベントがトリガーされたチャンネルに say() でメッセージを送信します
 */
app.message('hello', async ({ message, say }) => {
  // messageの内容を確認する
  if (nodeEnv == 'development') console.log(message);
  // メッセージを返信する
  await say(`こんにちは <@${message.user}>!`);
});

/*
 * サーバーを起動する
 *
 */
(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Boltアプリが起動しました');
})();

/*
 * END OF FILE
 */
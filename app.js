'use strict'
const koa = require('koa');
const router = require('koa-route');
const config = require('./config');
let wechat = require('./wechat/g');
const weixin = require('./weixin');

const app = new koa();

app.use(wechat(config.wechat, weixin.reply))

app.listen(3000);
console.log('listening on port 3000');
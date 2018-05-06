'use strict'
const sha1 = require('sha1');
const Wechat = require('./wechat');
const getRawBody = require('raw-body'); //拼装request对象的数据，返回一个buffer的xml数据
const util = require('./util');


module.exports = function(opts, handler) {
    let wechat = new Wechat(opts);
    return function*(next) {
        const that = this;
        const token = opts.token;
        const signature = this.query.signature;
        const nonce = this.query.nonce;
        const timestamp = this.query.timestamp;
        const echostr = this.query.echostr;
        const str = [token, timestamp, nonce].sort().join('');
        const sha = sha1(str);


        if (this.method === 'GET') {
            if (sha === signature) {
                this.body = echostr + '';
            } else {
                this.body = 'wrong!';
            }
        } else if (this.method === 'POST') {
            if (sha !== signature) {
                this.body = 'wrong!';
                return false;
            } else {
                let data = yield getRawBody(this.req, {
                    length: this.length,
                    limit: '1mb',
                    encoding: this.charset
                })

                const content = yield util.parseXMLAsync(data);
                let message = util.formatMessage(content.xml);

                this.weixin = message;

                yield handler.call(this, next);

                wechat.reply.call(this);
            }
        }
    }
}
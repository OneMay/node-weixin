const path = require('path');
const util = require('./libs/util');
const wechat_file = path.join(__dirname, './config/wechat.txt');
const config = {
    wechat: {
        appID: 'wx08397c013a063cd4',
        appSecret: '8969c10c174dccc70e99866b9f8d1335',
        token: 'OneMayLGD',
        getAccessToken: function() {
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function(data) {
            data = JSON.stringify(data);
            return util.writeFileAsync(wechat_file, data);
        }
    }
}

module.exports = config;
'use strict'

exports.reply = function*(next) {
    let message = this.weixin;

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码进来：' + message.EventKey + ' ' + message.ticket);
            }

            this.body = '哈哈，你订阅了这个号';
        } else if (message.Event === 'unsubscribe') {
            console.log('无情取关');
            this.body = '';
        } else if (message.Event === 'LOCATION') {
            this.body = '您上报的位置是：' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
        } else if (message.Event === 'CLICK') {
            this.body = '您点击了菜单：' + message.EventKey;
        } else if (message.Event === 'SCAN') {
            console.log('关注后扫描二维码' + message.EventKey + ' ' + message.Ticket);
            this.body = '看到你扫了一下哦';
        } else if (message.Event === 'VIEW') {
            this.body = '您点击了菜单中的链接：' + message.EventKey;
        }
    } else if (message.MsgType === 'text') {
        let content = message.Content;
        let reply = '额，你说的' + message.Content + '太复杂了';

        if (content === '1') {
            reply = '天下第一';
        } else if (content === '2') {
            reply = '天下第二';
        } else if (content === '3') {
            reply = '天下第三';
        } else if (content === '4') {
            reply = '天下第四';
        } else if (content === '峰儿子') {
            reply = [{
                title: '风儿子',
                description: '真的叼',
                picUrl: 'http://imgsrc.baidu.com/forum/w%3D580/sign=e57228eeb6119313c743ffb855380c10/89c8c2c8a786c917c90fb415cd3d70cf3bc75794.jpg',
                url: 'https://v.qq.com/'
            }, {
                title: '啸儿子',
                description: '叼',
                picUrl: 'http://imgsrc.baidu.com/forum/w%3D580/sign=fbebd10eb47eca80120539efa1229712/bb84da177f3e670980c732d23fc79f3df9dc55dd.jpg',
                url: 'https://github.com/OneMay'
            }]
        }

        this.body = reply;
    }
    yield next;
}
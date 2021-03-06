/**
 * Created by ChenChao on 2016/9/27.
 */


module.exports = {
    getTopics: function (options, callback) {
        var apiUrl = 'https://cnodejs.org/api/v1/topics?';
        if(typeof options === 'function'){
            callback = options;
            options = {};
        }
        var params = {
            page: options.page || 1,
            limit: options.limit || 10,
            tab: options.tab || 'all',
            mdrender: true
        };
        apiUrl += serialize(params);
        request(apiUrl, callback);
    },
    getTopic: function (topicId, callback) {
        var params = {
            mdrender: false,
            accesstoken: ''
        };
        var apiUrl = 'https://cnodejs.org/api/v1/topic/' + topicId + '?';
        apiUrl += serialize(params);
        request(apiUrl, callback);
    }
};

function request(url, callback) {
    console.log('request: ' + url);
    fetch(url).then(function (res) {
        res.json().then(function(data){
            if(!data.success){
                console.log('接口调用异常！');
                return;
            }
            setTimeout(function () {
                callback(data);
            }, 300);
        });
    });
}

function serialize(object) {
    return Object.keys(object).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
    }).join('&');
}
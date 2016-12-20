var qiniuCore = require('../core/img.qiniu.js');

module.exports = function(obj, callback) {
    qiniuCore({
        file: obj,
        callback: callback,
    })
}
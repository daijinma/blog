var qiniu = require('qiniu');
var md5 = require('md5');
var path = require('path');
var domain = 'http://oiexh6ohq.bkt.clouddn.com/';

qiniu.conf.ACCESS_KEY = 'lLC3X3xQ0uw05UBT1l1iwxaXw9zL_ntZ_epQ0rZA';
qiniu.conf.SECRET_KEY = 'Gh4BdU-PKu7yX5cFlR-coGAThDR72JIfCOlNCgQ2';

var bucket = 'staticcdn';


//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}

//构造上传函数
function uploadFile(uptoken, key, localFile, callback) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            callback && callback(null, ret.hash, domain + ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
            callback && callback(err);
        }
    });
}

module.exports = function(obj) {
    //要上传文件的本地路径
    var file = obj.file;

    //上传到七牛后保存的文件名
    var key = md5(file.name) + path.extname(file.name);

    //生成上传 Token
    var token = uptoken(bucket, key);


    uploadFile(token, key, file.path, obj.callback);
};
//调用uploadFile上传
// uploadFile(token, key, filePath);
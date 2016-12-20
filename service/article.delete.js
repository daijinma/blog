var db = require('../db/db.js');
var moment = require('moment');
var database = new db();
var table = 'article';
moment.locale('zh-cn');


database.delete = function(id, callback) {

    if (!id) {
        callback.call(this, 1, 'id empty');
        return;
    }

    var sql = `DELETE FROM ${table} WHERE id=${id}`;

    var _this = this;

    this.connection.query(sql, function(err, data, fields) {
        if (err) {
            callback.call(_this, err.errno, err.code)
            return;
        };
        callback.call(_this, 0, 1)
    });
    this.close();
    return this;
};

module.exports = database;
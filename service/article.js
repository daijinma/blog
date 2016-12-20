var db = require('../db/db.js');
var moment = require('moment');
var database = new db();
moment.locale('zh-cn');


database.get = function(id, callback) {
    var sql = 'SELECT * FROM article WHERE id=' + id;
    var _this = this;
    this.connection.query(sql, function(err, data, fields) {
        if (err) {
            console.log(err);
            return;
        };
        if (data.length == 0) {
            callback.call(_this, -1, null);
            return;
        }

        data = data[0];

        data.content = data.content
            .replace(/\n/g, '\\n')
            .replace(/\t/g, '\\t')

        data['create_time'] = moment(data['create_time']).calendar();
        data['update_time'] = moment(data['update_time']).calendar();
        callback.call(_this, err, data)
    });
    // this.close();
    return this;
};

module.exports = database;
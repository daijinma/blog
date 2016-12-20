var db = require('../db/db.js');
var moment = require('moment');
var database = new db();
moment.locale('zh-cn');

database.search = function(id, callback) {

    var sql = 'SELECT id,title,update_time FROM article ORDER BY update_time DESC';

    if (id) {
        sql = sql + ' WHERE id=' + id;
    }
    var _this = this;
    this.connection.query(sql, function(err, data, fields) {
        if (err) {
            console.log(err);
        };

        if (id) {
            data = data[0];
        } else {
            // data.forEach(function(item, index) {
            //     item['create_time'] = moment(item['create_time']).format('YYYY-MM-DD hh:mm:ss');
            //     item['update_time'] = moment(item['update_time']).format('YYYY-MM-DD hh:mm:ss');
            // })
        }



        callback.call(_this, err, data)
    });
    return this;
};

module.exports = database;
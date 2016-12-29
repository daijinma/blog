var db = require('../db/db.js');
var moment = require('moment');
var database = new db();
var table = 'article';
moment.locale('zh-cn');


database.save = function(param, callback) {
    var id = param.id;
    var title = param.title;
    var content = param.content;
    var create_time = update_time = moment().format('YYYY-MM-DD HH:mm:ss');
    if (!title || !content) {
        callback.call(this, 1, 'param empty');
        return;
    }

    var sql = [
        'INSERT INTO ' + table + ' SET ?', {
            title: title,
            content: content,
            update_time: update_time,
            create_time: create_time
        }
    ];

    if (id) {
        sql = [
            'UPDATE ' + table + ' SET title=?,content=?,update_time=? WHERE id=?;', [
                title, content, update_time, id
            ]
        ];
    }

    var _this = this;

    this.connection.query(sql[0], sql[1], function(err, data, fields) {
        if (err) {
            callback.call(_this, err.errno, err.code)
            return;
        };
        callback.call(_this, 0, id || data.insertId)
    });
    this.close();
    return this;
};

module.exports = database;
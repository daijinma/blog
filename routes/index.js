var express = require('express');
var router = express.Router();
var list = require('../service/list.js')
var moment = require('moment');
moment.locale('zh-cn');


/* GET home page. */
router.get('/', function(req, res, next) {

    list.open(function(close) {
        this.search(null, function(err, data) {
            this.close();
            if (err) {
                next();
                return;
            }

            data.forEach(function(item, index) {
                item['time'] = moment(item['update_time']).format('MM/DD/YYYY hh:mm')
            })

            res.render('index', { title: '首页', datas: data });
        })
    })
});


module.exports = router;
var express = require('express');
var router = express.Router();
var list = require('../service/list.js')
var getArticle = require('../service/article.js')


/* GET home page. */
router.get('/list', function(req, res, next) {

    list.open(function(close) {
        this.search(null, function(err, data) {
            this.close();
            if (err) {
                next();
                return;
            }
            res.render('admin-list', { title: 'list_admin', datas: data });
        })
    })
});

router.get('/article/:id', function(req, res, next) {
    var id = req.params.id;
    getArticle.open(function(close) {
        this.get(id, function(err, data) {
            this.close();
            if (err < 0) {
                res.render('error', { title: '' });
            } else {
                res.render('admin-article', { title: data.title + "_admin", data: data });
            }

        })
    })
});

module.exports = router;
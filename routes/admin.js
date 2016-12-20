var express = require('express');
var router = express.Router();
var list = require('../service/list.js')
var getArticle = require('../service/article.js')


router.get('/', function(req, res, next) {
    res.redirect('/admin/list')
})

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

router.get('/article/edit/:id', function(req, res, next) {
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

router.get('/article/new', function(req, res, next) {
    res.render('admin-article', { title: "new_article_admin", data: {} });
});

module.exports = router;
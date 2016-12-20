var express = require('express');
var router = express.Router();
var getArticle = require('../service/article.js')


router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    getArticle.open(function(close) {
        this.get(id, function(err, data) {
            this.close();
            if (err < 0) {
                res.render('error', { title: '' });
            } else {
                res.render('article', { title: data.title, data: data });
            }

        })
    })
});



module.exports = router;
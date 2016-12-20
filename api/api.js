var express = require('express');
var router = express.Router();
var dbSave = require('../service/article.save.js');
var dbDelete = require('../service/article.delete.js');
var uploadeFn = require('../service/uploader.js');
// var multer = require('multer');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// var upload = multer();



router.post('/article/save', function(req, res, next) {
    var param = req.body;
    dbSave.open(function(close) {
        this.save(param, function(err, data) {
            this.close();
            res.json({ errno: err, data: data });
        })
    })
});

router.post('/article/delete', function(req, res, next) {
    var id = req.body.id;
    dbDelete.open(function(close) {
        this.delete(id, function(err, data) {
            this.close();
            res.json({ errno: err, data: data });
        })
    })
});

router.post('/upload', multipartMiddleware, function(req, res, next) {
    var img = req.files.image;
    // console.log(req.files);
    uploadeFn(img, function(err, hash, key, persistentId) {
        console.log(arguments);
        if (err) {
            res.json({ errno: err.code, data: err.error });
            return;
        }

        res.json({
            errno: 0,
            data: {
                hash: hash,
                url: key
            }
        });
    })

});

module.exports = router;
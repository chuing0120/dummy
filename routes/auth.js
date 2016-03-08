var express = require('express');
var async = require('async');
var bcrypt = require('bcrypt');

var router = express.Router();

// 2. 로컬 로그인 (HTTPS)
router.post('/login', function (req, res, next) {
    if (req.secure) {
        var result =
        {
            "success": {
                "message": "로그인이 되었습니다."
            }
        };
        res.json(result);
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426;
        next(err)
    }
});
// 15. 연동로그인 (HTTPS)
router.post('/soundcloud/token', function (req, res, next) {
    if (req.secure) {
        var result =
        {
            "success": {
                "message": "연동로그인 성공"
            }
        };
        res.json(result);
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426;
        next(err)
    }
});

module.exports = router;
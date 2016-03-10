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
        var err = new Error();
        err.message = {
            "message" : "SSL/TLS Upgrade Required"
        };
        next(err)
    }
});
// 9. 로그아웃
router.post('/logout', function(req, res, next) {

    var result =
    {
        "success": {
            "message": "로그아웃이 정상적으로 처리되었습니다"
        }
    };
    res.json(result);
});
// 15. 연동로그인 (HTTP)
router.get('/soundcloud', function (req, res, next) {
    var result =    {
        "success": {
            "message": "연동로그인 성공"
        }
    };
    res.json(result);
});

module.exports = router;
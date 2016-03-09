var express = require('express');

var router = express.Router();

// 1. 회원가입 (HTTPS)
router.post('/', function (req, res, next) {
    if (req.secure) {
        var result =
        {
            "success": {
                "message": "가입이 정상적으로 처리되었습니다."
            }
        };
        res.json(result);
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426
        next(err)
    }
});
// 3. 내 프로필 조회 (HTTPS)
router.get('/me', function (req, res, next) {
    if (req.secure) {
        res.json({
            "message": "회원프로필 정보가 정상적으로 조회되었습니다",
            "success": {
                "username": "yong@exe.com",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
                "nickname": "yong",
                "intro": "나는 용이라고해용 잘 부탁해용",
                "genre": 3,
                "position": 10,
                "mid": 1
            }
        });
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426
        next(err)
    }
});
// 4. 다른 프로필 보기 (HTTPS)
router.get('/:mid', function (req, res, next) { // 미들웨어
    if (req.secure) {
        res.json({
            "message": "회원프로필 정보가 정상적으로 조회되었습니다",
            "success": {
                "username": "chuing0120@naver.com",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
                "nickname": "쭌v2",
                "intro": "바람처럼 날아가고 싶은 20대의 무한한 상상력을 펼칠 수 있는 나만의 공간",
                "genre": 2,
                "position": 11
            }
        });
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426
        next(err)
    }
});
// 5. 내 프로필 수정 (HTTPS)
router.put('/me', function (req, res, next) { // 미들웨어
    if (req.secure) {
        res.json({
            "message": "회원 프로필 수정이 정상적으로 처리되었습니다.",
            "success": {
                "username": "yong@exe.com",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
                "nickname": "yong",
                "intro": "살려주세요",
                "genre": 1,
                "position": 10
            }
        });
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!');
        err.status = 426
        next(err)
    }
});

module.exports = router;
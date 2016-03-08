var express = require('express');
var async = require('async');
var bcrypt = require('bcrypt');

var router = express.Router();

// 6. 매칭/스토리 쓰기 (HTTPS)
router.post('/', function (req, res, next) {
    if (req.secure) {
        var result = {
            "success": {
                "message": "게시글이 작성되었습니다."
            }
        };
        res.json(result);
    } else {
        var err = new Error('SSL/TLS Upgrade Required!!!'); // =  err.message ?!
        err.status = 426;
        next(err);
    }
});
// 7. 매칭/스토리 수정
router.put('/:pid', function (req, res, next) {
    var result = {
        "success": {
            "message": "게시글이 수정되었습니다.",
            "title": "제목",
            "content": "내용",
            "nickname": "별명",
            "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
            "limit_people": 5,
            "decide_people": 2
        }
    };
    res.json(result);
});
// 8. 매칭/스토리 삭제
router.delete('/:pid', function (req, res, next) {
    var result = {
        "success": {
            "message": "게시글이 삭제되었습니다."
        }
    };
    res.json(result);
});
// 9. 매칭/스토리 상세보기
router.get('/:pid', function (req, res, next) {
    var result = {
        "success": {
            "message": "게시글을 조회했습니다.",
            "title": "제목",
            "content": "내용",
            "nickname": "별명",
            "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
            "limit_people": 5,
            "decide_people": 2,

            "replies": [{
                "message": "글 댓글 불러오기 성공",
                "page": 1,
                "pageLimit": 10,
                "data": [{
                    "rid": "댓글id",
                    "nickname": "작성자",
                    "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                    "genre": "장르",
                    "position": "포지션",
                    "content": "내용"
                }]
            }]
        }
    };
    res.json(result);
});
// 10. 매칭/스토리 목록 보기
router.get('/', function (req, res, next) {
    var result = {
        "success": {
            "message": "글 목록보기에 성공했습니다.",
            "page": req.query.page,
            "pageLimit": 10,
            "data": [{
                "title": "제목",
                "date": "작성일시",
                "genre": "장르",
                "position": "포지션",
                "nickname": "작성자",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                "pid": "매칭/스토리번호"
            }]
        }
    };
    res.json(result);
});
// 11. 매칭/스토리 댓글쓰기
router.post('/:pid/replies', function (req, res, next) {
    var result =
    {
        "success": {
            "nickname": "닉네임",
            "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
            "genre": "장르",
            "position": "포지션",
            "content": "내용",
            "message": "글 댓글 달기 성공"
        }
    };
    res.json(result);
});
// 12. 매칭/스토리 댓글수정
router.put('/:pid/replies/:rid', function (req, res, next) {
    var result =
    {
        "success": {
            "nickname": "닉네임",
            "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
            "genre": "장르",
            "position": "포지션",
            "content": "내용",
            "message": "글 댓글 수정 성공"
        }
    };
    res.json(result);
});
// 13. 매칭/스토리 댓글삭제
router.delete('/:pid/replies/:rid', function (req, res, next) {
    var result =
    {
        "success": {
            "message": "글 댓글 삭제 성공"
        }
    };
    res.json(result);
});
// 14. 매칭/스토리 댓글 더보기
router.get('/:pid/replies', function (req, res, next) {
    var result = {
        "success": {
            "message": "글 댓글 불러오기 성공",
            "page": 2,
            "pageLimit": 10,
            "data": [{
                "date": "작성일시",
                "genre": 1,
                "position": 10,
                "nickname" : "작성자",
                "photo" : "https://s3.ap-northeast-2.amazonaws.com/chuing/test/upload_1115ef30b30e689aec357078dbb2867e.jpg",
                "rid": 1
            },
                {
                    "date": "작성일시",
                    "genre": "장르",
                    "position": "포지션",
                    "nickname" : "작성자",
                    "photo" : "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_d11644be2b7354e72b89cfeb602ab99c.jpg",
                    "pid": 2
            },
                {
                    "date": "작성일시",
                    "genre": "장르",
                    "position": "포지션",
                    "nickname" : "작성자",
                    "photo" : "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_06026b646fc425bf48932647531d8c59.jpg",
                    "pid": 3
            },
                {
                    "date": "작성일시",
                    "genre": "장르",
                    "position": "포지션",
                    "nickname": "작성자",
                    "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_9a2b496776e9feda0e85fac653ed6ea7.jpg",
                    "pid": 4
                }]
        }
    }
    res.json(result);
});

module.exports = router;
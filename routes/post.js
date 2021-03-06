var express = require('express');
var formidable = require('formidable');
var path = require('path');


var router = express.Router();

// 6. 매칭/스토리 쓰기 (HTTPS)
router.post('/', function (req, res, next) {
    if (req.secure) {
        if ( req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            var result = {
                "success": {
                    "message": "body로 게시글이 작성되었습니다."
                }
            };
            res.json(result);

        } else if ( /^multipart\/form-data/.test( req.header('content-type') ) ) { //폼데이타
            var form = new formidable.IncomingForm();

            form.uploadDir = path.join(__dirname, '../uploads');
            form.keepExtensions = true;
            form.multiples = true;
            form.maxFieldsSize = 10 * 1024 * 1024;       // 10MB !!

            form.parse(req, function (err, fields, files) {
                if (err) {
                    var err = new Error();
                    err.message = "form-data 파싱 에러";
                    next(err);
                }
                var result = {
                    "success": {
                        "message": "form-data로 게시글이 작성되었습니다."
                    }
                };
                //result.success.body = req.body;
                //result.success.fields = fields;
                //result.success.files = files;
                res.json(result);
            });
        } else {
            res.json('폼도 아니고 바디도 아니군요');
        }

    } else {
        var err = new Error();
        err.message = "SSL/TLS Upgrade Required";
        err.status = 426;
        next(err);
    }
});
// 7. 매칭/스토리 수정
router.put('/:pid', function (req, res, next) {
    if ( req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        var result = {
            "success": {
                "message": "body게시글이 수정되었습니다."
                //"data" :  [
                //    {
                //        "title": "제목",
                //        "content": "내용",
                //        "nickname": "별명",
                //        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
                //        "limit_people": 5,
                //        "decide_people": 2
                //    }
                //  ]
            }
        };
        res.json(result);
    } else if ( /^multipart\/form-data/.test( req.header('content-type') ) ) { //폼데이타

        var result = {
            "success": {
                "message": "form-data게시글이 수정되었습니다."
            }
        };
        res.json(result);
    } else {
        res.json('폼도 아니고 바디도 아니군요');
    }
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
// 10. 매칭/스토리 목록보기
router.get('/', function (req, res, next) {
    var flag = req.query.flag;  //for people!!
    if( flag === undefined) {
        var result = {
            "success": {
                "message": "글 목록보기에 성공했습니다.",
                "page": "1",
                "pageLimit": 10,
                "data": [
                    {
                        "title": "제목1",
                        "date": "작성일시1",
                        "genre": 0,
                        "position": 10,
                        "nickname": "작성자1",
                        "content": "내용1",
                        "limit_people": 3,
                        "decide_people": 2,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/1.jpg",
                        "pid": 1,
                        "mid": 3
                    },
                    {
                        "title": "제목2",
                        "date": "작성일시2",
                        "genre": 1,
                        "position": 11,
                        "nickname": "작성자2",
                        "content": "내용2",
                        "limit_people": 3,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 2,
                        "mid": 6
                    },
                    {
                        "title": "제목3",
                        "date": "작성일시3",
                        "genre": 3,
                        "position": 13,
                        "nickname": "작성자3",
                        "content": "내용3",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "pid": 3,
                        "mid": 9
                    },
                    {
                        "title": "제목4",
                        "date": "작성일시4",
                        "genre": 3,
                        "position": 13,
                        "nickname": "작성자4",
                        "content": "내용4",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 4,
                        "mid": 2
                    },
                    {
                        "title": "제목5",
                        "date": "작성일시5",
                        "genre": 4,
                        "position": 14,
                        "nickname": "작성자5",
                        "content": "내용5",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/1.jpg",
                        "pid": 5,
                        "mid": 1
                    },
                    {
                        "title": "제목6",
                        "date": "작성일시6",
                        "genre": 5,
                        "position": 15,
                        "nickname": "작성자6",
                        "content": "내용6",
                        "limit_people": 5,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 6,
                        "mid": 8
                    },
                    {
                        "title": "제목7",
                        "date": "작성일시7",
                        "genre": 6,
                        "position": 16,
                        "nickname": "작성자7",
                        "content": "내용7",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "pid": 7,
                        "mid": 11
                    },
                    {
                        "title": "제목8",
                        "date": "작성일시8",
                        "genre": 7,
                        "position": 10,
                        "nickname": "작성자8",
                        "content": "내용8",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 8,
                        "mid": 12
                    },
                    {
                        "title": "제목9",
                        "date": "작성일시9",
                        "genre": 0,
                        "position": 11,
                        "nickname": "작성자9",
                        "content": "내용9",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/1.jpg",
                        "pid": 9,
                        "mid": 4
                    },
                    {
                        "title": "제목10",
                        "date": "작성일시10",
                        "genre": 2,
                        "position": 11,
                        "nickname": "작성자10",
                        "content": "내용10",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 10,
                        "mid": 8
                    }
                ]
            }
        };
    } else if (flag=== 'people'){ //flag is people!!
        var result = {
            "success": {
                "message": "매칭글 목록보기에 성공했습니다.",
                "page": "1",
                "pageLimit": 10,
                "data": [
                    {
                        "title": "제목1",
                        "date": "작성일시1",
                        "genre": 0,
                        "position": 10,
                        "nickname": "작성자1",
                        "content": "내용1",
                        "limit_people": 3,
                        "decide_people": 2,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/1.jpg",
                        "pid": 1,
                        "mid": 15
                    },
                    {
                        "title": "제목2",
                        "date": "작성일시2",
                        "genre": 1,
                        "position": 11,
                        "nickname": "작성자2",
                        "content": "내용2",
                        "limit_people": 3,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 2,
                        "mid": 11
                    },
                    {
                        "title": "제목6",
                        "date": "작성일시6",
                        "genre": 5,
                        "position": 15,
                        "nickname": "작성자6",
                        "content": "내용6",
                        "limit_people": 5,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "pid": 6,
                        "mid": 7
                    },
                    {
                        "title": "제목11",
                        "date": "작성일시11",
                        "genre": 0,
                        "position": 10,
                        "nickname": "작성자11",
                        "content": "내용11",
                        "limit_people": 3,
                        "decide_people": 2,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "pid": 11,
                        "mid": 13
                    },
                    {
                        "title": "제목12",
                        "date": "작성일시12",
                        "genre": 1,
                        "position": 11,
                        "nickname": "작성자12",
                        "content": "내용12",
                        "limit_people": 3,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "pid": 12,
                        "mid": 20
                    },
                    {
                        "title": "제목16",
                        "date": "작성일시16",
                        "genre": 5,
                        "position": 15,
                        "nickname": "작성자16",
                        "content": "내용16",
                        "limit_people": 5,
                        "decide_people": 1,
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "pid": 16,
                        "mid": 16
                    }
                ]
            }
        };
    }
    res.json(result);
});
// 11. 매칭/스토리 댓글쓰기
router.post('/:pid/replies', function (req, res, next) {
    var result =
    {
        "success": {
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
                "message": "글 댓글 수정 성공"
            //"data" : [
            //    {
            //        "nickname": "닉네임",
            //        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
            //        "genre": "장르",
            //        "position": "포지션",
            //        "content": "내용"
            //    }
            //]
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
        "data": [
                    {
                        "date": "작성일시",
                        "genre": 1,
                        "position": 10,
                        "nickname" : "작성자",
                        "content": "내용1",
                        "photo" : "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/1.jpg",
                        "rid": 1,
                        "mid": 1
                    },
                    {
                        "date": "작성일시",
                        "genre": 2,
                        "position": 11,
                        "nickname" : "작성자",
                        "content": "내용2",
                        "photo" : "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/2.jpg",
                        "rid": 2,
                        "mid": 3
                     },
                    {
                        "date": "작성일시",
                        "genre": 3,
                        "position": 12,
                        "nickname" : "작성자",
                        "content": "내용3",
                        "photo" : "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/3.jpg",
                        "rid": 3,
                        "mid": 5
                    },
                    {
                        "date": "작성일시",
                        "genre": 4,
                        "position": 13,
                        "nickname": "작성자",
                        "content": "내용4",
                        "photo": "https://s3.ap-northeast-2.amazonaws.com/gooyong/dummy/4.jpg",
                        "rid": 4,
                        "mid": 2
                    }
                ]
        }
    }
    res.json(result);
});
// 19. 첨부파일 업로드(HTTP)
router.post('/:pid/photos', function (req, res, next) {
    if (req.secure) {
        var result = {
            "success": "파일이 업로드가 완료되었습니다."
        };
        res.json(result);
    } else {
        var err = new Error();
        err.message = "SSL/TLS Upgrade Required";
        err.status = 426;
        next(err)
    }
});

module.exports = router;

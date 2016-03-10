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
        var err = new Error();
        err.message = {
            "message" : "SSL/TLS Upgrade Required"
        };
        next(err)
    }
});
// 7. 매칭/스토리 수정
router.put('/:pid', function (req, res, next) {
    var result = {
        "success": {
            "message": "게시글이 수정되었습니다.",
        "data" :  [
            {
                "title": "제목",
                "content": "내용",
                "nickname": "별명",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_edce5a199975bbc81bc7fd0399cdb5f8.jpg",
                "limit_people": 5,
                "decide_people": 2
            }
          ]
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 1
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 2
                    },
                    {
                        "title": "제목3",
                        "date": "작성일시3",
                        "genre": 3,
                        "position": 13,
                        "nickname": "작성자3",
                        "content": "내용3",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 3
                    },
                    {
                        "title": "제목4",
                        "date": "작성일시4",
                        "genre": 3,
                        "position": 13,
                        "nickname": "작성자4",
                        "content": "내용4",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 4
                    },
                    {
                        "title": "제목5",
                        "date": "작성일시5",
                        "genre": 4,
                        "position": 14,
                        "nickname": "작성자5",
                        "content": "내용5",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 5
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 6
                    },
                    {
                        "title": "제목7",
                        "date": "작성일시7",
                        "genre": 6,
                        "position": 16,
                        "nickname": "작성자7",
                        "content": "내용7",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 7
                    },
                    {
                        "title": "제목8",
                        "date": "작성일시8",
                        "genre": 7,
                        "position": 10,
                        "nickname": "작성자8",
                        "content": "내용8",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 8
                    },
                    {
                        "title": "제목9",
                        "date": "작성일시9",
                        "genre": 0,
                        "position": 11,
                        "nickname": "작성자9",
                        "content": "내용9",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 9
                    },
                    {
                        "title": "제목10",
                        "date": "작성일시10",
                        "genre": 2,
                        "position": 11,
                        "nickname": "작성자10",
                        "content": "내용10",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 10
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 1
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 2
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 6
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 11
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 12
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
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                        "pid": 16
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
            "message": "글 댓글 달기 성공",
            "data" : [
                {
                "nickname": "닉네임",
                "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                "genre": "장르",
                "position": "포지션",
                "content": "내용"
            }
              ]
        }
    };
    res.json(result);
});
// 12. 매칭/스토리 댓글수정
router.put('/:pid/replies/:rid', function (req, res, next) {
    var result =
    {
        "success": {
                "message": "글 댓글 수정 성공",
            "data" : [
                {
                    "nickname": "닉네임",
                    "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_e98cd8a3aefc37f3c9e6f1b81c13c461.jpg",
                    "genre": "장르",
                    "position": "포지션",
                    "content": "내용"
                }
            ]
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
                        "photo" : "https://s3.ap-northeast-2.amazonaws.com/chuing/test/upload_1115ef30b30e689aec357078dbb2867e.jpg",
                        "rid": 1
                    },
                    {
                        "date": "작성일시",
                        "genre": 2,
                        "position": 11,
                        "nickname" : "작성자",
                        "content": "내용2",
                        "photo" : "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_d11644be2b7354e72b89cfeb602ab99c.jpg",
                        "rid": 2
                     },
                    {
                        "date": "작성일시",
                        "genre": 3,
                        "position": 12,
                        "nickname" : "작성자",
                        "content": "내용3",
                        "photo" : "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_06026b646fc425bf48932647531d8c59.jpg",
                        "rid": 3
                    },
                    {
                        "date": "작성일시",
                        "genre": 4,
                        "position": 13,
                        "nickname": "작성자",
                        "content": "내용4",
                        "photo": "https://chuing.s3.ap-northeast-2.amazonaws.com/test/upload_9a2b496776e9feda0e85fac653ed6ea7.jpg",
                        "rid": 4
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
            "success": "파일 업로드 완료"
        }
        res.json(result);
    } else {
        var err = new Error();
        err.message = {
            "message" : "SSL/TLS Upgrade Required"
        };
        next(err)
    }
});

module.exports = router;
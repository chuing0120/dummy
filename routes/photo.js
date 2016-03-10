var express = require('express');

var router = express.Router();


// 17. 사진 업로드(HTTPS)
router.post('/', function (req, res, next) {
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
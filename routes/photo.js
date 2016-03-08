var express = require('express');

var router = express.Router();


// 17. 사진 업로드(HTTPS)
router.post('/', function (req, res, next) {
	if (req.secure) {
		var result = {
			"success": "파일이 업로드가 완료되었습니다."
			}
		res.json(result);
	} else {
		var err = new Error('SSL/TLS Upgrade Required!!!');
		err.status = 426;
		next(err)
	}
});

module.exports = router;
const express = require('express')
const router = express.Router()
const ARTICLE = require('./../module/article.js')

router.get('/list', function (req, res, next) {
	const type = req.query.type
	const pageSize = req.query.pageSize
	const pageNumber = req.query.pageNumber
	ARTICLE.get({
		type,
		pageSize,
		pageNumber
	}, function (data) {
		console.log(data)
		res.json(data)
	})
})





module.exports = router

const express = require('express')
const router = express.Router()
const ARTICLE = require('./../module/article.js')
// article/list api handler
router.get('/list', function (req, res, next) {
	const type = req.query.type
	const pageSize = req.query.pageSize
	const pageNumber = req.query.pageNumber
	ARTICLE.find({
		type,
		pageSize,
		pageNumber
	}, function (data) {
		const result = {
			state: 1,
			list: data,
			message: ''
		}
		res.json(result)
	})
})
// article/put api handler
router.post('/put', function (req, res, next) {
	const type = req.body.type
	const time = new Date()
	const content = req.body.content
	const title = req.body.title
	ARTICLE.insert({
		type,
		time,
		content,
		title,
		author: 'ganlei'
	}, function (data) {
		const result = {
			state: 1,
			message: '提交成功'
		}
		if (data) {
			result = {
				state: 0,
				message: '提交失败'
			}			
		}
		res.json(result)
	})
})
// article/del api hsnflrt
router.post('/del', function (req, res, next) {
	const id = req.body.id
	ARTICLE.delete({
		id
	}, function (data) {
		const result = {
			state: 1,
			message: '删除成功'
		}
		if (data) {
			result = {
				state: 0,
				message: '删除失败'
			}
		}
		res.json(result)	
	})
})



module.exports = router

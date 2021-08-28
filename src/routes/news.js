const router = require('express').Router();
const ObjectID = require('mongoose').Types.ObjectId;
const controller = require('../controllers/news');

router.route('/')
	.get(async (req, res, next) => {
		try {
			const response = await controller.getNews(req.query.page, req.query.perPage);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		try {
			const response = await controller.addNews(req.body);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	});

router.route('/:id')
	.get(async (req, res, next) => {
		try {
			console.log(ObjectID)
			if (!ObjectID.isValid(req.params.id)) throw ({ status: 400, message: 'Id is not valid' });
			const response = await controller.getById(req.params.id);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	})
	.put(async (req, res, next) => {
		try {
			if (!ObjectID.isValid(req.params.id)) throw ({ status: 400, message: 'Id is not valid' });
			const response = await controller.updateNews(req.params.id, req.body);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	})
	.delete(async (req, res, next) => {
		try {
			if (!ObjectID.isValid(req.params.id)) throw ({ status: 400, message: 'Id is not valid' });
			const response = await controller.deleteNews(req.params.id);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	});

module.exports = router;
const News = require('../models/news');

module.exports = {
	async getNews(page = 1, perPage = 10) {
		if (!Number.isInteger(perPage)) perPage = Number.parseInt(perPage);
		const news = await News.find().skip((page - 1) * perPage).limit(perPage).exec();
		if (news.length == 0) throw ({ status: 404, message: "No news foud" });

		return news;
	},


	async getById(id) {
		const news = await News.findById(id);
		if (!news) throw ({ status: 404, message: 'News does not exist' });

		return news;
	},

	async addNews(body) {
		return await News({
			title: body.title,
			description: body.description,
			tags: body.tags,
			date: Date.now()
		}).save();
	},

	async updateNews(id, query) {
		const news = await News.findById(id);
		if (!news) throw ({ status: 404, message: 'News does not exist' });

		return await News.findByIdAndUpdate(id, query, { new: true });
	},

	async deleteNews(id) {
		const news = await News.findById(id);
		if (!news) throw ({ status: 404, message: 'News does not exist' });

		return await News.findByIdAndDelete(id);
	}
}
/**
 * ClickbaitController
 *
 * @description :: Server-side logic for managing clickbaits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req, res) {
	    Clickbait.addTitle(req.body, function(clickbait) {
	        res.send(clickbait);
	    });
	},
	search: function(req, res) {
		console.log(req.body)
		var urls = req.body.url;
		Clickbait.find()
			.where({ url: urls })
			.populate("titles")
			.then(function(clickbaits) {
			res.send(clickbaits);
		});
	},
};


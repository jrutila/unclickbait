/**
 * ClickbaitController
 *
 * @description :: Server-side logic for managing clickbaits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req, res) {
		console.log(req.body)
	    Clickbait.addTitle(req.body).then(function(clickbait) {
	        res.send(clickbait);
	    });
	    if (req.body.ref)
	        Domain.checkDomain({ url: req.body.ref });
	},
	search: function(req, res) {
		var urls = req.body.url;
		Clickbait.find()
			.where({ url: urls })
			.populate("titles")
			.then(function(clickbaits) {
				res.send(clickbaits);
			});
	},
};


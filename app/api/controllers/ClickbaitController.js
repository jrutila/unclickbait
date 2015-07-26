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
		Clickbait.native(function(err, collection) {
			if (err) return res.serverError(err);
			
			collection.find({ url: { $in: urls }})
				.toArray(function(err, results) {
					var idList = results.map(function(c) {
						return c._id;
					});
					
					Clickbait.find()
						.where({ id: idList })
						.populate("titles")
						.then(function(clickbaits) {
							res.send(clickbaits);
						});
				});
		});
	},
};


/**
 * DomainController
 *
 * @description :: Server-side logic for managing domains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    selectors: function(req, res) {
        Domain.find({}).then(function(domains) {
            var json = {};
            _.each(domains, function(d) {
                json[d.hostname] = d.selector;
            });
            res.send(json);
        });
        var json = {
            "www.ampparit.com": "a.news-item-headline, a.__sidebar-item"
        }
    }
};


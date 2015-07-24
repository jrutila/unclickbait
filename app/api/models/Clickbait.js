/**
* Clickbait.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Promise = require("bluebird");

module.exports = {

  attributes: {
    url: "string",
    titles: {
      collection: "Title",
      via: "clickbait"
    },
  },
  addTitle: function(opts) {
    return new Promise(function(resolve, reject) {
      var url = opts.url;
      var text = opts.text;
      
      Clickbait.findOrCreate({ url: url}).then(function(clickbait) {
        delete opts['url'];
        Title.create(opts).then(function(title) {
          clickbait.titles.add(title);
          clickbait.save();
          resolve(clickbait);
        });
        Domain.checkDomain({ url: url });
      });
    });
  }
};


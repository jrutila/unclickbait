/**
* Clickbait.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    url: "string",
    titles: {
      collection: "Title",
      via: "clickbait"
    },
  },
  addTitle: function(opts, cb) {
    var url = opts.url;
    var text = opts.text;
    
    Clickbait.findOrCreate({ url: url}).then(function(clickbait) {
      Title.create({ text: text }).then(function(title) {
        clickbait.titles.add(title);
        clickbait.save();
        cb(clickbait);
      });
    });
    
  }
};


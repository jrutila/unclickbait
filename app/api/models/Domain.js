/**
* Domain.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var Promise = require("bluebird");
var url = require("url");

module.exports = {
  attributes: {
    hostname: "string",
    selector: "string"
  },
  checkDomain: function(opts) {
    return new Promise(function(resolve, reject) {
      var hostname = opts.hostname || url.parse(opts.url).hostname;
      var selector = opts.selector || "a";
      Domain.findOrCreate({ hostname: hostname })
            .then(function(dom) {
              dom.selector = selector;
              dom.save();
              resolve(dom);
            });
    })
  }
};


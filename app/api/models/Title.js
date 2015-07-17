/**
* Title.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    text : { type: 'string' },
    originalText: { type: 'string' },
    href: { type: 'string' },
    score : { type: 'int', defaultsTo: 0 },
    clickbait: { model: "Clickbait" },
  }
};


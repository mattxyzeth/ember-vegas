/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-vegas',

  included: function(app) {
    app.import(app.bowerDirectory + '/vegas/dist/js/vegas.min.js');
    app.import(app.bowerDirectory + '/vegas/dist/css/vegas.min.css');
  },

  isDevelopingAddon: function() {
    return true;
  }
};

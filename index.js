/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-vegas',

  included: function(app) {
    app.import(app.bowerDirectory + '/vegas/dist/vegas.min.js');
    app.import(app.bowerDirectory + '/vegas/dist/vegas.min.css');
  },

  isDevelopingAddon: function() {
    return true;
  },

  treeForPublic: function() {
    var vegasPath = path.join(this.app.bowerDirectory, 'vegas', 'dist');
    var vegasTree = new Funnel(vegasPath, {
      srcDir: '/overlays',
      include: ['*.png'],
      destDir: '/assets/overlays'
    });

    return vegasTree;
  }
};

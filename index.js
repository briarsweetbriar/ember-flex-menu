/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-flex-menu',

  included: function(app) {
    this._super.included(app);

    this.eachAddonInvoke('safeIncluded', [app]);
  }
};

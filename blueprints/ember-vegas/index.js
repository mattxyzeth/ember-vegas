module.exports = {
  description: 'Install the vegas bower package.',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
    return this.addBowerPackageToProject('vegas');
  }
};

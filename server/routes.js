Router.map(function() {
  this.route('checkApp', {
      path: '/check/:appId/',
      where: 'server',
      action: CheckApp
  });
});
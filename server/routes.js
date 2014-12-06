Router.map(function() {
  this.route('checkApp', {
      path: '/check',
      where: 'server',
      action: CheckApp
  });
});
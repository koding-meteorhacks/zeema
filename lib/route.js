Router.configure({
  layoutTemplate: 'layout.default'
})

Router.map(function(){
  this.route('home', {
    path: '/'
  }); 

  this.route('checkApp', {
    path: '/check/:appId/',
    where: 'server',
    action: CheckApp
  });
});


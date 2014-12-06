Router.configure({
  layoutTemplate: 'layout.default',
  waitOn : function  () {
    return [Meteor.subscribe("applications"),
        Meteor.subscribe("terms")
    ];
  }
})

Router.map(function(){
  this.route('home', {
    path: '/'
  }); 
});


Router.map(function(){
  this.route('devDashboard', {
    path: '/dashboard',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  }); 
});

Router.map(function(){
  this.route('createApplication', {
    path: '/create_application',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  }); 
});

Router.map(function(){
  this.route('newApplication', {
    path: '/application/:_id',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  }); 
});

/*
Router.map(function(){
  this.route('newApplication', {
    path: '/application/:id',
    onBeforeAction: function () {
      AccountsEntry.signInRequired(this);
    }
  }); 
});*/
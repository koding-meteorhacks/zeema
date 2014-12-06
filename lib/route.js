Router.configure({
    layoutTemplate: 'layout.default',
    waitOn: function() {
        return [Meteor.subscribe("check.applications"),
            Meteor.subscribe("check.terms")
        ];
    }
})

Router.map(function() {
  this.route('home', {
      path: '/'
  });

  this.route('devDashboard', {
      path: '/dashboard',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });

  this.route('createApplication', {
      path: '/create_application',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });

  this.route('newApplication', {
      path: '/application/:_id',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });
});
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

  // User Routes
  this.route('user', {
      layoutTemplate: 'layout.empty',
      path: '/user',
      onBeforeAction: function () {
        this.render('user.loading');
        this.next();
      },
      action: function () {
        var self = this;
        var token = localStorage.getItem('user.loginToken');
        var params = {token: token};
        Meteor.call('user.checkLoginToken', params, function (err, res) {
          if(err) throw err;
          if(res && res.isValid) {
            self.render('user.dashboard');
          } else {
            Router.go('/user/login');
          }
        });
      }
  });

  this.route('user.login.emailToken', {
      layoutTemplate: 'layout.empty',
      path: '/user/login/:token?',
      onBeforeAction: function () {
        this.render('user.loading');
        this.next();
      },
      action: function () {
        var self = this;
        var params = {token: this.params.token};
        if(!this.params.token) return this.render('user.login');
        Meteor.call('user.getLoginToken', params, function (err, res) {
          if(err) throw err;
          if(res && res.isValid) {
            localStorage.setItem('user.loginToken', res.loginToken);
            Router.go('/user');
          }
        });
      }
  });

});


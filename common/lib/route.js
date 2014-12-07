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
      path: '/developer',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });

  this.route('createApplication', {
      path: '/developer/create_application',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });

  this.route('newApplication', {
      path: '/developer/application/:_id',
      onBeforeAction: function() {
          AccountsEntry.signInRequired(this);
      }
  });

  // User Routes
  this.route('user', {
      layoutTemplate: 'layout.zeemauser',
      loadingTemplate: 'user.loading',
      path: '/user',
      waitOn: function () {
        var token = localStorage.getItem('user.loginToken');
        var params = {token: token};
        return Meteor.subscribe('user.applications', params);
      },
      onBeforeAction: function () {
        this.render('user.loading');
        this.next();
      },
      action: function () {
        var self = this;
        var token = localStorage.getItem('user.loginToken');
        var params = {token: token};
        Meteor.call('user.checkLoginToken', params, function (err, res) {
          if(!err && res) {
            self.render('user.dashboard');
          } else {
            Router.go('/user/login');
          }
        });
      }
  });

  this.route('user.login.emailToken', {
      layoutTemplate: 'layout.zeemauser',
      path: '/user/login',
      onBeforeAction: function () {
        this.render('user.loading');
        this.next();
      },
      action: function () {
        var self = this;
        var appId = this.params.query.appId;
        var params = {token: this.params.query.token};
        if(!params.token) return this.render('user.login');
        Meteor.call('user.getLoginToken', params, function (err, res) {
          if(!err && res) {
            localStorage.setItem('user.loginToken', res.loginToken);
            if(!appId) return Router.go('/user');
            var params = {token: res.loginToken};
            Meteor.call('user.getUserInfo', params, function (err, res) {
              var email = encodeURIComponent(res.user.email);
              Router.go('/user/manage?appId='+appId+'&email='+email);
            });
          } else {
            if(err) console.error(err);
            Router.go('/user/login');
          }
        });
      }
  });


  this.route('user.manage', {
      layoutTemplate: 'layout.zeemauser',
      loadingTemplate: 'user.loading',
      path: '/user/manage',
      waitOn: function () {
        var token = localStorage.getItem('user.loginToken');
        var params = {appId: this.params.query.appId, token: token};
        return [
          Meteor.subscribe('user.applicationInfo', params),
          Meteor.subscribe('user.applicationTerms', params)
        ];
      },
      action: function () {
        var self = this;
        var token = localStorage.getItem('user.loginToken');
        var params = {token: token};
        Meteor.call('user.checkLoginToken', params, function (err, res) {
          if(!err && res) {
            self.render('user.manage');
          } else {
            self.render('user.manage');
          }
        });
      }
  });

});


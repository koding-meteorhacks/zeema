var user = null;
var userDep = new Deps.Dependency();

Template['user.manage'].rendered = function () {
  var token = localStorage.getItem('user.loginToken');
  var params = {token: token};
  Meteor.call('user.getUserInfo', params, function (err, res) {
    if(res && !err) {
      user = res.user;
      userDep.changed();
    }
  });
}

Template['user.manage'].helpers({
  appName: function () {
    var appId = Router.current().params.query.appId;
    var app = Applications.findOne({_id: appId});
    return app.name;
  },

  appTerms: function () {
    var appId = Router.current().params.query.appId;
    var app = Applications.findOne({_id: appId});
    return Terms.find({_id: {$in: app.terms}});
  },

  zeemaUser: function () {
    userDep.depend();
    return user;
  },

  isAgreed: function () {
    var appId = Router.current().params.query.appId;
    userDep.depend();
    if(user) {
      return user.applications[appId]
      && _.contains(user.applications[appId].terms, this._id);
    }
  }
});

Template['user.manage'].events({
  'click #login-button': function (e) {
    e.preventDefault();
    Router.go('/user/login'+ location.search);
  },

  'click .user-manage-agree-button': function (e) {
    var self = this;
    var appId = Router.current().params.query.appId;
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id, appId: appId};
    Meteor.call('user.addTerm', params, function (err, res) {
      if(err) throw err;
      user = res.user;
      userDep.changed();
    });
  },

  'click .user-manage-disagree-button': function (e) {
    var self = this;
    var appId = Router.current().params.query.appId;
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id, appId: appId};
    Meteor.call('user.removeTerm', params, function (err, res) {
      if(err) throw err;
      user = res.user;
      userDep.changed();
    });
  },
})

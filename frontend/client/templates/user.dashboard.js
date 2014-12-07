var user = null;
var userDep = new Deps.Dependency();

Template['user.dashboard'].rendered = function () {
  var token = localStorage.getItem('user.loginToken');
  var params = {token: token};
  Meteor.call('user.getUserInfo', params, function (err, res) {
    if(err) throw err;
    if(res) {
      user = res.user;
      userDep.changed();
    }
  });
}

Template['user.dashboard'].helpers({
  globalTerms: function () {
    userDep.depend();
    return user && user.preferences;
  },

  getApplications: function () {
    userDep.depend();
    if(user) {
      var userApps = _.keys(user.applications) || [];
      return Applications.find({_id: {$in: userApps}});
    }
  },

  appInUse: function () {
    userDep.depend();
    return user && user.applications[this._id]
    && user.applications[this._id].terms.length;
  },

  getTermInfo: function () {
    return Terms.findOne({_id: this.toString()});
  },

  isAgreed: function () {
    var appData = Blaze._parentData(2);
    userDep.depend();
    if(user) {
      return user.applications[appData._id]
      && _.contains(user.applications[appData._id].terms, this._id)
      || _.contains(user.preferences, this._id);
    }
  },

  isLocalAgreed: function () {
    var appData = Blaze._parentData(2);
    userDep.depend();
    if(user) {
      return user.applications[appData._id]
      && _.contains(user.applications[appData._id].terms, this._id);
    }
  },

  isGlobal: function () {
    userDep.depend();
    if(user) {
      return _.contains(user.preferences, this._id);
    }
  },
})

Template['user.dashboard'].events({
  'click .user-manage-agree-button': function (e) {
    var self = this;
    var element = $(e.target).parents('.panel-default').get()[0];
    var appData = Blaze.getData(element);
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id, appId: appData._id};
    Meteor.call('user.addTerm', params, function (err, res) {
      if(err) throw err;
      user = res.user;
      userDep.changed();
    });
  },

  'click .user-manage-global-button': function (e) {
    var self = this;
    var element = $(e.target).parents('.panel-default').get()[0];
    var appData = Blaze.getData(element);
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id, appId: appData._id};
    if(_.contains(user.preferences, this._id)) {
      Meteor.call('user.removePreference', params, function (err, res) {
        if(err) throw err;
        user = res.user;
        userDep.changed();
      });
    } else {
      Meteor.call('user.addPreference', params, function (err, res) {
        if(err) throw err;
        user = res.user;
        userDep.changed();
      });
    }
  },

  'click .user-manage-disagree-button': function (e) {
    var self = this;
    var element = $(e.target).parents('.panel-default').get()[0];
    var appData = Blaze.getData(element);
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id, appId: appData._id};
    Meteor.call('user.removeTerm', params, function (err, res) {
      if(err) throw err;
      user = res.user;
      userDep.changed();
    });
  },

  'click .user-global-disagree-button': function (e) {
    var self = this;
    var element = $(e.target).parents('.panel-default').get()[0];
    var appData = Blaze.getData(element);
    var token = localStorage.getItem('user.loginToken');
    var params = {token: token, termId: this._id};
    Meteor.call('user.removePreference', params, function (err, res) {
      if(err) throw err;
      user = res.user;
      userDep.changed();
    });
  },
})

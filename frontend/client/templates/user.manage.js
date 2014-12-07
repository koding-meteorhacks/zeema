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
    var terms = Terms.find({_id: {$in: app.terms}}).fetch();
    userDep.depend();
    if(user) {
      _.forEach(terms, function (term) {
        _.extend(term, {selected: _.contains(user.terms, term._id)});
      })
    }
    return terms;
  },

  zeemaUser: function () {
    userDep.depend();
    return user;
  }
});

Template['user.manage'].events({
  'click #login-button': function (e) {
    e.preventDefault();
    Router.go('/user/login'+ location.search);
  },
})

var user = null;
var userDep = new Deps.Dependency();

Template['user.dashboard'].rendered = function () {
  var token = localStorage.getItem('user.loginToken');
  var params = {token: token};
  Meteor.call('user.getUserInfo', params, function (err, res) {
    if(err) throw err;
    if(res && res.isValid) {
      user = res.user;
      userDep.changed();
    }
  });
}

Template['user.dashboard'].helpers({
  globalTerms: function () {
    userDep.depend();
    return user && user.globalTerms;
  },
  applicationTerms: function () {
    userDep.depend();
    return user && user.applicationTerms;
  }
})

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
    return user && user.globalTerms;
  },

  getApplications: function () {
    userDep.depend();
    if(user) {
      return Applications.find({terms: {$elemMatch: {$in: user.terms}}});;
    }
  },

  getTermInfo: function () {
    return Terms.findOne({_id: this.toString()});
  },

  getAppManageQuery: function () {
    return 'appId='+this._id+'&email='+encodeURIComponent(user.email);
  },
})

Meteor.publish("user.userInfo", function (params) {
  var token = ZeemaUsers.getLoginToken(params.token);
  if(token) {
    return ZeemaUsers.find({_id: token.user});
  } else {
    this.ready();
  }
});

Meteor.publish("user.applicationInfo", function (params) {
  var token = ZeemaUsers.getLoginToken(params.token);
  if(token) {
    return Applications.find({_id: params.appId});
  } else {
    this.ready();
  }
});

Meteor.publish("user.applications", function (params) {
  var token = ZeemaUsers.getLoginToken(params.token);
  if(token) {
    var user = ZeemaUsers.findOne({_id: token.user});
    var userApps = _.keys(user.applications) || [];
    return Applications.find({_id: {$in: userApps}});
  } else {
    this.ready();
  }
});

Meteor.publish("user.applicationTerms", function (params) {
  var token = ZeemaUsers.getLoginToken(params.token);
  if(token) {
    var appInfo = Applications.findOne({_id: params.appId});
    return Terms.find({_id: {$in: appInfo.terms}});
  } else {
    this.ready();
  }
});

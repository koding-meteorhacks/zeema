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
    return Applications.find({terms: {$elemMatch: {$in: user.terms}}});
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

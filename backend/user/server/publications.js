Meteor.publish("user.applicationInfo", function (params) {
  return Applications.find({_id: params.appId});
});

Meteor.publish("user.applicationTerms", function (params) {
  var appInfo = Applications.findOne({_id: params.appId});
  return Terms.find({_id: {$in: appInfo.terms}});
});

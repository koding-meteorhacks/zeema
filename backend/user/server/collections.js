ZeemaUsers = new Meteor.Collection('zeemaUsers');
ZeemaLoginTokens = new Meteor.Collection('zeemaLoginTokens');
ZeemaEmailTokens = new Meteor.Collection('zeemaEmailTokens');

ZeemaUsers.createUser = function (fields) {
  _.extend(fields, {preferences: [], applications: {}});
  return ZeemaUsers.insert(fields);
}

ZeemaUsers.getLoginToken = function (loginToken) {
  var token = ZeemaLoginTokens.findOne({_id: loginToken});
  return token;
}

ZeemaUsers.getEmailToken = function (emailToken) {
  var token = ZeemaEmailTokens.findOne({_id: emailToken});
  return token;
}

ZeemaUsers.createLoginToken = function (userId) {
  var loginToken = Random.id();
  ZeemaLoginTokens.insert({_id: loginToken, user: userId});
  return loginToken;
}

ZeemaUsers.createEmailToken = function (userId) {
  var emailToken = Random.id();
  ZeemaEmailTokens.insert({_id: emailToken, user: userId});
  return emailToken;
}

ZeemaUsers.addTerm = function (params) {
  // params => {userId, appId, termId}
  var user = ZeemaUsers.findOne({_id: params.userId});
  var app = user.applications[params.appId];
  if(app && app.terms) {
    var set = {};
    set['applications.'+params.appId+'.terms'] = params.termId;
    ZeemaUsers.update({_id: params.userId}, {$addToSet: set});
  } else {
    var set = {};
    set['applications.'+params.appId] = {terms: [params.termId]};
    ZeemaUsers.update({_id: params.userId}, {$set: set});
  }
}

ZeemaUsers.addPreference = function (params) {
  // params => {userId, termId}
  ZeemaUsers.update({_id: params.userId}, {$addToSet: {preferences: params.termId}});
}

ZeemaUsers.removeTerm = function (params) {
  // params => {userId, appId, termId}
  var user = ZeemaUsers.findOne({_id: params.userId});
  var app = user.applications[params.appId];
  if(app && app.terms) {
    var set = {};
    set['applications.'+params.appId+'.terms'] = params.termId;
    ZeemaUsers.update({_id: params.userId}, {$pull: set});
  }
}

ZeemaUsers.removePreference = function (params) {
  // params => {userId, termId}
  var user = ZeemaUsers.findOne({_id: params.userId});
  ZeemaUsers.update({_id: params.userId}, {$pull: {preferences: params.termId}});
}

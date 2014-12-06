ZeemaUsers = new Meteor.Collection('zeemaUsers');
ZeemaLoginTokens = new Meteor.Collection('zeemaLoginTokens');
ZeemaEmailTokens = new Meteor.Collection('zeemaEmailTokens');

ZeemaUsers.getLoginToken = function (loginToken) {
  // params => {loginToken}
  var token = ZeemaLoginTokens.findOne({_id: loginToken});
  return token;
}

ZeemaUsers.getEmailToken = function (emailToken) {
  // params => {emailToken}
  var token = ZeemaEmailTokens.findOne({_id: emailToken});
  return token;
}

ZeemaUsers.createLoginToken = function (userId) {
  // params => {userId}
  var loginToken = Random.id();
  ZeemaLoginTokens.insert({_id: loginToken, user: userId});
  return loginToken;
}

ZeemaUsers.createEmailToken = function (userId) {
  // params => {userId}
  var emailToken = Random.id();
  ZeemaEmailTokens.insert({_id: emailToken, user: userId});
  return emailToken;
}

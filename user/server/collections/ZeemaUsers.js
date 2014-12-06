ZeemaUsers = new Meteor.Collection('zeemaUsers');

ZeemaUsers.checkLoginToken = function (token) {
  // params => {token}
  var user = ZeemaUsers.findOne({loginToken: token});
  return !!user;
}

ZeemaUsers.checkEmailToken = function (token) {
  // params => {token}
  var user = ZeemaUsers.findOne({emailToken: token});
  return !!user;
}

ZeemaUsers.createLoginToken = function (token) {
  // params => {token}
  var user = ZeemaUsers.findOne({emailToken: token});
  var loginToken = Random.id();
  ZeemaUsers.update({_id: user._id},{
    $set: {loginToken: loginToken, emailToken: Random.id()}
  });
  return loginToken;
}

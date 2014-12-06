
Meteor.methods({

  'user.checkLoginToken': function (params) {
    // params => {token}
    return {isValid: ZeemaUsers.checkLoginToken(params.token)};
  },

  'user.getLoginToken': function (params) {
    // params => {token}
    if(ZeemaUsers.checkEmailToken(params.token)) {
      var loginToken = ZeemaUsers.createLoginToken(params.token);
      return {isValid: true, loginToken: loginToken};
    } else {
      return {isValid: false};
    }
  },

  'user.requestEmailToken': function (params) {
    // params => {email}
    if(params && params.email) {
      var user = ZeemaUsers.findOne({email: params.email});
      var token = Random.id();
      ZeemaUsers.update({_id: user._id}, {$set: {emailToken: token}});
      sendEmailToken({email: user.email, emailToken: token});
    }
  },

})


var EMAIL_TEMPLATE = _.template('<a href="http://localhost:3000/user/login/<%= token %>">Click here</a> to login.');
function sendEmailToken (params) {
  // params => {email, emailToken}
  Email.send({
    to: params.email,
    from: 'hello@zeema.io',
    subject: 'Zeema Login',
    html: EMAIL_TEMPLATE({token: params.emailToken}),
  });
}

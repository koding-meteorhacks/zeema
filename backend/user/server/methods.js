
Meteor.methods({

  'user.checkLoginToken': function (params) {
    // params => {token}
    var token = ZeemaUsers.getLoginToken(params.token);
    return {isValid: !!token};
  },

  'user.getLoginToken': function (params) {
    // params => {token}
    var token = ZeemaUsers.getEmailToken(params.token);
    if(token) {
      var loginToken = ZeemaUsers.createLoginToken(token.user);
      return {isValid: true, loginToken: loginToken};
    } else {
      return {isValid: false};
    }
  },

  'user.requestEmailToken': function (params) {
    // params => {email}
    var user = ZeemaUsers.findOne({email: params.email});
    if(user) {
      var emailToken = ZeemaUsers.createEmailToken(user._id);
      sendEmailToken({email: user.email, emailToken: emailToken});
    }
  },

  'user.getUserInfo': function (params) {
    // params => {token}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(token) {
      var user = ZeemaUsers.findOne({_id: token.user});
      return {isValid: true, user: user};
    } else {
      return {isValid: false};
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

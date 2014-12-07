
Meteor.methods({

  'user.checkLoginToken': function (params) {
    // params => {token}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(!token) throw new Meteor.Error('Invalid login token');
    return {};
  },

  'user.getLoginToken': function (params) {
    // params => {token}
    var token = ZeemaUsers.getEmailToken(params.token);
    if(!token) throw new Meteor.Error('Invalid email token');
    var loginToken = ZeemaUsers.createLoginToken(token.user);
    return {loginToken: loginToken};
  },

  'user.requestEmailToken': function (params) {
    // params => {email}
    var user = ZeemaUsers.findOne({email: params.email});
    if(!user) throw new Meteor.Error('Cannot find user');
    var emailToken = ZeemaUsers.createEmailToken(user._id);
    sendEmailToken({email: user.email, emailToken: emailToken});
  },

  'user.getUserInfo': function (params) {
    // params => {token}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(!token) throw new Meteor.Error('Invalid login token');
    var user = ZeemaUsers.findOne({_id: token.user});
    return {user: user};
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

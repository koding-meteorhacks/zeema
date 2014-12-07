
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
    if(!user) {
      ZeemaUsers.createUser({email: params.email});
      user = ZeemaUsers.findOne({email: params.email});
    }
    var emailToken = ZeemaUsers.createEmailToken(user._id);
    var options = {email: user.email, emailToken: emailToken};
    if(params.appId) options.appId = params.appId;
    sendEmailToken(options);
  },

  'user.getUserInfo': function (params) {
    // params => {token}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(!token) throw new Meteor.Error('Invalid login token');
    var user = ZeemaUsers.findOne({_id: token.user});
    return {user: user};
  },

  'user.addTerm': function (params) {
    // params => {token, termId}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(!token) throw new Meteor.Error('Invalid login token');
    ZeemaUsers.update({_id: token.user}, {$addToSet: {terms: params.termId}});
  },

  'user.removeTerm': function (params) {
    // params => {token, termId}
    var token = ZeemaUsers.getLoginToken(params.token);
    if(!token) throw new Meteor.Error('Invalid login token');
    ZeemaUsers.update({_id: token.user}, {$pull: {terms: params.termId}});
  },

})


var EMAIL_TEMPLATE = _.template('<a href="http://localhost:3000/user/login?token=<%= token %>&appId=<%= appId %>">Click here</a> to login.');
function sendEmailToken (params) {
  // params => {email, emailToken, appId}
  Email.send({
    to: params.email,
    from: 'hello@zeema.io',
    subject: 'Zeema Login',
    html: EMAIL_TEMPLATE({token: params.emailToken, appId: params.appId}),
  });
}

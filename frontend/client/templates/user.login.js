Template['user.login'].rendered = function () {
  var email = Router.current().params.query.email;
  if(email) requestLoginLink(email);
}

Template['user.login'].events({
  'submit #user-login-form': function (e) {
    e.preventDefault();
    var email = $('#user-email').val();
    requestLoginLink(email);
  }
})

Template['user.login'].helpers({
  email: function () {
    return Router.current().params.query.email;
  }
})

function requestLoginLink (email) {
  var params = {email: email};
  var appId = Router.current().params.query.appId;
  if(appId) params.appId = appId;

  $('#user-login-form').fadeOut(function () {
    $('#user-login-instructions').fadeIn();
  });

  Meteor.call('user.requestEmailToken', params, function (err, res) {
    if(err) throw err;
  });
}

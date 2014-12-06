Template['user.login'].events({
  'submit #user-login-form': function (e) {
    e.preventDefault();
    var email = $('#user-email').val();
    var params = {email: email};
    Meteor.call('user.requestEmailToken', params, function (err, res) {
      if(err) throw err;
    });
  }
})

Template['user.login'].events({
  'submit #user-login-form': function (e) {
    e.preventDefault();
    var email = $('#user-email').val();
    var params = {email: email};
    $('#user-login-form').fadeOut();
    Meteor.call('user.requestEmailToken', params, function (err, res) {
      if(err) throw err;
    });
  }
})

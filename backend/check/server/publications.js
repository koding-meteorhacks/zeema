Meteor.publish("check.applications", function () {
  var curUser = this.userId;
  if (curUser) {
    return Applications.find({userId:curUser});
  }else{
    this.ready();
  }
});

Meteor.publish("check.terms", function () {
  var curUser = this.userId;
  if (curUser) {
    return Terms.find();
  }else{
    this.ready();
  }
});
  Applications.allow({
    'insert': function (userId,doc) {
      if ( Meteor.userId()) {
        doc.terms  = [];
        doc.userId = Meteor.userId();
        return true; 
      }else{
        return false;
      }
    },'update': function (userId,doc) {
      if ( Meteor.userId()) {
        return true; 
      }else{
        return false;
      }
    }
  });  

  Terms.allow({
    'insert': function (userId,doc) {
      if ( Meteor.userId()) {
        return true; 
      }else{
        return false;
      }
    }
  });

  Meteor.publish("applications", function () {
    var curUser = this.userId;
    if (curUser) {
      return Applications.find({userId:curUser});
    }else{
      this.ready();
    }
  });

  Meteor.publish("terms", function () {
    var curUser = this.userId;
    if (curUser) {
      return Terms.find();
    }else{
      this.ready();
    }
  });
Meteor.startup(function() {
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
    },'update': function (userId,doc) {
      if ( Meteor.userId()) {
        return true; 
      }else{
        return false;
      }
    },'remove': function (userId,doc) {
      console.log(Meteor.userId());
      if ( Meteor.userId()) {
        return true; 
      }else{
        return false;
      }
    }
  });
});
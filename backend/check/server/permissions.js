Meteor.startup(function() {
  Applications.allow({
    'insert': function (userId,doc) {
      if (userId) {
        doc.terms  = [];
        doc.userId = userId;
        return true; 
      }else{
        return false;
      }
    },'update': function (userId,doc) {
      if (userId) {
        return true; 
      }else{
        return false;
      }
    },'remove': function(userId,doc){
      if (userId) {
        return true; 
      }else{
        return false;
      }
    }
  });  

  Terms.allow({
    'insert': function (userId,doc) {
      if (userId) {
        return true; 
      }else{
        return false;
      }
    },'update': function (userId,doc) {
      if (userId) {
        return true; 
      }else{
        return false;
      }
    },'remove': function (userId,doc) {
      if (userId) {
        return true; 
      }else{
        return false;
      }
    }
  });
});
Template.devDashboard.helpers({
  "applications"  :  function  () {
    return Applications.find() ;
  }
});

Template.devDashboard.events({
  'click #delete-app': function () {
    var appId = this._id;
    var deleteConfirm = {
      template: Template.appDeleteConfirm,
      title: "Confirm Delete",
      buttons: {
        "cancel": {
          class: 'btn-default',
          label: 'Cancel'
        },
        "ok": {
          class: 'btn-danger',
          label: 'Confirm Delete'
        }
      }
    }

    var rd = ReactiveModal.initDialog(deleteConfirm);
    rd.show();
    rd.buttons.ok.on('click', function(){
      Applications.remove({_id: appId}, function(error, result){
        if(!error){
          toastr.success("Application Deleted"); 
        } else {
          toastr.warning(error.message); 
        }
      });
    });
  }
});
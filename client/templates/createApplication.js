Template.createApplication.events({
    'click #createApplication': function(e) {
        e.preventDefault();
        var appName = $("#applicationName").val();
        Applications.insert({
            name: appName
        }, function(e, res) {
            if (!e) {
                toastr.success('Application has been created');
                Router.go('/');
            }else{
                toastr.warning('Failed to create application');
            }
        });
    }
});
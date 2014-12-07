Template.createApplication.events({
    'click #createApplication': function(e,template) {
            createNewApplication(e,template);
    },
    'keypress #applicationName': function(e, template) {
        if (e.which === 13) {
            createNewApplication(e,template);
        } else {}
    }
});

function createNewApplication (e,template) {
        e.preventDefault();

        var appName = $("#applicationName").val();
        if (appName=="") {
            toastr.warning('Appname cannot be empty');
            return false;
        };

        Applications.insert({
            name: appName
        }, function(e, res) {
            if (!e) {
                toastr.success('Application has been created');
                Router.go('/developer');
            } else {
                toastr.warning('Failed to create application');
            }
        });
}
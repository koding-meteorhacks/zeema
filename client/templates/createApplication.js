Template.createApplication.rendered = function() {}

Template.createApplication.events({
    'click #createApplication': function(e) {
        e.preventDefault();
        var appName = $("#applicationName").val();
        Applications.insert({
            name: appName
        }, function(e, res) {
            if (e) {
                Router.go('/');
            };
        });
    }
});
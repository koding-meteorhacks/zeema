Template.newApplication.rendered = function() {
    var data = [{
        "Name": "One"
    }, {
        "Name": "Second"
    }];
    var bestPictures = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data
    });
    bestPictures.initialize();
    $('#the-basics .typeahead').typeahead({
        highlight: true
    }, {
        name: 'best-pictures',
        displayKey: 'Name',
        source: bestPictures.ttAdapter()
    });
}

Template.newApplication.helpers({
    "applications": function() {
        var appid = Router.current().params._id;
        return Applications.find({
            _id: appid
        });
    },

    "terms": function() {
        var appid = Router.current().params._id;
        var apps = Applications.findOne({
            _id: appid
        });
        var appsTerms = apps.terms || [];
        return Terms.find({
            _id: {
                $in: appsTerms
            }
        });
    },
})

Template.newApplication.events({
    'click #addTerms': function(e) {
        var terms = $("#newTerms").val();
        Terms.insert({
            term: terms,
            type: "local"
        }, function(e, res) {
            if (!e) {
                toastr.success('New Term has been added');
                var appid = Router.current().params._id;
                Applications.update({
                    _id: appid
                }, {
                    $push: {
                        terms: res
                    }
                });
            } else {
                toastr.warning('Failed to create New Terms');
            }
        });
    },

    "click .delete-terms": function(e) {
        var appid = Router.current().params._id; //TODO gobal appid
        var termid = $(e.target).attr("dataId");

        Meteor.call("removeTerm",termid,appid, function (error) {
            toastr.success("Term has been deleted"); // TODO if incorrect?
        });
    }

});
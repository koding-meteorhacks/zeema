Template.newApplication.rendered = function() {

    /*var data = [{
        "Name": "We can share your personal information with other parties",
        "id":"1"
    }, {
        "Name": "This service tracks you on other websites",
        "id":"2"
    }, {
        "Name": "Google can use your content for all their existing and future services",
        "id":"3"
    }];*/

    var data = Terms.find({
        type: "global"
    }).fetch();
    console.log(data);
    var bestPictures = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('term'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: data
    });
    bestPictures.initialize();
    $('#the-basics .typeahead').typeahead({
        highlight: true
    }, {
        name: 'best-pictures',
        displayKey: 'term',
        source: bestPictures.ttAdapter()
    });

    $('#the-basics .typeahead').on('typeahead:selected ', function(e, d) {
        console.log(e, d);
        $('#the-basics .typeahead').attr("type", "gobal");
        $('#the-basics .typeahead').attr("phrase", d.term);
        $('#the-basics .typeahead').attr("phraseId", d._id);
    });
    //$("#gobal-terms").select2();
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

        var appid = Router.current().params._id;
        var phraseId = "";
        var type = "";
        var terms = "";

        if ($('#the-basics .typeahead').attr("type") === "global" && $('#the-basics .typeahead').typeahead('val') === $('#the-basics .typeahead').attr("phrase")) {
            phraseId = $('#the-basics .typeahead').attr("phraseId");
            type = "global";
            terms = "";
        } else {
            type = "local";
            terms = $('#the-basics .typeahead').typeahead('val');
        }

        Meteor.call("addTerm", appid, terms, type, phraseId, function(error, res) {
            if (res) {
                toastr.success('New Term has been added');
            } else {
                toastr.warning('Failed to create New Terms');
            }
        });
    },

    'keypress #the-basics': function(e, template) {
        if (e.which === 13) {
            e.preventDefault();

            var appid = Router.current().params._id;
            var phraseId = "";
            var type = "";
            var terms = "";

            if ($('#the-basics .typeahead').attr("type") === "global" && $('#the-basics .typeahead').typeahead('val') === $('#the-basics .typeahead').attr("phrase")) {
                phraseId = $('#the-basics .typeahead').attr("phraseId");
                type = "global";
                terms = "";
            } else {
                type = "local";
                terms = $('#the-basics .typeahead').typeahead('val');
            }

            Meteor.call("addTerm", appid, terms, type, phraseId, function(error, res) {
                if (res) {
                    toastr.success('New Term has been added');
                } else {
                    toastr.warning('Failed to create New Terms');
                }
            });
        } else {}
    },

    "click .delete-terms": function(e) {
        var appid = Router.current().params._id; //TODO global appid
        var termid = $(e.target).attr("dataId");

        Meteor.call("removeTerm", termid, appid, function(error) {
            toastr.success("Term has been deleted"); // TODO if incorrect?
        });
    }

});
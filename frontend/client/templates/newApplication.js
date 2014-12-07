Template.newApplication.rendered = function() {
    var data = Terms.find({
        type: "global"
    }).fetch();
    
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
        $('#the-basics .typeahead').attr("type", "global");
        $('#the-basics .typeahead').attr("phrase", d.term);
        $('#the-basics .typeahead').attr("phraseId", d._id);
    });
}

Template.newApplication.helpers({
    "applications": function() {
        var appid = Router.current().params._id;
        return Applications.find({
            _id: appid
        });
    },


    "isGlobal": function  () {
        if (this.type=="global") {
            return true;
        }else{
            return false;
        }
    },

    "isGood" : function  () {
        if (this.category=="good") {
            return true;
        }else{
            return false;
        }
    },
    "globalTerms": function  () {
        return Terms.find({type: "global"});
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
    scriptUrl: function(){
        return Meteor.absoluteUrl('api.js');
    },
    appId: function(){
        return Router.current().params._id;
    }
})

Template.newApplication.events({
    'click #addTerms': function(e, template) {
        addNewTerms(e, template);
    },

    'keypress #the-basics': function(e, template) {
        if (e.which === 13) {
            addNewTerms(e, template);
        }
    },
    "click .delete-terms": function(e) {
        var appid = Router.current().params._id; //TODO global appid
        var termid = $(e.target).attr("dataId");

        Meteor.call("removeTerm", termid, appid, function(error) {
            toastr.success("Term has been deleted"); // TODO if incorrect?
        });
    },
});

function addNewTerms(e, template) {

    if ($('#the-basics .typeahead').typeahead('val') == "") {
        toastr.warning('Terms cannot be empty');
        return false;
    }

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
            $('#the-basics .typeahead').typeahead('val',"");
            if (terms == "global") {
                toastr.success('New Global Term has been added');
            } else {
                toastr.success('New Term has been added');
            }
        } else {
            toastr.warning('Failed to create New Terms');
        }
    });
}
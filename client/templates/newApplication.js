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
  "applications"  :  function  () {
    var appid = Router.current().params._id;
    return Applications.find({_id:appid}) ;
  },

  "terms": function  () {

    var appid = Router.current().params._id;
    var apps =  Applications.findOne({_id:appid});
    var appsTerms = apps.terms || [];
    console.log(appsTerms);
    // console.log(appsTerms.fetch());
    // console.log( Terms.find( { _id:{ $in:appsTerms  } } ).fetch()  );
    return Terms.find( { _id:{ $in:appsTerms  } } );
  }
})

Template.newApplication.events({
    'click #addTerms': function  (e) {
        var terms = $("#newTerms").val();
        Terms.insert({
            term: terms,
            type:"local"
        }, function(e, res) {
            if (!e) {
                console.log("sucessfully saved the");
                var appid = Router.current().params._id;
                console.log(Applications.find({_id:appid}));
                Applications.update({_id:appid},{$push:{terms:res}});
                // db.students.update(
                //    { _id: 1 },
                //    { $push: { scores: 89 } }
                // )

            }
        });
    }
});

Meteor.methods({
    removeTerm: function(termid, appid) {
        Applications.update({
            _id: appid
        }, {
            $pull: {
                terms: termid
            }
        }, function(e, res) {
            if (!e) {
                Terms.remove({
                    _id: termid,
                    type: "local"
                }, function(e, res) {});
                return true;
            } else {
                // toastr.warning('Failed to delete the term');
                return false;
            }
        });
    },

    addTerm: function  (appid,term,type,phraseId) {
        if (type=="gobal") {
            var res = Applications.update({_id: appid},{$push: {terms: phraseId}});
        }else{       
            var res = Terms.insert({term: term,type: "local"});
            console.log(res);
            res = Applications.update({_id: appid},{$push: {terms: res}});
        }

        if (res==1) {
            return true;
        }else{
            return false;
        }
    }
});
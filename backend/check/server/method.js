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
});
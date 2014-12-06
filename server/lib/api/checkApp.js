CheckApp = function (){
  var req = this.request;
  var res = this.response;
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('access-control-allow-origin','*');
  this.params = this.params || {};
  this.params.query = this.params.query || {};

  var callback = this.params.query.callback;
  var email = this.params.query.email;
  var appId = this.params.query.appId;
  if(!callback){
    endResponseWithError(res, 'callback param required')
  }
  if(!email){
    endResponseWithError(res, 'email param required')
  }
  if(!appId){
    endResponseWithError(res, 'appId param required')
  }

  var app = Applications.findOne({_id: appId});

  if(!app){
    endResponseWithError(res, 'app not found')
    return;  
  }
  app.terms = app.terms || [];

  var user = ZeemaUsers.findOne({'email': email});
  var userTerms = (user)? user.terms || [] : [];
  var diff = _.difference(app.terms || [], userTerms);

  var responseObject = {}
  if(diff.length == 0){
    responseObject = {status: "OK"}
  } else {
    var terms = Terms.find({_id: {$in: diff}}).fetch();
    var termsList = _.pluck(terms, 'term');
    responseObject = {status: "NOT_OK", countNotAgreedTerms: termsList};
  }
  var response = callback + "(" + JSON.stringify(responseObject) + ")";
  res.end(response);
}

function endResponseWithError(res, msg){
  res.statusCode = 403;
  res.end(msg);
  return;
}
urlParse = Npm.require('url').parse;

CheckApp = function (req, res){
  var queryInfo = urlParse(req.url, true).query;
  var callback = queryInfo.callback;
  var email = queryInfo.email;
  var appId = queryInfo.appId;

  if(!callback){
    sendResponse(res, 403, 'callback param required')
  }
  if(!email){
    sendResponse(res, 403, 'email param required')
  }
  if(!appId){
    sendResponse(res, 403, 'appId param required')
  }

  var app = Applications.findOne({_id: appId});

  if(!app){
    sendResponse(res, 404, 'app not found')
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
  sendResponse(res, 200, response);
}

function sendResponse(res, statusCode, data){
  res.writeHead(statusCode, {'Content-Type': 'application/javascript'});
  res.end(data);
}
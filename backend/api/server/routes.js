var Fiber = Npm.require('fibers');
var rootUrl = process.env.ROOT_URL;
if(rootUrl.charAt(rootUrl.length - 1) == "/") {
    rootUrl = rootUrl.substring(0, rootUrl.length -1);
}
var apiJsContent = _.template(Assets.getText('api.js'))({rootUrl: rootUrl});

WebApp.connectHandlers
  .use('/api.js', function(req, res) {
    new Fiber(function() {
        res.writeHead(200, {
            "Content-Type": "application/javascript"
        });
        res.end(apiJsContent);
    }).run();
  });
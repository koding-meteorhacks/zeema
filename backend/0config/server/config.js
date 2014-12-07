ServiceConfiguration.configurations.remove({
  service: "twitter"
});

if(Meteor.settings.twitterConsumerKey && Meteor.settings.twitterSecret) {
  console.info("meteor login configured via Meteor.settings");
  var twitterConfig = {
    consumerKey: Meteor.settings.twitterConsumerKey,
    secret: Meteor.settings.twitterSecret,
    service: "twitter",
  };
  ServiceConfiguration.configurations.insert(twitterConfig);
} else {
  console.error("Meteor.settings.twitter configs now found ");
}

ServiceConfiguration.configurations.remove({
  service: "github"
});

if(Meteor.settings.githubClientID && Meteor.settings.githubClientSecret) {
  console.info("meteor login configured via Meteor.settings");
  var githubConfig = {
    clientId: Meteor.settings.githubClientID,
    secret: Meteor.settings.githubClientSecret,
    service: "github",
  };
  ServiceConfiguration.configurations.insert(githubConfig);
} else {
  console.error("Meteor.settings.github configs now found ");
}

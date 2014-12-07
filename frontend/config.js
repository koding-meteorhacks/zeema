Meteor.startup(function() {
  AccountsEntry.config({
    homeRoute: '/',
    dashboardRoute: '/developer'
  });
});
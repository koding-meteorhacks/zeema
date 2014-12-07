

if(Meteor.isClient) {
  LoginTokenDeps = new Deps.Dependency();

  Template['layout.zeemauser'].helpers({
    headerLink: function () {
      LoginTokenDeps.depend();
      var token = localStorage.getItem('user.loginToken');
      if(!token) return null;
      if(Router.current().route._path === '/user') {
        return {text: 'Logout', link: '/user/logout'};
      } else {
        return {text: 'My Zeema', link: '/user'};
      }
    }
  });
}
